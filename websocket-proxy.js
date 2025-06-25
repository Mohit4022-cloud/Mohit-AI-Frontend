const WebSocket = require('ws');
const http = require('http');
const url = require('url');

const PORT = 3002;
const ELEVENLABS_WS_URL = 'wss://api.elevenlabs.io/v1/convai/conversation';
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;

if (!ELEVENLABS_API_KEY) {
  console.error('Error: ELEVENLABS_API_KEY environment variable is not set');
  console.error('Please set your ElevenLabs API key: export ELEVENLABS_API_KEY=your_api_key_here');
  process.exit(1);
}

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', (clientWs, req) => {
  console.log('Client connected to proxy');
  
  const query = url.parse(req.url, true).query;
  const agentId = query.agent_id;
  
  if (!agentId) {
    console.error('No agent_id provided');
    clientWs.close();
    return;
  }
  
  console.log(`Connecting to ElevenLabs with agent_id: ${agentId}`);
  
  // Connect to ElevenLabs WebSocket with agent_id in URL
  const elevenLabsUrl = `${ELEVENLABS_WS_URL}?agent_id=${agentId}`;
  const elevenLabsWs = new WebSocket(elevenLabsUrl, {
    headers: {
      'xi-api-key': ELEVENLABS_API_KEY
    }
  });
  
  elevenLabsWs.on('open', () => {
    console.log('Connected to ElevenLabs');
    
    // Send initialization message with correct structure
    const initMessage = {
      type: 'conversation_initiation_client_data',
      conversation_initiation_client_data: {
        conversation_id: `conversation_${Date.now()}`,
        agent_id: agentId
      }
    };
    
    console.log('Sending initialization:', JSON.stringify(initMessage, null, 2));
    elevenLabsWs.send(JSON.stringify(initMessage));
  });
  
  // Forward messages from ElevenLabs to client
  elevenLabsWs.on('message', (data) => {
    try {
      // Check if data is binary (audio)
      if (Buffer.isBuffer(data)) {
        console.log('Received binary audio from ElevenLabs, size:', data.length);
        // Convert binary PCM to base64 and send as audio event
        const audioMessage = {
          type: 'audio',
          audio_event: {
            audio_base_64: data.toString('base64')
          }
        };
        clientWs.send(JSON.stringify(audioMessage));
      } else {
        // Parse JSON messages
        const message = JSON.parse(data.toString());
        console.log('Received from ElevenLabs:', message.type);
        
        // Forward to client
        clientWs.send(JSON.stringify(message));
        
        // Send connected message to client after initialization
        if (message.type === 'conversation_initiation_metadata') {
          clientWs.send(JSON.stringify({ type: 'connected' }));
        }
      }
    } catch (error) {
      console.error('Error processing ElevenLabs message:', error);
      // If parsing fails, it might be binary audio data
      console.log('Attempting to process as binary audio, size:', data.length);
      if (Buffer.isBuffer(data)) {
        const audioMessage = {
          type: 'audio',
          audio_event: {
            audio_base_64: data.toString('base64')
          }
        };
        clientWs.send(JSON.stringify(audioMessage));
      }
    }
  });
  
  // Forward messages from client to ElevenLabs
  clientWs.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString());
      console.log('Received from client:', Object.keys(message));
      
      // Forward audio chunks to ElevenLabs
      if (message.user_audio_chunk !== undefined) {
        const audioMessage = {
          type: 'audio',
          audio_event: {
            audio_base_64: message.user_audio_chunk
          }
        };
        elevenLabsWs.send(JSON.stringify(audioMessage));
      }
    } catch (error) {
      console.error('Error processing client message:', error);
    }
  });
  
  // Handle errors
  elevenLabsWs.on('error', (error) => {
    console.error('ElevenLabs WebSocket error:', error);
    clientWs.send(JSON.stringify({ 
      type: 'error', 
      message: 'Connection to ElevenLabs failed' 
    }));
  });
  
  clientWs.on('error', (error) => {
    console.error('Client WebSocket error:', error);
  });
  
  // Handle disconnections
  elevenLabsWs.on('close', (code, reason) => {
    console.log('ElevenLabs WebSocket closed', { code, reason: reason?.toString() });
    clientWs.close();
  });
  
  clientWs.on('close', () => {
    console.log('Client disconnected');
    elevenLabsWs.close();
  });
});

server.listen(PORT, () => {
  console.log(`WebSocket proxy server running on port ${PORT}`);
  console.log(`Make sure ELEVENLABS_API_KEY is set in your environment`);
});