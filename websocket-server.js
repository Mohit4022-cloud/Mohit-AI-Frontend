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
      console.log('Connected to ElevenLabs WebSocket');
      
      // Send conversation initialization
      const initMessage = {
        type: 'conversation_initiation_client_data',
        conversation_initiation_client_data: {
          conversation_id: `conv_${Date.now()}`
        }
      };
      elevenLabsWs.send(JSON.stringify(initMessage));
      console.log('Sent initialization message');
      
      // Notify client
      clientWs.send(JSON.stringify({ type: 'connected' }));
    });

    // Relay messages from client to ElevenLabs
    clientWs.on('message', (message) => {
      console.log('Received from client:', message.toString().substring(0, 200));
      
      // Validate it's proper JSON
      try {
        const parsed = JSON.parse(message.toString());
        console.log('Message type:', Object.keys(parsed));
        
        
        // IMPORTANT: Convert Buffer to string before sending
        if (elevenLabsWs.readyState === WebSocket.OPEN) {
          const messageStr = message.toString();
          console.log('Sending to ElevenLabs (first 100 chars):', messageStr.substring(0, 100));
          elevenLabsWs.send(messageStr);
        }
      } catch (e) {
        console.error('Client sent invalid JSON:', e);
      }
    });

    // Relay messages from ElevenLabs to client
    elevenLabsWs.on('message', (message, isBinary) => {
      if (isBinary) {
        // Binary data (audio)
        console.log('Received binary audio data from ElevenLabs, size:', message.length);
        
        
        if (clientWs.readyState === WebSocket.OPEN) {
          // Send audio data wrapped in JSON for easier handling
          const audioBase64 = message.toString('base64');
          clientWs.send(JSON.stringify({
            type: 'audio',
            audio_event: {
              audio_base_64: audioBase64
            }
          }));
        }
      } else {
        // Text/JSON data
        try {
          const data = JSON.parse(message.toString());
          console.log('Received from ElevenLabs:', data.type || 'unknown type');
          if (data.type === 'agent_response') {
            console.log('Agent response full:', JSON.stringify(data, null, 2));
          }
          if (data.type === 'audio') {
            console.log('Audio message details:', {
              hasAudioData: !!data.audio_event?.audio_base_64,
              audioLength: data.audio_event?.audio_base_64?.length || 0
            });
          }
          
          // Handle ping messages
          if (data.type === 'ping') {
            // Log the actual ping structure to debug
            console.log('Ping data structure:', JSON.stringify(data));
            
            // Extract event_id from the ping message
            let eventId;
            if (data.ping_event && typeof data.ping_event === 'object') {
              eventId = data.ping_event.event_id;
            } else if (data.event_id !== undefined) {
              eventId = data.event_id;
            } else {
              console.error('No event_id found in ping message');
              return;
            }
            
            const pongMessage = {
              type: 'pong',
              event_id: eventId
            };
            
            elevenLabsWs.send(JSON.stringify(pongMessage));
            console.log('Sent pong response:', JSON.stringify(pongMessage));
            
            // Don't forward ping to client
            return;
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