#!/bin/bash

# Create logs directory if it doesn't exist
mkdir -p logs

# Set ownership to UID 1001 (matches appuser in container)
sudo chown -R 1001:1001 logs

# Set directory permissions to 775
sudo chmod -R 775 logs

echo "Permissions fixed for logs directory"
