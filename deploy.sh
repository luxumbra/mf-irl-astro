#!/bin/bash
SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"

cd $SCRIPT_DIR

# Pull the latest code
git fetch && git pull origin develop

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "pnpm not found! Installing..."
    npm install -g pnpm
else
    echo "pnpm is already installed."
fi

# Install dependencies
pnpm install

# Run the build command
pnpm frontend:build

# Deploy to Fleek
pnpm frontend:deploy