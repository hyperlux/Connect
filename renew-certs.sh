#!/bin/bash

echo "Starting certificate renewal process..."

# Renew certificates
certbot renew --force-renewal

# Check if renewal was successful
if [ $? -eq 0 ]; then
    echo "Certificates renewed successfully"
    
    # Copy new certificates to correct location
    cp /etc/letsencrypt/live/auroville.social/fullchain.pem /etc/nginx/ssl/
    cp /etc/letsencrypt/live/auroville.social/privkey.pem /etc/nginx/ssl/
    
    # Set proper permissions
    chmod 644 /etc/nginx/ssl/fullchain.pem
    chmod 600 /etc/nginx/ssl/privkey.pem
    
    # Restart nginx to apply new certificates
    docker-compose restart nginx
    
    echo "Certificate renewal process completed"
else
    echo "Certificate renewal failed"
    exit 1
fi

# Log the renewal
echo "$(date): Certificate renewal completed" >> /var/log/cert-renewal.log