# AurovilleConnect Deployment Documentation

## Overview
This document explains the deployment process for the AurovilleConnect application, including the deployment script, encountered issues, and implemented solutions.

## Deployment Script (`deploy.sh`)

### Purpose
The deployment script automates the process of:
1. Cleaning up previous deployment leftovers
2. Removing unused Docker objects
3. Building Docker images
4. Starting services
5. Verifying service health

### Key Features
- **Cleanup**: Removes previous containers, volumes, and unused Docker objects
- **Health Checks**: Verifies that all services (db, app, nginx) are healthy before completing
- **Idempotency**: Can be run multiple times without manual cleanup

### Script Flow
1. Clean previous deployment
2. Remove unused Docker objects
3. Build Docker images
4. Stop existing containers
5. Start services
6. Verify service health
7. Complete deployment

## Issues Encountered

### CSS Display Issues
- CSS displays correctly in development but not in production
- Potential causes:
  - Nginx configuration
  - Build process differences
  - Cache issues

### Deployment Script Issues
- Incomplete script causing syntax errors
- Missing health check functionality
- No cleanup of previous deployment leftovers

## Solutions Implemented

### Deployment Script Improvements
1. Added complete cleanup process
2. Implemented proper health checks
3. Added service verification
4. Improved error handling

### CSS Investigation
1. Verified Nginx configuration
2. Checked build output
3. Verified asset paths
4. Tested with cache clearing

## Current Understanding

The deployment process is now more robust with:
- Proper cleanup of previous deployments
- Verification of service health
- Better error handling

The CSS issue appears to be related to:
- Potential differences between development and production builds
- Nginx configuration for static assets
- Possible cache-related issues

## Next Steps
1. Continue investigating CSS display issues
2. Verify Nginx static asset configuration
3. Test with different build configurations
4. Implement cache-busting strategies

## Technical Details

### Docker Services
- **db**: PostgreSQL database
- **app**: Node.js application
- **nginx**: Web server and reverse proxy

### Health Check Implementation
```bash
for service in db app nginx; do
    echo "Checking $service..."
    while ! docker-compose ps | grep "$service" | grep -q "healthy"; do
        sleep 5
    done
    echo "$service is healthy"
done
```

### Cleanup Process
```bash
docker-compose down --volumes --remove-orphans
docker system prune -f
```

This documentation will be updated as we continue to improve the deployment process and resolve outstanding issues.
