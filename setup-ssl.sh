#!/bin/bash

# Exit on error
set -e

# Enable debugging
set -x

# Check if domain is provided
DOMAIN="auroville.social"

# Ask for email if not provided
echo "Enter email address for SSL certificate notifications:"
read EMAIL

# Validate email
if [[ ! "$EMAIL" =~ ^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$ ]]; then
    echo "Invalid email address"
    exit 1
fi

# Install certbot if not already installed
if ! command -v certbot &> /dev/null; then
    echo "Installing certbot..."
    apt-get update
    apt-get install -y certbot
fi

# Ensure all services are stopped
echo "Stopping all services..."
docker-compose down || true
pkill -f nginx || true
pkill -f certbot || true

# Clean up any previous attempts
echo "Cleaning up previous certificate attempts..."
rm -rf /etc/letsencrypt/live/$DOMAIN
rm -rf /etc/letsencrypt/archive/$DOMAIN
rm -rf /etc/letsencrypt/renewal/$DOMAIN.conf

# Get SSL certificate
echo "Obtaining SSL certificate for $DOMAIN..."
certbot certonly --standalone \
    --preferred-challenges http \
    -d $DOMAIN \
    --agree-tos \
    --email "$EMAIL" \
    --non-interactive \
    --server https://acme-v02.api.letsencrypt.org/directory \
    --debug

if [ $? -eq 0 ]; then
    echo "SSL certificate obtained successfully"
    
    # Set up auto-renewal
    if ! crontab -l | grep -q "certbot renew"; then
        (crontab -l 2>/dev/null; echo "0 0 * * * certbot renew --quiet --deploy-hook 'docker restart auroville_nginx'") | crontab -
        echo "Added certificate renewal to crontab"
    fi
    
    echo "SSL setup completed. You can now run deploy.sh"
else
    echo "Failed to obtain SSL certificate. Check the logs at /var/log/letsencrypt/letsencrypt.log"
    exit 1
fi