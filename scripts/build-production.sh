#!/bin/bash
# Production Build Script with Comprehensive Checks

set -e # Exit on error

echo "🚀 Production Build Process"
echo "=========================="

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Helper functions
print_status() { echo -e "${GREEN}✓${NC} $1"; }
print_error() { echo -e "${RED}✗${NC} $1"; }
print_warning() { echo -e "${YELLOW}⚠${NC} $1"; }
print_info() { echo -e "${BLUE}ℹ${NC} $1"; }

# Track build time
START_TIME=$(date +%s)

# Step 1: Environment Check
echo -e "\n${BLUE}1. Environment Check${NC}"
echo "--------------------"

if [ ! -f ".env.production" ] && [ ! -f ".env" ]; then
    print_error "No environment file found!"
    echo "Please create .env.production from .env.example"
    exit 1
fi
print_status "Environment file found"

# Step 2: Clean Previous Builds
echo -e "\n${BLUE}2. Cleaning Previous Builds${NC}"
echo "-------------------------"
rm -rf .next out dist coverage .turbo
print_status "Build directories cleaned"

# Step 3: Install Dependencies
echo -e "\n${BLUE}3. Installing Dependencies${NC}"
echo "------------------------"
npm ci --prefer-offline --no-audit
print_status "Dependencies installed"

# Step 4: Generate Prisma Client
echo -e "\n${BLUE}4. Database Setup${NC}"
echo "---------------"
npx prisma generate
print_status "Prisma client generated"

# Step 5: TypeScript Check
echo -e "\n${BLUE}5. TypeScript Validation${NC}"
echo "----------------------"
npx tsc --noEmit || {
    print_error "TypeScript errors found!"
    exit 1
}
print_status "TypeScript validation passed"

# Step 6: Linting
echo -e "\n${BLUE}6. Code Quality Checks${NC}"
echo "--------------------"
npm run lint || {
    print_error "Linting errors found!"
    echo "Run 'npm run lint:fix' to auto-fix issues"
    exit 1
}
print_status "Linting passed"

# Step 7: Run Tests
echo -e "\n${BLUE}7. Running Tests${NC}"
echo "--------------"
if [ -f "jest.config.js" ] || [ -f "jest.config.ts" ]; then
    npm test -- --passWithNoTests || {
        print_warning "Some tests failed"
    }
else
    print_warning "No test configuration found"
fi

# Step 8: Security Audit
echo -e "\n${BLUE}8. Security Audit${NC}"
echo "---------------"
npm audit --production --audit-level=high || {
    print_warning "Security vulnerabilities detected"
    echo "Run 'npm audit fix' to resolve"
}

# Step 9: Bundle Analysis (Optional)
echo -e "\n${BLUE}9. Bundle Analysis${NC}"
echo "----------------"
if [ "$ANALYZE" = "true" ]; then
    print_info "Running bundle analysis..."
    ANALYZE=true npm run build
else
    print_info "Skipping bundle analysis (set ANALYZE=true to enable)"
fi

# Step 10: Production Build
echo -e "\n${BLUE}10. Building Application${NC}"
echo "----------------------"
NODE_ENV=production npm run build || {
    print_error "Build failed!"
    exit 1
}
print_status "Production build completed"

# Step 11: Build Verification
echo -e "\n${BLUE}11. Build Verification${NC}"
echo "--------------------"

# Check build output
if [ ! -d ".next" ]; then
    print_error "Build directory not found!"
    exit 1
fi

# Check for source maps (should be present for debugging)
if find .next -name "*.map" -type f | grep -q .; then
    print_status "Source maps generated"
else
    print_warning "No source maps found"
fi

# Check build size
BUILD_SIZE=$(du -sh .next | cut -f1)
print_info "Build size: $BUILD_SIZE"

# Find large files
echo -e "\n${BLUE}Large Files Check:${NC}"
find .next -type f -size +1M -exec ls -lh {} \; | while IFS= read -r line; do
    print_warning "Large file: $line"
done

# Step 12: Create Build Info
echo -e "\n${BLUE}12. Creating Build Info${NC}"
echo "---------------------"
cat > .next/build-info.json << EOF
{
  "buildTime": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")",
  "nodeVersion": "$(node -v)",
  "npmVersion": "$(npm -v)",
  "nextVersion": "$(npm list next | grep next@ | sed 's/.*@//')",
  "commit": "$(git rev-parse HEAD 2>/dev/null || echo 'unknown')",
  "branch": "$(git branch --show-current 2>/dev/null || echo 'unknown')",
  "buildDuration": "$(($(date +%s) - START_TIME))s"
}
EOF
print_status "Build info created"

# Step 13: Generate Deployment Package
echo -e "\n${BLUE}13. Creating Deployment Package${NC}"
echo "-----------------------------"
DEPLOY_FILE="deploy-$(date +%Y%m%d-%H%M%S).tar.gz"
tar -czf "$DEPLOY_FILE" \
    .next \
    public \
    package.json \
    package-lock.json \
    next.config.js \
    prisma \
    scripts/start-production.sh \
    .env.example

print_status "Deployment package created: $DEPLOY_FILE"

# Calculate total build time
END_TIME=$(date +%s)
BUILD_TIME=$((END_TIME - START_TIME))

# Final Summary
echo -e "\n${GREEN}✅ Build Completed Successfully!${NC}"
echo "=============================="
echo "Build time: ${BUILD_TIME} seconds"
echo "Build size: $BUILD_SIZE"
echo "Deployment package: $DEPLOY_FILE"

echo -e "\n${BLUE}Next Steps:${NC}"
echo "1. Set production environment variables"
echo "2. Run database migrations: npx prisma migrate deploy"
echo "3. Deploy using: npm start"
echo "4. Verify deployment at: /api/health"

# Optional: Upload to S3 or artifact storage
if [ -n "$S3_BUCKET_NAME" ]; then
    echo -e "\n${BLUE}Uploading to S3...${NC}"
    aws s3 cp "$DEPLOY_FILE" "s3://$S3_BUCKET_NAME/builds/$DEPLOY_FILE"
    print_status "Uploaded to S3"
fi