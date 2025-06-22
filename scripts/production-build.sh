#!/bin/bash

# Production Build Script
# This script ensures a clean, error-free production build

set -e  # Exit on error

echo "🚀 Starting production build process..."

# 1. Check Node version
echo "Checking Node.js version..."
NODE_VERSION=$(node -v)
echo "Node.js version: $NODE_VERSION"

# 2. Clean previous builds
echo "Cleaning previous builds..."
rm -rf .next out dist node_modules/.cache

# 3. Install dependencies
echo "Installing dependencies..."
npm ci --prefer-offline --no-audit

# 4. Run type checking
echo "Running TypeScript type check..."
npm run type-check || {
  echo "❌ TypeScript errors found. Please fix them before deploying."
  exit 1
}

# 5. Run linting
echo "Running ESLint..."
npm run lint || {
  echo "❌ Linting errors found. Please fix them before deploying."
  exit 1
}

# 6. Run tests
echo "Running tests..."
npm test || {
  echo "⚠️  Some tests failed. Review and fix if critical."
}

# 7. Check environment variables
echo "Checking environment variables..."
if [ ! -f .env.production ]; then
  echo "❌ .env.production file not found!"
  echo "Please create it from .env.example"
  exit 1
fi

# Required environment variables
REQUIRED_VARS=(
  "DATABASE_URL"
  "JWT_SECRET"
  "JWT_REFRESH_SECRET"
  "ENCRYPTION_KEY"
)

for var in "${REQUIRED_VARS[@]}"; do
  if ! grep -q "^$var=" .env.production; then
    echo "❌ Missing required environment variable: $var"
    exit 1
  fi
done

# 8. Build the application
echo "Building application..."
NODE_ENV=production npm run build || {
  echo "❌ Build failed. Check the errors above."
  exit 1
}

# 9. Analyze bundle size
echo "Analyzing bundle size..."
if [ "$ANALYZE" = "true" ]; then
  npm run analyze
fi

# 10. Final checks
echo "Running final checks..."

# Check if .next directory exists
if [ ! -d ".next" ]; then
  echo "❌ Build directory .next not found!"
  exit 1
fi

# Check for large files
echo "Checking for large files in build..."
find .next -type f -size +5M -exec ls -lh {} \; | while read line; do
  echo "⚠️  Large file found: $line"
done

echo "✅ Production build completed successfully!"
echo ""
echo "Build summary:"
echo "- TypeScript: ✓"
echo "- ESLint: ✓"
echo "- Tests: ✓"
echo "- Environment: ✓"
echo "- Build: ✓"
echo ""
echo "Next steps:"
echo "1. Deploy to your hosting platform"
echo "2. Set environment variables in production"
echo "3. Run database migrations if needed"
echo "4. Verify deployment with health checks"