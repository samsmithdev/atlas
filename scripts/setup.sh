#!/bin/bash

echo "🚀 Starting ATLAS WSL Environment Setup..."

# 1. Update the System
echo "--- Updating Package Lists ---"
sudo apt update && sudo apt upgrade -y

# 2. Install Git and Build Essentials
# build-essential is critical for Prisma and native npm modules
echo "--- Installing Git, Curl, and Build Tools ---"
sudo apt install -y git curl build-essential

# 3. Interactive Git Config
echo "--- Git Configuration ---"
read -p "Enter your full name for Git: " git_user_name
read -p "Enter your email for Git: " git_user_email

git config --global user.name "$git_user_name"
git config --global user.email "$git_user_email"
git config --global init.defaultBranch main

# 4. Install NVM (Node Version Manager)
echo "--- Installing NVM ---"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Manually load NVM so we can use it immediately in this script
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# 5. Install Node.js LTS
echo "--- Installing Node.js LTS ---"
nvm install --lts
nvm use --lts
nvm alias default 'lts/*'

echo "--- Verifying Installations ---"
node -v
npm -v
git --version

echo "✅ Setup Complete! Restart your terminal to finalize NVM loading."