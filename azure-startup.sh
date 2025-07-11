#!/bin/bash
echo "Azure App Service Startup Script"
echo "Working directory: $(pwd)"
echo "Node version: $(node --version)"
echo "npm version: $(npm --version)"

# Navigate to app directory
cd /home/site/wwwroot || exit 1

# Install dependencies
echo "Installing dependencies..."
npm install --production=false

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Build Next.js app
echo "Building Next.js application..."
npm run build

# Start the application
echo "Starting application..."
npm run start