# SSL Configuration and Deployment Guide

## Overview
This document outlines the steps taken to configure SSL certificates and deploy the Auroville Connect application in production.

## SSL Certificate Configuration
1. Created a new Let's Encrypt certificate for both domains:
   ```bash
   sudo certbot certonly --nginx -d auroville.social -d api.auroville.social
   ```
2. Updated Nginx configuration to use the new certificate:
   ```nginx
   ssl_certificate /etc/letsencrypt/live/auroville.social/fullchain.pem;
   ssl_certificate_key /etc/letsencrypt/live/auroville.social/privkey.pem;
   ```
3. Restarted Nginx to apply changes:
   ```bash
   sudo systemctl restart nginx
   ```

## Resolving ERR_BLOCKED_BY_CLIENT
1. Verified frontend API endpoint configuration
2. Rebuilt the frontend application:
   ```bash
   npm run build
   ```
3. Cleared service worker cache
4. Checked for browser extensions blocking requests

## Production Deployment
1. Build the production version:
   ```bash
   npm run build
   ```
2. Start both frontend and backend servers:
   ```bash
   npm run start:all
   ```
3. Verify deployment:
   - Main site: https://auroville.social
   - API endpoint: https://api.auroville.social/api

## Troubleshooting
- If encountering SSL errors:
  1. Verify certificate details:
     ```bash
     sudo certbot certificates
     ```
  2. Check certificate SAN:
     ```bash
     openssl x509 -in /etc/letsencrypt/live/auroville.social/fullchain.pem -text -noout | grep -A 1 "Subject Alternative Name"
     ```
  3. Recreate certificate if needed:
     ```bash
     sudo certbot delete --cert-name api.auroville.social
     sudo certbot certonly --nginx -d auroville.social -d api.auroville.social
     ```

## Maintenance
- Certbot automatically renews certificates
- Monitor logs for errors:
  ```bash
  sudo journalctl -u nginx
  sudo pm2 logs