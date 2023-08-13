#!/bin/bash
cd ./

# Pull the latest code
git pull origin main

# Run the build command
pnpm frontend:build

# Deploy to Fleek
pnpm frontend:deploy