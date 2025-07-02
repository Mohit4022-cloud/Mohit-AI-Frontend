# Azure Deployment Setup for V7 Build

## What I've Created

1. **GitHub Actions Workflow** (`.github/workflows/azure-deploy.yml`)
   - Triggers on push to main, master, or Ultra-modern-UI branches
   - Builds your Next.js app with Prisma
   - Creates optimized deployment package
   - Deploys to Azure Web App

2. **Azure-specific files**:
   - `.deployment` - Tells Azure to use custom deployment script
   - `deploy.cmd` - Windows deployment script for Azure
   - Updated `package.json` with `start:azure` script

## Setup Steps

### 1. Configure GitHub Secrets
In your GitHub repository, go to Settings → Secrets → Actions and add:

- `AZURE_WEBAPP_NAME`: Your Azure Web App name (e.g., "mohit-ai-frontend-v7")
- `AZURE_WEBAPP_PUBLISH_PROFILE`: Download from Azure Portal (Web App → Download Publish Profile)
- `NEXT_PUBLIC_API_URL`: Your backend API URL
- `NEXT_PUBLIC_WS_URL`: Your WebSocket URL

### 2. Configure Azure Web App

In Azure Portal, configure your Web App:

**Application Settings**:
```
NODE_VERSION: 20.x
WEBSITE_NODE_DEFAULT_VERSION: ~20
SCM_DO_BUILD_DURING_DEPLOYMENT: false
WEBSITE_RUN_FROM_PACKAGE: 0
```

**Startup Command**:
```
npm run start:azure
```

### 3. Environment Variables in Azure

Add these in Configuration → Application settings:

```
DATABASE_URL: Your PostgreSQL connection string
NEXTAUTH_SECRET: Your NextAuth secret
NEXTAUTH_URL: https://your-app.azurewebsites.net
NEXT_PUBLIC_API_URL: Your backend API URL
NEXT_PUBLIC_WS_URL: Your WebSocket URL
```

### 4. Push to GitHub

```bash
cd /Users/mohit/Mohit-AI-Frontend
git add .
git commit -m "Add Azure deployment configuration"
git push origin Ultra-modern-UI
```

## Troubleshooting

### If deployment fails:

1. **Check GitHub Actions logs**
   - Go to Actions tab in GitHub
   - Click on the failed workflow
   - Check build and deploy steps

2. **Check Azure Logs**
   - In Azure Portal → Your Web App → Deployment Center → Logs
   - Also check: Diagnose and solve problems → Application Logs

3. **Common Issues**:
   - Missing environment variables
   - Node version mismatch
   - Build failures due to TypeScript errors (already bypassed with SKIP_ENV_VALIDATION)
   - Port binding issues (we use process.env.PORT)

### Manual Deployment Option

If GitHub Actions fails, you can deploy manually:

1. Build locally:
```bash
npm ci --legacy-peer-deps
npm run build
```

2. Create zip with:
   - .next/
   - public/
   - package.json
   - package-lock.json
   - prisma/
   - server.js

3. Deploy via Azure CLI or Portal's ZIP deploy

## Notes

- The workflow skips TypeScript errors during build (matching your current setup)
- It uses legacy peer deps to handle dependency conflicts
- The deployment creates a custom server.js for Azure compatibility
- Web.config is included for IIS on Windows App Service