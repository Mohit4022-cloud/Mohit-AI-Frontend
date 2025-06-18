# 🚀 Mohit AI - Next Steps

## Current Status
✅ **Backend is LIVE**: https://mohit-ai-backend-frontend.onrender.com

## What You Need to Do Now:

### 1. 🗄️ Add PostgreSQL Database (5 minutes)

**Easiest Option - Use Supabase (Free):**
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub
4. Create new project:
   - Name: `mohit-ai`
   - Database Password: (save this!)
   - Region: US East
5. Wait for setup (~2 minutes)
6. Go to Settings → Database
7. Copy the "Connection string" (URI)
8. In Render dashboard:
   - Go to your backend service
   - Environment tab
   - Add variable:
     - Key: `DATABASE_URL`
     - Value: (paste the connection string)
   - Click "Save Changes"

### 2. 🔐 Add JWT Secret (1 minute)

1. Generate a secret:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
2. Copy the output
3. In Render Environment, add:
   - Key: `JWT_SECRET`
   - Value: (paste the generated secret)

### 3. 🗃️ Run Database Migrations (2 minutes)

1. In Render dashboard, click "Shell" tab
2. Run:
   ```bash
   npx prisma migrate deploy
   ```
3. If it shows errors, run:
   ```bash
   npx prisma db push
   ```

### 4. 🎨 Deploy Frontend (5 minutes)

1. In Render, click "New +" → "Web Service"
2. Connect same GitHub repo
3. Configure:
   - **Name**: `mohit-ai-frontend`
   - **Root Directory**: `mohit-ai-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Add environment variable:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://mohit-ai-backend-frontend.onrender.com/api`
5. Click "Create Web Service"

### 5. ✅ Test Everything (2 minutes)

Once frontend is deployed, test:

1. **API Health Check**:
   ```bash
   curl https://mohit-ai-backend-frontend.onrender.com/health
   ```

2. **Create Test User**:
   ```bash
   curl -X POST https://mohit-ai-backend-frontend.onrender.com/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123","name":"Test User","organizationName":"Test Org"}'
   ```

3. **Visit Frontend**:
   - Go to your frontend URL
   - Try logging in with test user

## 📱 Optional: Add Communication Features

### Email (SendGrid - Free tier)
1. Sign up at https://sendgrid.com
2. Get API key
3. Add to Render environment:
   - Key: `SENDGRID_API_KEY`
   - Value: (your API key)

### SMS/Voice (Twilio - Pay as you go)
1. Sign up at https://twilio.com
2. Get credentials
3. Add to Render environment:
   - `TWILIO_ACCOUNT_SID`
   - `TWILIO_AUTH_TOKEN`
   - `TWILIO_PHONE_NUMBER`

### AI Features (OpenAI)
1. Get API key from https://platform.openai.com
2. Add to Render environment:
   - Key: `OPENAI_API_KEY`
   - Value: (your API key)

## 🎉 That's It!

Your Mohit AI platform will be fully operational! The whole process should take about 15-20 minutes.

## Need Help?

- Backend logs: Render dashboard → Logs tab
- Database issues: Check DATABASE_URL format
- Frontend not loading: Check NEXT_PUBLIC_API_URL
- Can't login: Make sure database migrations ran

---

**Pro tip**: Save all your environment variables in a secure password manager for future reference!