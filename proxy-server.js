const WebSocket = require('ws');
const http = require('http');

const PORT = process.env.PROXY_PORT || 3002;
const ELEVENLABS_API_KEY = (process.env.ELEVENLABS_API_KEY || process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY || '').trim();

if (!ELEVENLABS_API_KEY) {
  console.error('Error: ELEVENLABS_API_KEY environment variable is not set');
  console.error('Please set your ElevenLabs API key: export ELEVENLABS_API_KEY=your_api_key_here');
  process.exit(1);
}

console.log('Using API key:', ELEVENLABS_API_KEY.substring(0, 10) + '...');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

// Track active connections
const activeConnections = new Map();

wss.on('connection', (ws, req) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const agentId = url.searchParams.get('agent_id');
  
  if (!agentId) {
    ws.close(1002, 'Missing agent_id parameter');
    return;
  }
  
  const connectionId = Date.now().toString();
  console.log(`New connection ${connectionId} for agent: ${agentId}`);
  
  // Create connection to ElevenLabs
  const elevenLabsUrl = `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${agentId}`;
  const elevenLabsWs = new WebSocket(elevenLabsUrl, {
    headers: {
      'xi-api-key': ELEVENLABS_API_KEY
    }
  });
  
  // Store connection
  activeConnections.set(connectionId, { ws, elevenLabsWs, agentId });
  
  elevenLabsWs.on('open', () => {
    console.log(`Connected to ElevenLabs for connection ${connectionId}`);
    
    // Send initialization message
    const initMessage = {
      type: 'conversation_initiation_client_data',
      conversation_initiation_client_data: {
        conversation_id: `conversation_${Date.now()}`,
        agent_id: agentId
      }
    };
    
    console.log(`Sending initialization for ${connectionId}:`, JSON.stringify(initMessage, null, 2));
    elevenLabsWs.send(JSON.stringify(initMessage));
  });
  
  // Forward messages from client to ElevenLabs
  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString());
      console.log(`Received from client ${connectionId}:`, Object.keys(message));
      
      // Forward audio chunks to ElevenLabs
      if (message.user_audio_chunk !== undefined) {
        // ElevenLabs expects user audio in this exact format
        const audioMessage = {
          user_audio_chunk: message.user_audio_chunk
        };
        if (elevenLabsWs.readyState === WebSocket.OPEN) {
          elevenLabsWs.send(JSON.stringify(audioMessage));
        }
      }
      
      // Handle pong responses
      if (message.type === 'pong' && message.event_id !== undefined) {
        if (elevenLabsWs.readyState === WebSocket.OPEN) {
          elevenLabsWs.send(JSON.stringify(message));
        }
      }
    } catch (error) {
      console.error(`Error processing client message for ${connectionId}:`, error);
    }
  });
  
  // Forward messages from ElevenLabs to client
  elevenLabsWs.on('message', (data) => {
    try {
      // First, try to parse as JSON
      const textData = data.toString();
      
      // Check if it starts with '{' to determine if it's JSON
      if (textData.startsWith('{')) {
        const message = JSON.parse(textData);
        console.log(`Received JSON from ElevenLabs for ${connectionId}:`, message.type);
        
        // Forward to client
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(message));
        }
        
        // Send connected message to client after initialization
        if (message.type === 'conversation_initiation_metadata') {
          ws.send(JSON.stringify({ type: 'connected' }));
        }
      } else if (Buffer.isBuffer(data) && data.length > 0) {
        // This is likely binary audio data
        console.log(`Received binary audio from ElevenLabs for ${connectionId}, size: ${data.length}`);
        
        // Check first bytes to ensure it's not JSON
        const firstByte = data[0];
        if (firstByte === 123) { // 123 is '{'
          console.warn('Warning: Binary data starts with {, might be JSON');
        }
        
        // Convert binary PCM to base64 and send as audio event
        const audioMessage = {
          type: 'audio',
          audio_event: {
            audio_base_64: data.toString('base64')
          }
        };
        
        // Debug: Show first few bytes of audio
        console.log(`Audio first 10 bytes:`, Array.from(data.slice(0, 10)));
        console.log(`Audio base64 first 50 chars:`, data.toString('base64').substring(0, 50));
        
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(audioMessage));
        }
      }
    } catch (error) {
      console.error(`Error processing ElevenLabs message for ${connectionId}:`, error);
      console.error('Raw data:', data.toString().substring(0, 100));
    }
  });
  
  // Handle errors
  elevenLabsWs.on('error', (error) => {
    console.error(`ElevenLabs WebSocket error for ${connectionId}:`, error);
    ws.send(JSON.stringify({ 
      type: 'error', 
      message: 'Connection to ElevenLabs failed' 
    }));
  });
  
  ws.on('error', (error) => {
    console.error(`Client WebSocket error for ${connectionId}:`, error);
  });
  
  // Handle disconnections
  elevenLabsWs.on('close', (code, reason) => {
    console.log(`ElevenLabs WebSocket closed for ${connectionId}:`, { code, reason: reason?.toString() });
    if (ws.readyState === WebSocket.OPEN) {
      ws.close();
    }
  });
  
  ws.on('close', () => {
    console.log(`Client disconnected ${connectionId}`);
    activeConnections.delete(connectionId);
    if (elevenLabsWs.readyState === WebSocket.OPEN) {
      elevenLabsWs.close();
    }
  });
});

// Health check endpoint
server.on('request', (req, res) => {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'ok', 
      connections: activeConnections.size,
      uptime: process.uptime()
    }));
  } else {
    res.writeHead(404);
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`WebSocket proxy server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Active connections: ${activeConnections.size}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, closing connections...');
  activeConnections.forEach(({ ws, elevenLabsWs }) => {
    ws.close(1001, 'Server shutting down');
    elevenLabsWs.close();
  });
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection at:', promise, 'reason:', reason);
});