# Live Deployment Process Map

## Overview
We use Docker for deployment to ensure consistency between development and production environments, and to avoid common deployment issues. Docker provides:

- Consistent runtime environment across all stages
- Isolated dependencies and configurations
- Reproducible builds and deployments
- Simplified scaling and maintenance
- Built-in networking between services

## 1. Preparation Phase

### 1.1 System Requirements
- [ ] Verify Docker and Docker Compose are installed
- [ ] Ensure sufficient system resources (RAM, CPU)
- [ ] Set up domain name and DNS records

### 1.2 SSL Certificates
- [ ] Obtain Let's Encrypt certificates:
```bash
sudo certbot certonly --standalone -d yourdomain.com
```
- [ ] Verify certificate files:
```bash
ls -la /etc/letsencrypt/live/yourdomain.com/
```
- [ ] Set proper permissions:
```bash
sudo chmod 644 /etc/letsencrypt/live/yourdomain.com/fullchain.pem
sudo chmod 600 /etc/letsencrypt/live/yourdomain.com/privkey.pem
```

## 2. Build Phase

### 2.1 Production Build
- [ ] Build production assets:
```bash
npm run build
```
- [ ] Verify dist directory structure:
```bash
ls -la dist/
```
- [ ] Set proper file permissions:
```bash
chmod -R 755 dist/
```

### 2.2 Docker Setup
- [ ] Build Docker images:
```bash
docker-compose build
```
- [ ] Verify docker-compose.yml configuration
- [ ] Verify nginx.docker.conf configuration

## 3. Deployment Phase

### 3.1 Initial Deployment
- [ ] Start Docker containers:
```bash
docker-compose up -d
```
- [ ] Verify containers are running:
```bash
docker ps
```

### 3.2 SSL Configuration
- [ ] Verify certificate mounting:
```bash
docker exec auroville_nginx ls -la /etc/ssl/certs/
docker exec auroville_nginx ls -la /etc/ssl/private/
```
- [ ] Check nginx SSL configuration:
```bash
docker exec auroville_nginx nginx -t
```

## 4. Verification Phase

### 4.1 Service Verification
- [ ] Verify main site: https://yourdomain.com
- [ ] Verify API endpoint: https://yourdomain.com/api
- [ ] Check nginx logs:
```bash
docker logs auroville_nginx
```

### 4.2 Performance Check
- [ ] Monitor resource usage:
```bash
docker stats
```
- [ ] Verify response times and error rates

## 5. Maintenance Phase

### 5.1 Certificate Renewal
- [ ] Create renewal script (renew-certs.sh):
```bash
#!/bin/bash
certbot renew --force-renewal
docker-compose restart nginx
```
- [ ] Make script executable:
```bash
chmod +x renew-certs.sh
```
- [ ] Add cron job for automatic renewal:
```bash
0 0 * * * /path/to/renew-certs.sh >> /var/log/cert-renewal.log 2>&1
```

### 5.2 Regular Maintenance
- [ ] Monitor container logs:
```bash
docker logs -f auroville_nginx
```
- [ ] Check certificate expiration:
```bash
sudo certbot certificates
```
- [ ] Update containers:
```bash
docker-compose pull
docker-compose up -d
```
- [ ] Backup certificates:
```bash
sudo tar -czvf certs-backup.tar.gz /etc/letsencrypt
```

## Troubleshooting

### Common Issues
- SSL certificate mounting problems
- Nginx configuration errors
- Container resource limitations
- Certificate renewal failures
- Authentication issues in production

### Authentication Issues
Symptoms:
- Login/Signup requests not reaching server
- API requests failing in production but working locally
- CORS or network errors in browser console

Diagnosis Steps:
1. Verify API endpoint accessibility:
```bash
curl -I https://yourdomain.com/api
```
2. Check nginx logs for authentication requests:
```bash
docker logs auroville_nginx | grep POST
```
3. Verify CORS configuration in nginx.docker.conf
4. Check API server logs:
```bash
docker logs auroville_app
```
5. Verify environment variables in production:
```bash
docker exec auroville_app printenv | grep API
```

Common Solutions:
- Ensure correct API base URL in frontend configuration
- Verify CORS headers in nginx configuration
- Check production environment variables
- Verify network connectivity between containers
- Ensure proper SSL configuration for API endpoints

### General Resolution Steps
1. Verify certificate mounting
2. Check nginx configuration
3. Monitor resource usage
4. Recreate certificates if needed