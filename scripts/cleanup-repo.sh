#!/bin/bash

# Repository Cleanup Script
# This script removes unwanted files and directories from the repository

echo "🧹 Starting repository cleanup..."

# Remove personal system files
echo "Removing personal system files..."
rm -f .DS_Store .zshrc .zshrc.bak .zsh_history .CFUserTextEncoding .gitconfig
rm -rf .zsh_sessions/ .local/ .npm/ .cache/ .config/ .vibe/ .cursor/

# Remove personal directories (these should never be in a code repository)
echo "Removing personal directories..."
rm -rf Desktop/ Documents/ Downloads/ Movies/ Music/ Pictures/ Public/ Applications/ Library/ bin/ tmp/

# Remove other projects that should be separate repositories
echo "Removing embedded projects..."
rm -rf Mohit-AI-Frontend/ mohit-ai-marketing-website/ mohit-ai-website-v3/ mohit-ai-website/
rm -rf Website-BlackBox-V1/ mohit-ai-backend-new/ ai-chat-app/ v3-frontend/ vibe-debug-system/

# Remove temporary files
echo "Removing temporary files..."
rm -f outbound.js.save
find . -name "*.tmp" -type f -delete
find . -name "*.temp" -type f -delete
find . -name "*.log" -type f -delete

# Clean build artifacts
echo "Cleaning build artifacts..."
rm -rf .next/ out/ dist/ build/

# Clean node_modules to ensure fresh install
echo "Cleaning node_modules..."
rm -rf node_modules/

# Remove any .env files that might have been committed
echo "Checking for committed .env files..."
find . -name ".env" -type f ! -path "./node_modules/*" -exec echo "Found: {}" \;
find . -name ".env.production" -type f ! -path "./node_modules/*" -exec echo "Found: {}" \;
find . -name ".env.local" -type f ! -path "./node_modules/*" -exec echo "Found: {}" \;

echo "✅ Cleanup complete!"
echo ""
echo "Next steps:"
echo "1. Review any .env files found above and ensure they're in .gitignore"
echo "2. Run 'git add -A' to stage all deletions"
echo "3. Run 'git status' to review changes"
echo "4. Commit with 'git commit -m \"chore: clean up repository\"'"
echo "5. Run 'npm install' to reinstall dependencies"