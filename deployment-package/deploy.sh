#!/bin/bash

# Deployment Script for LinkedIn AI Agent

# Step 1: Install dependencies
echo "Installing dependencies..."
npm install

# Step 2: Build the application
echo "Building application..."
npm run build

# Step 3: Run tests
echo "Running tests..."
npm test

# Step 4: Start the application
echo "Starting application..."
npm start

# Step 5: Verify deployment
echo "Verifying deployment..."
curl -I http://localhost:8080

echo "Deployment complete!"