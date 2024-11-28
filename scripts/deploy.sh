#!/bin/bash

# Exit on error
set -e

echo "Starting deployment..."

# Pull latest changes
echo "Pulling latest changes..."
git pull origin main

# Install dependencies for frontend
echo "Installing frontend dependencies..."
npm install

# Build frontend
echo "Building frontend..."
npm run build

# Install dependencies for backend
echo "Installing backend dependencies..."
cd server
npm install

# Run database migrations
echo "Running database migrations..."
npx prisma migrate deploy

# Restart PM2 processes
echo "Restarting PM2 processes..."
pm2 restart auroville-server || pm2 start index.js --name auroville-server
cd ..
pm2 restart auroville-client || pm2 serve dist 5173 --name auroville-client --spa

echo "Deployment completed successfully!" 