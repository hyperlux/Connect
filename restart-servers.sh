#!/bin/bash

# Log file for deployment
LOG_FILE="/var/log/auroville-deploy.log"

# Function to log messages
log_message() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Create log file if it doesn't exist
touch "$LOG_FILE"

log_message "Starting deployment process..."

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   log_message "This script must be run as root"
   exit 1
fi

# Function to check service status
check_service() {
    if systemctl is-active --quiet $1; then
        log_message "$1 is running"
        return 0
    else
        log_message "ERROR: $1 is not running"
        return 1
    fi
}

# Check PostgreSQL
log_message "Checking PostgreSQL..."
check_service postgresql
if [ $? -ne 0 ]; then
    log_message "Failed to verify PostgreSQL. Exiting."
    exit 1
fi

# Check nginx
log_message "Checking nginx..."
check_service nginx
if [ $? -ne 0 ]; then
    log_message "Failed to verify nginx. Exiting."
    exit 1
fi

# Function to check if port is in use
check_port() {
    if lsof -i:$1 >/dev/null; then
        log_message "Port $1 is already in use"
        return 1
    fi
    return 0
}

# Check required ports
log_message "Checking ports..."
check_port 5000
if [ $? -eq 0 ]; then
    log_message "Port 5000 is available"
else
    log_message "Port 5000 is in use. Will attempt to free it."
    pm2 delete all
fi

# Install/update dependencies
log_message "Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    log_message "Failed to install frontend dependencies. Exiting."
    exit 1
fi

cd server
npm install
if [ $? -ne 0 ]; then
    log_message "Failed to install backend dependencies. Exiting."
    exit 1
fi
cd ..

# Run database migrations
log_message "Running database migrations..."
cd server
npx prisma migrate deploy
if [ $? -ne 0 ]; then
    log_message "Failed to run database migrations. Exiting."
    exit 1
fi
cd ..

# Build frontend
log_message "Building frontend..."
npm run build:prod
if [ $? -ne 0 ]; then
    log_message "Frontend build failed. Exiting."
    exit 1
fi

# Restart PM2 processes
log_message "Restarting PM2 processes..."
pm2 delete all
pm2 start server/index.js --name "auroville-api"
if [ $? -ne 0 ]; then
    log_message "Failed to start PM2 processes. Exiting."
    exit 1
fi

# Verify services are running
log_message "Verifying services..."

# Check if API is responding
curl -f http://localhost:5000/health >/dev/null 2>&1
if [ $? -eq 0 ]; then
    log_message "API is responding"
else
    log_message "API is not responding. Deployment may have failed."
    exit 1
fi

# Reload nginx
log_message "Reloading nginx..."
nginx -t
if [ $? -eq 0 ]; then
    systemctl reload nginx
    log_message "nginx reloaded successfully"
else
    log_message "nginx configuration test failed. Check nginx configuration."
    exit 1
fi

log_message "Deployment completed successfully!"

# Display status
pm2 status
nginx -t

exit 0
