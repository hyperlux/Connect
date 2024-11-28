#!/bin/bash

# Exit on error
set -e

echo "Starting server setup..."

# Install global dependencies
echo "Installing global dependencies..."
npm install -g pm2
npm install -g prisma

# Clone repository if not exists
if [ ! -d "AurovilleConnect" ]; then
  echo "Cloning repository..."
  git clone https://github.com/hyperlux/AurovilleConnect.git
  cd AurovilleConnect
else
  cd AurovilleConnect
  git pull origin main
fi

# Copy environment files
echo "Setting up environment files..."
cp .env.example .env
cp server/.env.example server/.env

# Install frontend dependencies
echo "Installing frontend dependencies..."
npm install

# Build frontend
echo "Building frontend..."
npm run build

# Install backend dependencies
echo "Installing backend dependencies..."
cd server
npm install

# Setup database
echo "Setting up database..."
npx prisma generate
npx prisma migrate deploy

# Create admin user
echo "Creating admin user..."
node scripts/create-admin.js polletkiro@gmail.com "Admin User" "Admin123!"

# Start services with PM2
echo "Starting services..."
pm2 start index.js --name auroville-server
cd ..
pm2 serve dist 5173 --name auroville-client --spa

# Save PM2 process list
echo "Saving PM2 process list..."
pm2 save

# Setup PM2 startup script
echo "Setting up PM2 startup..."
pm2 startup

echo "Setup completed successfully!"
echo "Please update the environment variables in .env and server/.env with your production values." 