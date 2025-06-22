#!/bin/bash
# Database Migration Script for Production Deployment

set -e # Exit on error

echo "🚀 Starting database migration process..."

# Check if .env.production exists
if [ ! -f .env.production ]; then
  echo "❌ Error: .env.production file not found!"
  echo "Please create it from .env.production.example"
  exit 1
fi

# Load environment variables
export $(cat .env.production | grep -v '^#' | xargs)

# Validate required environment variables
if [ -z "$DATABASE_URL" ]; then
  echo "❌ Error: DATABASE_URL not set in .env.production"
  exit 1
fi

echo "📋 Current environment: $NODE_ENV"
echo "🔗 Database URL: ${DATABASE_URL%%@*}@****" # Hide password

# Step 1: Generate Prisma Client
echo "1️⃣ Generating Prisma Client..."
npx prisma generate

# Step 2: Validate schema
echo "2️⃣ Validating Prisma schema..."
npx prisma validate

# Step 3: Create migration (if in development)
if [ "$1" == "--create" ]; then
  echo "3️⃣ Creating new migration..."
  npx prisma migrate dev --name $2
fi

# Step 4: Deploy migrations
echo "4️⃣ Deploying migrations to database..."
npx prisma migrate deploy

# Step 5: Run seed (if requested)
if [ "$1" == "--seed" ]; then
  echo "5️⃣ Seeding database..."
  npx prisma db seed
fi

# Step 6: Verify database state
echo "6️⃣ Verifying database state..."
npx prisma migrate status

echo "✅ Database migration completed successfully!"

# Optional: Generate database backup recommendation
echo ""
echo "💡 Recommendation: Create a database backup after migration"
echo "   pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql"