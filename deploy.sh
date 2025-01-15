#!/bin/bash

# Exit on error
set -e

# Build frontend
echo "Building frontend..."
npm run build

# Stop and start containers
echo "Restarting containers..."
docker-compose down
docker-compose up -d --build

# Basic health check
echo "Waiting for containers to start..."
sleep 10

if ! docker exec auroville_app curl -f -s http://localhost:5000/health > /dev/null; then
    echo "ERROR: Health check failed"
    exit 1
fi

echo "Deployment completed successfully"
