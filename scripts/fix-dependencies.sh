#!/bin/bash
# Dependency Fix Script - Resolves all missing dependencies

echo "🔧 Fixing Missing Dependencies..."
echo "================================"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Function to check command success
check_status() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ $1 completed successfully${NC}"
    else
        echo -e "${RED}✗ $1 failed${NC}"
        exit 1
    fi
}

# Step 1: Install missing production dependencies
echo -e "\n📦 Installing missing production dependencies..."
npm install @faker-js/faker papaparse csv-parse @prisma/client
check_status "Production dependencies installation"

# Step 2: Install missing dev dependencies
echo -e "\n📦 Installing missing dev dependencies..."
npm install --save-dev @types/papaparse @types/bcryptjs
check_status "Dev dependencies installation"

# Step 3: Install additional security dependencies
echo -e "\n🔒 Installing security dependencies..."
npm install helmet express-rate-limit cors dotenv zod
npm install --save-dev @types/cors
check_status "Security dependencies installation"

# Step 4: Update existing dependencies
echo -e "\n🔄 Updating existing dependencies..."
npm update
check_status "Dependencies update"

# Step 5: Fix peer dependencies
echo -e "\n🔧 Fixing peer dependencies..."
npm install --legacy-peer-deps
check_status "Peer dependencies fix"

# Step 6: Deduplicate dependencies
echo -e "\n🧹 Deduplicating dependencies..."
npm dedupe
check_status "Dependencies deduplication"

# Step 7: Generate Prisma Client
echo -e "\n🗄️ Generating Prisma Client..."
npx prisma generate
check_status "Prisma client generation"

# Step 8: Audit for vulnerabilities
echo -e "\n🔍 Running security audit..."
npm audit --production
echo -e "${YELLOW}Review any vulnerabilities above${NC}"

echo -e "\n${GREEN}✅ All dependencies fixed successfully!${NC}"
echo "Next steps:"
echo "1. Run 'npm run build' to verify the build works"
echo "2. Commit the updated package.json and package-lock.json"