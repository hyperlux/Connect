# Docker Deployment Guide

## Overview
This document provides instructions for deploying the Auroville Connect platform using Docker in production.

## Prerequisites
- Docker installed
- Docker Compose installed
- Let's Encrypt SSL certificates
- Sufficient system resources (RAM, CPU)

## Configuration

### docker-compose.yml
```yaml
version: '3.8'

services:
  db:
    image: postgres:16
    container_name: auroville_db
    environment:
      POSTGRES_USER: auroville_user
      POSTGRES_PASSWORD: ok
      POSTGRES_DB: auroville_connect
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    networks:
      - auroville_network

  app:
    build: .
    container_name: auroville_app
    depends_on:
      - db
    environment:
      DATABASE_URL: "postgresql://auroville_user:ok@db:5432/auroville_connect"
      NODE_ENV: production
    ports:
      - "5000:5000"
    networks:
      - auroville_network
    restart: unless-stopped

  nginx:
    image: nginx:latest
    container_name: auroville_nginx
    depends_on:
      - app
    volumes:
      - ./nginx.docker.conf:/etc/nginx/nginx.conf
      - ./dist:/usr/share/nginx/html
      - /etc/letsencrypt/live/yourdomain.com/fullchain.pem:/etc/ssl/certs/fullchain.pem
      - /etc/letsencrypt/live/yourdomain.com/privkey.pem:/etc/ssl/private/privkey.pem
    ports:
      - "80:80"
      - "443:443"
    networks:
      - auroville_network
    restart: unless-stopped

volumes:
  postgres_data:

networks:
  auroville_network:
    driver: bridge
```

## Production Build Steps

1. Build the production assets:
```bash
npm run build
```

2. Verify the dist directory structure:
```bash
ls -la dist/
```

3. Ensure proper file permissions:
```bash
chmod -R 755 dist/
```

## Deployment Steps

1. Build the Docker images:
```bash
docker-compose build
```

2. Start the services:
```bash
docker-compose up -d
```

3. Verify the containers are running:
```bash
docker ps
```

4. Check nginx logs:
```bash
docker logs auroville_nginx
```

## SSL Configuration

1. Obtain Let's Encrypt certificates:
```bash
sudo certbot certonly --standalone -d yourdomain.com
```

2. Verify certificate files exist:
```bash
ls -la /etc/letsencrypt/live/yourdomain.com/
```

3. Ensure proper permissions for certificate files:
```bash
sudo chmod 644 /etc/letsencrypt/live/yourdomain.com/fullchain.pem
sudo chmod 600 /etc/letsencrypt/live/yourdomain.com/privkey.pem
```

## Nginx Configuration

The nginx.docker.conf file should include:

- HTTP to HTTPS redirection
- SSL configuration with proper certificate paths
- Static file serving from /usr/share/nginx/html
- Proxy pass for API requests to the app service
- Proper caching headers for static assets

## Troubleshooting

### SSL Issues
- Verify certificate files are mounted correctly
- Check nginx logs for SSL-related errors
- Ensure certificate files have proper permissions

### Static File Issues
- Verify dist directory is mounted correctly
- Check file permissions in the container:
```bash
docker exec auroville_nginx ls -la /usr/share/nginx/html
```

### Performance Problems
- Monitor resource usage:
```bash
docker stats
```
- Adjust resource limits in docker-compose.yml

## Maintenance

- Backup database regularly
- Monitor logs for errors
- Update containers as needed
- Renew SSL certificates before expiration