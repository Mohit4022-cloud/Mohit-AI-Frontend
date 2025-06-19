# Deployment Checklist for Mohit AI Inbound SDR

## Pre-Deployment Requirements

### 1. Environment Setup
- [ ] Copy `.env.example` to `.env.production` and fill in all required values
- [ ] Ensure all secrets are at least 32 characters long
- [ ] Never commit `.env.production` to Git
- [ ] Set up environment variables in your deployment platform (Render/Vercel)

### 2. Database Setup
- [ ] Create PostgreSQL database
- [ ] Run database migrations: `npx prisma migrate deploy`
- [ ] Seed initial data if needed: `npx prisma db seed`

### 3. Security Hardening
- [ ] Change all default secrets in environment variables
- [ ] Enable HTTPS/SSL on your domain
- [ ] Configure proper CORS origins
- [ ] Set up rate limiting
- [ ] Enable security headers

### 4. Build Verification
```bash
# Run these commands locally before deploying
npm run type-check
npm run lint
npm run test
npm run build
```

### 5. Deployment Commands

#### For Render.com:
```bash
# Build command
npm install && npm run build

# Start command
npm run start
```

#### For Vercel:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## Post-Deployment Verification

### 1. Health Checks
- [ ] Visit `/api/health` - should return 200 OK
- [ ] Check browser console for errors
- [ ] Verify all API endpoints are authenticated
- [ ] Test rate limiting is working

### 2. Security Audit
- [ ] Run security headers test: https://securityheaders.com
- [ ] Check SSL certificate: https://www.ssllabs.com/ssltest/
- [ ] Verify no sensitive data in browser console
- [ ] Test authentication flow

### 3. Performance
- [ ] Run Lighthouse audit
- [ ] Check bundle size
- [ ] Verify lazy loading works
- [ ] Test on mobile devices

### 4. Monitoring Setup
- [ ] Configure error tracking (Sentry)
- [ ] Set up uptime monitoring
- [ ] Configure alerts for errors
- [ ] Set up log aggregation

## Environment Variables Required

```env
# Critical - Must be set
DATABASE_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=
ENCRYPTION_KEY=

# External Services - Set what you use
OPENAI_API_KEY=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_PHONE_NUMBER=

# Optional but recommended
SENTRY_DSN=
```

## Common Issues and Solutions

### Issue: Build fails with TypeScript errors
**Solution**: Run `npm run type-check` locally and fix all errors

### Issue: "Module not found" errors
**Solution**: Clear cache and reinstall dependencies
```bash
rm -rf node_modules .next
npm install
```

### Issue: Environment variables not loading
**Solution**: Ensure variables are set in deployment platform, not just .env file

### Issue: Database connection fails
**Solution**: Check DATABASE_URL format and firewall rules

### Issue: Authentication not working
**Solution**: Verify JWT_SECRET is the same in all environments

## Security Best Practices

1. **Never expose secrets** in client-side code
2. **Use HTTPS** for all production deployments
3. **Implement rate limiting** on all API endpoints
4. **Sanitize user input** to prevent XSS
5. **Use prepared statements** for database queries
6. **Keep dependencies updated** regularly
7. **Monitor for security vulnerabilities** with npm audit

## Rollback Strategy

If deployment fails:
1. Revert to previous commit: `git revert HEAD`
2. Redeploy previous version
3. Investigate issues in staging environment
4. Fix issues and test thoroughly before redeploying

## Support

For deployment issues:
- Check logs in your deployment platform
- Review this checklist
- Ensure all environment variables are set correctly
- Verify database connectivity
- Check for TypeScript/build errors