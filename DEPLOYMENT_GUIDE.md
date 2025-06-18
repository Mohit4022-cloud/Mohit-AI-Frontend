# Mohit AI Deployment Guide

## Current Status ✅
- ✅ Backend deployed and running at: https://mohit-ai-backend-frontend.onrender.com
- ⏳ Frontend needs to be deployed
- ⏳ Database needs to be set up

## Step-by-Step Deployment

### 1. Set Up Database (Required)

#### Option A: Add PostgreSQL in Current Service
1. Go to your Render dashboard
2. Click on your `mohit-ai-backend-frontend` service
3. Go to "Environment" tab
4. Click "Add Environment Variable"
5. Add a PostgreSQL database connection string:
   - Key: `DATABASE_URL`
   - Value: Get from a PostgreSQL provider (see below)

#### Option B: Use Render PostgreSQL (Recommended)
1. In Render dashboard, click "New +"
2. Select "PostgreSQL"
3. Configure:
   - Name: `mohit-ai-db`
   - Database: `mohit_ai`
   - User: `mohit_ai_user`
   - Region: Same as your service (Oregon)
   - Plan: Free
4. Click "Create Database"
5. Once created, copy the "Internal Database URL"
6. Add it to your backend service environment variables

#### Option C: Use External PostgreSQL
- Supabase: https://supabase.com (free tier)
- Neon: https://neon.tech (free tier)
- ElephantSQL: https://www.elephantsql.com (free tier)

### 2. Add Required Environment Variables

Go to your backend service → Environment tab and add:

```bash
# Required
JWT_SECRET=<generate-random-32-char-string>
NODE_ENV=production

# Optional but recommended
ENABLE_AUTO_RESPONSE=true
RESPONSE_TIME_SECONDS=60

# For email (choose one)
SENDGRID_API_KEY=<your-sendgrid-key>
# OR
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# For voice calls (optional)
TWILIO_ACCOUNT_SID=<your-twilio-sid>
TWILIO_AUTH_TOKEN=<your-twilio-auth>
TWILIO_PHONE_NUMBER=<your-twilio-number>

# For AI features (optional)
OPENAI_API_KEY=<your-openai-key>
# OR
GOOGLE_AI_API_KEY=<your-google-ai-key>
```

### 3. Run Database Migrations

After adding DATABASE_URL:

1. In Render dashboard, go to your backend service
2. Click "Shell" tab
3. Run these commands:
```bash
npx prisma migrate deploy
npx prisma generate
```

### 4. Deploy Frontend

#### Option A: Deploy as Separate Service (Recommended)
1. In Render, click "New +" → "Web Service"
2. Connect same GitHub repo
3. Configure:
   - Name: `mohit-ai-frontend`
   - Root Directory: `mohit-ai-frontend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
4. Add environment variable:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://mohit-ai-backend-frontend.onrender.com/api`
5. Deploy!

#### Option B: Use Blueprint (All-in-one)
1. Delete current service
2. Click "New +" → "Blueprint"
3. Connect your GitHub repo
4. Render will use the `render.yaml` file
5. Everything deploys automatically

### 5. Test Your Deployment

#### Backend API Tests:
```bash
# Check API status
curl https://mohit-ai-backend-frontend.onrender.com/api

# Check health
curl https://mohit-ai-backend-frontend.onrender.com/health

# Test registration (after DB is set up)
curl -X POST https://mohit-ai-backend-frontend.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'
```

#### Frontend Tests:
Once deployed, visit:
- Homepage: https://mohit-ai-frontend.onrender.com
- Login: https://mohit-ai-frontend.onrender.com/login
- Dashboard: https://mohit-ai-frontend.onrender.com/dashboard

## Quick JWT Secret Generator

Run this in your terminal to generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Troubleshooting

### "Cannot GET /"
This is normal! The backend API doesn't have a web interface. Use `/api` or `/health` endpoints.

### Database Connection Failed
- Make sure DATABASE_URL is set correctly
- Check if database service is running
- Verify connection string format: `postgresql://user:password@host:port/database`

### Frontend Can't Connect to Backend
- Verify NEXT_PUBLIC_API_URL is set correctly
- Check CORS settings in backend
- Make sure backend is running

### Build Failures
- Clear build cache in Render
- Check Node.js version compatibility
- Review build logs for specific errors

## Next Steps

1. Set up monitoring (optional):
   - Add Sentry for error tracking
   - Set up Render's health checks
   - Configure alerts

2. Add custom domain (optional):
   - Add your domain in Render settings
   - Update DNS records
   - Enable SSL (automatic in Render)

3. Scale up when ready:
   - Upgrade to paid Render plan
   - Add Redis for caching
   - Enable auto-scaling

## Support

If you need help:
1. Check Render logs: Dashboard → Logs
2. Use Render Shell for debugging
3. Review this guide and error messages

Your Mohit AI platform is almost ready! Just need to set up the database and deploy the frontend. 🚀