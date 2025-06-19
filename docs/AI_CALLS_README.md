# AI Calls Feature Documentation

## Overview
The AI Calls feature enables automated voice conversations with leads using Twilio's ConversationRelay and ElevenLabs TTS, with real-time monitoring and human takeover capabilities.

## Architecture

### Frontend Components
- **Dashboard** (`/ai-calls`): Overview with metrics and active calls
- **Active Calls** (`/ai-calls/active`): Real-time monitoring of ongoing calls
- **Call Queue** (`/ai-calls/queue`): Manage scheduled and pending calls
- **Call History** (`/ai-calls/history`): Review past calls with recordings
- **Analytics** (`/ai-calls/analytics`): Performance metrics and insights
- **Settings** (`/ai-calls/settings`): Configure AI behavior and preferences

### Backend API Endpoints

#### Call Management
- `POST /api/calls/initiate` - Start a new AI call
- `GET /api/calls/active` - Get list of active calls
- `POST /api/calls/[id]/takeover` - Human takeover of AI call
- `POST /api/calls/[id]/pause-ai` - Pause AI temporarily
- `DELETE /api/calls/[id]/pause-ai` - Resume AI

#### Call Data
- `GET /api/calls/[id]/transcript` - Get call transcript (supports SSE)
- `POST /api/calls/[id]/summary` - Generate call summary
- `GET /api/calls/analytics` - Get analytics data

#### Webhooks (Twilio)
- `POST /api/calls/status` - Twilio status callback
- `POST /api/calls/recording` - Twilio recording callback
- `WS /api/calls/websocket` - WebSocket for ConversationRelay

### Real-time Features
- **WebSocket Events**: Call updates, transcript streaming, AI control
- **Socket.io Rooms**: User-specific, organization-wide, call-specific
- **Live Transcription**: Real-time speech-to-text with speaker identification

## Setup Instructions

### 1. Environment Variables
Copy `.env.ai-calls.example` to `.env.local` and fill in:
```bash
# Required
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=
ELEVENLABS_API_KEY=
DATABASE_URL=

# Optional but recommended
REDIS_URL=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
```

### 2. Database Setup
```bash
# Install Prisma CLI
npm install -D prisma

# Initialize database
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate
```

### 3. Twilio Configuration
1. Log in to Twilio Console
2. Create a new TwiML App
3. Set webhook URLs:
   - Voice URL: `https://your-domain.com/api/calls/websocket`
   - Status Callback: `https://your-domain.com/api/calls/status`
4. Enable ConversationRelay in your account

### 4. ElevenLabs Setup
1. Get API key from ElevenLabs dashboard
2. Choose or clone voices for your AI agents
3. Note voice IDs for configuration

### 5. Running the Application
```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## Usage Guide

### Initiating an AI Call
```javascript
const response = await fetch('/api/calls/initiate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    leadId: 'lead_123',
    phoneNumber: '+1234567890',
    campaignId: 'campaign_456',
    script: 'discovery_call',
    agentSettings: {
      voice: 'professional',
      formality: 'professional',
      speed: 1.0
    }
  })
});
```

### Monitoring Real-time Updates
```javascript
import { io } from 'socket.io-client';

const socket = io({
  auth: { token: authToken }
});

// Join call room
socket.emit('call:join', callId);

// Listen for updates
socket.on('call:updated', (call) => {
  console.log('Call updated:', call);
});

// Subscribe to transcript
socket.emit('transcript:subscribe', callId);
socket.on('transcript:update', (entry) => {
  console.log('New transcript:', entry);
});
```

### Human Takeover
```javascript
// Take over call
await fetch(`/api/calls/${callId}/takeover`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    reason: 'Complex negotiation',
    notes: 'Customer requesting custom pricing'
  })
});
```

## Security Considerations

1. **Authentication**: All API endpoints require JWT authentication
2. **Rate Limiting**: Calls are rate-limited per organization
3. **Encryption**: Sensitive data (recordings, transcripts) should be encrypted
4. **Compliance**: 
   - Call recording consent
   - AI disclosure
   - DNC list checking
   - Time zone restrictions

## Troubleshooting

### Common Issues

1. **WebSocket Connection Failed**
   - Check if server.js is running
   - Verify Socket.io is properly initialized
   - Check authentication token

2. **Twilio Calls Not Connecting**
   - Verify phone number format (+E.164)
   - Check Twilio account balance
   - Ensure webhook URLs are accessible

3. **No Transcript Updates**
   - Check WebSocket connection
   - Verify ConversationRelay is configured
   - Check browser console for errors

4. **AI Not Responding**
   - Check ElevenLabs API key
   - Verify AI model configuration
   - Check for rate limiting

## Performance Optimization

1. **Caching**: Use Redis for frequently accessed data
2. **Database Indexes**: Ensure proper indexes on Prisma schema
3. **WebSocket Scaling**: Use Redis adapter for multi-server deployment
4. **CDN**: Serve recordings through CDN for better performance

## Future Enhancements

1. **Voice Cloning**: Custom voices for different campaigns
2. **Multi-language Support**: AI agents speaking multiple languages
3. **Advanced Analytics**: ML-powered insights and predictions
4. **CRM Integration**: Direct integration with popular CRMs
5. **A/B Testing**: Test different scripts and voices