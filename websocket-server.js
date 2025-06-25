/**
 * WebSocket Proxy Server for ElevenLabs Conversational AI
 * This runs separately from your Next.js app to handle WebSocket connections
 */

const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Enable CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://localhost:3000'],
  credentials: true
}));

// WebSocket server
const wss = new WebSocket.Server({ server });

console.log('Starting WebSocket proxy server...');

wss.on('connection', async (clientWs, req) => {
  console.log('Client connected to proxy');
  
  const agentId = new URL(req.url, `http://${req.headers.host}`).searchParams.get('agent_id');
  
  if (!agentId) {
    clientWs.send(JSON.stringify({ error: 'Agent ID required' }));
    clientWs.close();
    return;
  }

  try {
    // Get signed URL from ElevenLabs
    const apiKey = process.env.ELEVENLABS_API_KEY || process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY;
    
    const signedUrlResponse = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agentId}`,
      {
        headers: { 'xi-api-key': apiKey }
      }
    );

    let elevenLabsUrl;
    
    if (signedUrlResponse.ok) {
      const data = await signedUrlResponse.json();
      elevenLabsUrl = data.signed_url;
      console.log('Got signed URL from ElevenLabs');
    } else {
      // Try public agent
      elevenLabsUrl = `wss://api.elevenlabs.io/v1/convai/conversation?agent_id=${agentId}`;
      console.log('Using public agent URL');
    }

    // Connect to ElevenLabs
    const elevenLabsWs = new WebSocket(elevenLabsUrl);
    
    elevenLabsWs.on('open', () => {
      console.log('Connected to ElevenLabs, sending initialization...');
      
      // Send initialization message to ElevenLabs
      const initMessage = {
        type: "conversation_initiation_client_data",
        conversation_config_override: {
          agent: {
            agent_id: agentId,
            voice: {
              voice_id: "21m00Tcm4TlvDq8ikWAM"
            }
          }
        }
      };
      
      elevenLabsWs.send(JSON.stringify(initMessage));
      console.log('Sent initialization message');
      
      // Notify client
      clientWs.send(JSON.stringify({ type: 'connected' }));
    });

    // Relay messages from client to ElevenLabs
    clientWs.on('message', (message) => {
      console.log('Received from client, forwarding to ElevenLabs');
      if (elevenLabsWs.readyState === WebSocket.OPEN) {
        elevenLabsWs.send(message);
      }
    });

    // Relay messages from ElevenLabs to client
    elevenLabsWs.on('message', (message, isBinary) => {
      if (isBinary) {
        // Binary data (audio)
        console.log('Received binary audio data from ElevenLabs');
        if (clientWs.readyState === WebSocket.OPEN) {
          clientWs.send(message, { binary: true });
        }
      } else {
        // Text/JSON data
        try {
          const data = JSON.parse(message.toString());
          console.log('Received from ElevenLabs:', data.type || 'unknown type');
          
          // Handle ping messages
          if (data.type === 'ping') {
            const pongMessage = {
              type: 'pong',
              event_id: data.event_id
            };
            elevenLabsWs.send(JSON.stringify(pongMessage));
            console.log('Sent pong response');
          }
          
          // Forward message to client
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(message);
          }
        } catch (e) {
          console.error('Failed to parse ElevenLabs message:', e);
        }
      }
    });

    // Handle errors
    elevenLabsWs.on('error', (error) => {
      console.error('ElevenLabs WebSocket error:', error);
      clientWs.send(JSON.stringify({ type: 'error', message: error.message }));
    });

    elevenLabsWs.on('close', (code, reason) => {
      console.log('ElevenLabs WebSocket closed:', code, reason.toString());
      clientWs.close();
    });

    clientWs.on('close', () => {
      console.log('Client disconnected');
      elevenLabsWs.close();
    });

  } catch (error) {
    console.error('Proxy error:', error);
    clientWs.send(JSON.stringify({ type: 'error', message: error.message }));
    clientWs.close();
  }
});

const PORT = process.env.WS_PORT || 3002;

server.listen(PORT, () => {
  console.log(`WebSocket proxy server running on ws://localhost:${PORT}`);
  console.log('Use ws://localhost:3002/?agent_id=YOUR_AGENT_ID to connect');
});