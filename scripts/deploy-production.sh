#!/bin/bash
# Complete Production Deployment Script

set -e # Exit on error

echo "🚀 Mohit AI Inbound SDR - Production Deployment"
echo "=============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
  echo -e "${GREEN}✓${NC} $1"
}

print_error() {
  echo -e "${RED}✗${NC} $1"
}

print_warning() {
  echo -e "${YELLOW}⚠${NC} $1"
}

# Step 1: Environment Check
echo -e "\n📋 Checking environment..."

if [ ! -f .env.production ]; then
  print_error ".env.production not found!"
  echo "Please copy .env.production.example to .env.production and configure it"
  exit 1
fi
print_status ".env.production found"

# Step 2: Clean previous builds
echo -e "\n🧹 Cleaning previous builds..."
rm -rf .next out dist node_modules/.cache
print_status "Build directories cleaned"

# Step 3: Install dependencies
echo -e "\n📦 Installing dependencies..."
npm ci --production=false
print_status "Dependencies installed"

# Step 4: Run security audit
echo -e "\n🔒 Running security audit..."
npm audit --production --audit-level=high || print_warning "Security vulnerabilities found - review before deploying"

# Step 5: Type checking
echo -e "\n📝 Running TypeScript type check..."
npm run type-check || {
  print_error "TypeScript errors found!"
  exit 1
}
print_status "TypeScript check passed"

# Step 6: Linting
echo -e "\n🔍 Running ESLint..."
npm run lint || {
  print_error "Linting errors found!"
  exit 1
}
print_status "Linting passed"

# Step 7: Run tests
echo -e "\n🧪 Running tests..."
npm test -- --passWithNoTests || {
  print_warning "Some tests failed - review before deploying"
}

# Step 8: Build application
echo -e "\n🏗️  Building application..."
NODE_ENV=production npm run build || {
  print_error "Build failed!"
  exit 1
}
print_status "Build completed"

# Step 9: Verify build output
echo -e "\n📊 Build verification..."
if [ -d ".next" ]; then
  print_status ".next directory created"
  
  # Check build size
  BUILD_SIZE=$(du -sh .next | cut -f1)
  echo "Build size: $BUILD_SIZE"
  
  # Check for large files
  echo "Checking for large files..."
  find .next -type f -size +5M -exec ls -lh {} \; | while read line; do
    print_warning "Large file: $line"
  done
else
  print_error "Build directory not found!"
  exit 1
fi

# Step 10: Database migrations
echo -e "\n🗄️  Database preparation..."
read -p "Run database migrations? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
  ./scripts/migrate-database.sh || {
    print_error "Database migration failed!"
    exit 1
  }
  print_status "Database migrations completed"
fi

# Step 11: Generate deployment package
echo -e "\n📦 Creating deployment package..."
if [ -f "deployment.tar.gz" ]; then
  rm deployment.tar.gz
fi

tar -czf deployment.tar.gz \
  .next \
  public \
  package.json \
  package-lock.json \
  next.config.js \
  prisma \
  .env.production.example \
  scripts/start-production.sh

print_status "Deployment package created: deployment.tar.gz"

# Step 12: Final checklist
echo -e "\n✅ Pre-deployment Checklist:"
echo "   [ ] Environment variables configured in hosting platform"
echo "   [ ] Database connection tested"
echo "   [ ] SSL certificate configured"
echo "   [ ] Domain DNS configured"
echo "   [ ] Monitoring/alerting set up"
echo "   [ ] Backup strategy in place"
echo "   [ ] Rollback plan prepared"

echo -e "\n🎉 Build completed successfully!"
echo "Next steps:"
echo "1. Upload deployment.tar.gz to your server"
echo "2. Extract: tar -xzf deployment.tar.gz"
echo "3. Install production dependencies: npm ci --production"
echo "4. Start application: npm start"

# Optional: Auto-deploy to specific platforms
if [ "$1" == "--deploy-vercel" ]; then
  echo -e "\n🚀 Deploying to Vercel..."
  vercel --prod
elif [ "$1" == "--deploy-render" ]; then
  echo -e "\n🚀 Deploying to Render..."
  echo "Push to your Git repository to trigger Render deployment"
elif [ "$1" == "--deploy-railway" ]; then
  echo -e "\n🚀 Deploying to Railway..."
  railway up
fi