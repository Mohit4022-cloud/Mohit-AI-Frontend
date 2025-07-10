#!/bin/bash

echo "Starting deployment script..."

# Navigate to app directory
cd /home/site/wwwroot

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install --production=false
else
    echo "Dependencies already installed"
fi

# Check if .next directory exists
if [ ! -d ".next" ]; then
    echo "Building Next.js application..."
    npm run build
else
    echo "Build already exists"
fi

# Start the application
echo "Starting the application..."
npm run start