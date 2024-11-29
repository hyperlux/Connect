#!/bin/bash

# Build the application
npm run build:prod

# Copy the build files to the nginx directory
sudo cp -r dist/* /var/www/html/

# Set correct permissions
sudo chown -R www-data:www-data /var/www/html/
sudo chmod -R 755 /var/www/html/

# Restart nginx
sudo systemctl restart nginx

echo "Deployment complete!" 