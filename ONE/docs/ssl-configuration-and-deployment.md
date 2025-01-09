# SSL Configuration and Deployment Guide

## Overview
This document outlines the steps to configure SSL certificates and deploy the Auroville Connect application in a Docker production environment.

## SSL Certificate Configuration

1. Obtain Let's Encrypt certificates:
```bash
sudo certbot certonly --standalone -d yourdomain.com
```

2. Verify certificate files:
```bash
ls -la /etc/letsencrypt/live/yourdomain.com/
```

3. Set proper permissions:
```bash
sudo chmod 644 /etc/letsencrypt/live/yourdomain.com/fullchain.pem
sudo chmod 600 /etc/letsencrypt/live/yourdomain.com/privkey.pem
```

## Docker Nginx Configuration

1. Update nginx.docker.conf with SSL settings:
```nginx
server {
    listen 443 ssl;
    server_name yourdomain.com;

    ssl_certificate /etc/ssl/certs/fullchain.pem;
    ssl_certificate_key /etc/ssl/private/privkey.pem;

    # Other SSL configurations...
}
```

2. Configure HTTP to HTTPS redirection:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$host$request_uri;
}
```

## Production Deployment with Docker

1. Build production assets:
```bash
npm run build
```

2. Start Docker containers:
```bash
docker-compose up -d
```

3. Verify deployment:
- Main site: https://yourdomain.com
- API endpoint: https://yourdomain.com/api

## Troubleshooting SSL in Docker

1. Verify certificate mounting:
```bash
docker exec auroville_nginx ls -la /etc/ssl/certs/
docker exec auroville_nginx ls -la /etc/ssl/private/
```

2. Check nginx SSL configuration:
```bash
docker exec auroville_nginx nginx -t
```

3. View nginx logs:
```bash
docker logs auroville_nginx
```

4. Recreate certificates if needed:
```bash
sudo certbot delete --cert-name yourdomain.com
sudo certbot certonly --standalone -d yourdomain.com
```

## Certificate Renewal

1. Create a renewal script (renew-certs.sh):
```bash
#!/bin/bash
certbot renew --force-renewal
docker-compose restart nginx
```

2. Make script executable:
```bash
chmod +x renew-certs.sh
```

3. Add cron job for automatic renewal:
```bash
0 0 * * * /path/to/renew-certs.sh >> /var/log/cert-renewal.log 2>&1
```

## Maintenance

1. Monitor container logs:
```bash
docker logs -f auroville_nginx
```

2. Check certificate expiration:
```bash
sudo certbot certificates
```

3. Update containers:
```bash
docker-compose pull
docker-compose up -d
```

4. Backup certificates:
```bash
sudo tar -czvf certs-backup.tar.gz /etc/letsencrypt