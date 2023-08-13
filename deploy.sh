#!/bin/bash
SCRIPT_DIR="$(dirname "$(readlink -f "$0")")"

cd $SCRIPT_DIR

# Pull the latest code
git pull origin develop

# Run the build command
pnpm frontend:build

# Deploy to Fleek
pnpm frontend:deploy