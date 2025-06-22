# Deployment Guide

## Environment Variables

The following environment variables need to be configured in Render.com:

### Required Variables

```bash
# Database
DATABASE_URL=postgresql://user:password@host:port/database

# Authentication (32+ characters)
JWT_SECRET=your-jwt-secret-min-32-characters-long
JWT_REFRESH_SECRET=your-jwt-refresh-secret-min-32-chars

# Encryption (exactly 32 characters)
ENCRYPTION_KEY=0123456789abcdef0123456789abcdef
```

### Optional Variables

```bash
# Twilio (for AI calls)
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+1234567890

# OpenAI (for AI features)
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ElevenLabs (for voice synthesis)
ELEVENLABS_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
ELEVENLABS_VOICE_ID=xxxxxxxxxxxxxxxxxxxxxxxx
```

## Setting Environment Variables in Render

1. Go to your service dashboard in Render
2. Click on "Environment" tab
3. Add each variable as a key-value pair
4. Click "Save Changes"
5. The service will automatically redeploy

## Generating Secure Values

### JWT Secrets
```bash
# Generate a secure JWT secret
openssl rand -base64 32
```

### Encryption Key (exactly 32 chars)
```bash
# Generate a 32-character hex key
openssl rand -hex 16
```

## Database Setup

1. Create a PostgreSQL database in Render or use an external provider
2. Run Prisma migrations:
   ```bash
   npx prisma migrate deploy
   ```

## Post-Deployment

After deployment, your application will be available at:
- `https://mohit-ai-frontend.onrender.com`

Make sure to update the CORS settings and API URLs in your backend configuration to match the deployed frontend URL.