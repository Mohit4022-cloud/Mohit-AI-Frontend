#!/bin/bash

echo "Setting up development tools for macOS..."
echo "This script will install Homebrew, Git, and GitHub CLI"
echo ""

# Install Homebrew
echo "1. Installing Homebrew..."
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Add Homebrew to PATH for Apple Silicon Macs
echo "2. Configuring Homebrew path..."
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"

# Install Git (latest version)
echo "3. Installing Git..."
brew install git

# Install GitHub CLI
echo "4. Installing GitHub CLI..."
brew install gh

# Verify installations
echo ""
echo "Verifying installations:"
echo "Homebrew version: $(brew --version | head -1)"
echo "Git version: $(git --version)"
echo "GitHub CLI version: $(gh --version | head -1)"

echo ""
echo "Setup complete! Now let's authenticate with GitHub:"
echo ""

# Authenticate with GitHub
gh auth login

# After authentication, push the branch
echo ""
echo "Pushing V7.1 branch to GitHub..."
cd /Users/mohit/mohit-ai-frontend-v7
git push -u origin V7.1

echo ""
echo "Done! Your V7.1 branch should now be visible at:"
echo "https://github.com/Mohit4022-cloud/Mohit-AI-Frontend/tree/V7.1"