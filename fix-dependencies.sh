#!/bin/bash
# Dependency Fix Script - Installs all missing dependencies

echo "🔧 Fixing missing dependencies..."

# Navigate to Harper-AI-Frontend if it exists
if [ -d "Harper-AI-Frontend" ]; then
  cd Harper-AI-Frontend
  echo "📦 Installing missing dependencies in Harper-AI-Frontend..."
  npm install @faker-js/faker papaparse csv-parse
  npm install --save-dev @types/papaparse
  cd ..
fi

# Install/update dependencies in root project
echo "📦 Updating root project dependencies..."
npm install

# Install additional security dependencies
echo "🔒 Installing security dependencies..."
npm install bcryptjs jsonwebtoken express-rate-limit helmet cors
npm install --save-dev @types/bcryptjs @types/jsonwebtoken

# Install validation dependencies
echo "✅ Installing validation dependencies..."
npm install zod joi yup
npm install --save-dev @types/joi

# Install monitoring dependencies
echo "📊 Installing monitoring dependencies..."
npm install winston pino @sentry/nextjs
npm install --save-dev @types/winston

echo "✨ Dependencies fixed! Run 'npm run build' to verify."