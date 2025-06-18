# Mohit AI Backend

AI-powered inbound SDR platform backend - Never miss another inbound lead with sub-5-minute response times.

## Features

- 🚀 **Sub-5-minute Response**: Automated lead response within 60 seconds
- 📞 **Multi-Channel Support**: Voice (Twilio), SMS, Email, Live Chat
- 🤖 **AI-Powered Conversations**: ElevenLabs voice AI integration
- 📊 **Lead Qualification**: BANT/FAINT/MEDDIC frameworks
- 🔗 **CRM Integrations**: HubSpot, Salesforce, Pipedrive, and more
- 📈 **Real-time Analytics**: Track response times and conversion rates
- 🔒 **Enterprise Security**: JWT auth, rate limiting, data encryption

## Tech Stack

- **Runtime**: Node.js 18+ with ES modules
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Queue**: Bull with Redis
- **Voice**: Twilio + ElevenLabs
- **AI**: OpenAI GPT-4 / Google Gemini
- **WebSockets**: Socket.io for real-time updates

## Quick Start

1. Clone and install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your credentials
```

3. Set up database:
```bash
npx prisma migrate dev
npx prisma generate
```

4. Start development server:
```bash
npm run dev
```

## Environment Variables

Key environment variables needed:

- `DATABASE_URL`: PostgreSQL connection string
- `TWILIO_ACCOUNT_SID`: Twilio account credentials
- `ELEVENLABS_API_KEY`: ElevenLabs API key
- `JWT_SECRET`: Secret for JWT tokens
- `REDIS_HOST`: Redis server for queues

See `.env.example` for complete list.

## API Documentation

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/refresh` - Refresh token

### Lead Management
- `GET /api/leads` - List leads with pagination
- `POST /api/leads` - Create new lead (triggers auto-response)
- `PUT /api/leads/:id` - Update lead
- `POST /api/leads/:id/qualify` - Qualify lead with AI

### Call Management
- `POST /api/calls/initiate` - Start outbound call
- `GET /api/calls/:id/transcript` - Get call transcript
- WebSocket `/api/calls/relay/:callId` - Real-time voice relay

### Webhooks
- `POST /api/webhooks/twilio/*` - Twilio webhook handlers
- `POST /api/webhooks/crm/*` - CRM webhook handlers

## Architecture

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middleware/     # Express middleware
├── models/         # Database models
├── routes/         # API routes
├── services/       # Business logic
│   ├── ai/        # AI services
│   ├── crm/       # CRM integrations
│   ├── lead/      # Lead management
│   ├── twilio/    # Voice/SMS
│   └── websocket/ # Real-time
├── utils/         # Utilities
└── workers/       # Background jobs
```

## Deployment

### Using Docker:
```bash
docker build -t mohit-ai-backend .
docker run -p 5000:5000 mohit-ai-backend
```

### Using PM2:
```bash
pm2 start src/server.js --name mohit-backend
```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

Proprietary - Mohit AI © 2024