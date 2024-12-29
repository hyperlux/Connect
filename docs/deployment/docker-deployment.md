# Docker Deployment Guide

## Overview
This document provides instructions for deploying the Auroville Connect platform using Docker.

## Prerequisites
- Docker installed
- Docker Compose installed
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

volumes:
  postgres_data:

networks:
  auroville_network:
    driver: bridge
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

4. Check logs:
```bash
docker logs auroville_app
```

## Troubleshooting

### Connection Issues
- Verify database container is running
- Check network connectivity between containers
- Validate environment variables

### Performance Problems
- Monitor resource usage:
```bash
docker stats
```
- Adjust resource limits in docker-compose.yml

### Migration Issues
- Run migrations manually:
```bash
docker exec auroville_app npx prisma migrate deploy
```

## Maintenance
- Backup database regularly
- Monitor logs for errors
- Update containers as needed