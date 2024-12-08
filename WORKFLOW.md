# Deployment Workflow

## Development to Production Workflow

1. Make changes locally
2. Test changes locally
3. Commit and push to GitHub
4. SSH into production server
5. Pull changes and deploy

```bash
# On your local machine
git add .
git commit -m "Your commit message"
git push

# SSH into production server
ssh root@auroville.social

# On production server
cd ~/AurovilleConnect
git pull
docker-compose -f docker-compose.prod.yml up -d --build
```

## Important Notes

- The application runs in Docker containers on the production server
- Do NOT run nginx directly on the host system - it's handled by Docker
- Ports 80 and 443 are managed by the Docker containers

## Common Issues and Solutions

### 1. CORS Issues
- CORS is handled by Express in the API server
- Do not add CORS headers in nginx configuration
- Check `server/index.js` for CORS settings

### 2. Port Conflicts
If you see errors about ports 80/443 being in use:
```bash
# Check what's using the ports
sudo lsof -i :80 -i :443

# If it's docker-proxy processes:
sudo docker container ls
docker-compose down
sudo killall docker-proxy  # Force kill any hanging docker-proxy processes
sudo systemctl restart docker  # Restart Docker daemon

# If it's nginx running on the host:
sudo systemctl stop nginx
sudo systemctl disable nginx  # Prevent nginx from starting on boot
sudo rm /etc/nginx/sites-enabled/default  # Remove host nginx config

# Clean up all unused Docker resources
docker system prune -f

# Restart Docker containers
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d
```

### 3. Container Issues
To check container status:
```bash
docker ps
docker-compose ps
docker logs aurovilleconnect_frontend_1  # Check frontend logs
docker logs aurovilleconnect_api_1       # Check API logs

# If containers are stuck or misbehaving:
docker-compose down
docker system prune -f  # Clean up unused resources
docker volume prune -f  # Clean up unused volumes (careful with database volumes!)
docker-compose -f docker-compose.prod.yml up -d --build  # Rebuild and start
```

## SSL Certificates
- SSL certificates are mounted from `/etc/letsencrypt`
- Renewal is handled by certbot
- Certificate paths are configured in Docker Compose and nginx configs

## Environment Variables
Important environment variables in production:
- `VITE_API_URL=https://api.auroville.social`
- `VITE_APP_URL=https://auroville.social`
- `NODE_ENV=production`
- Database connection strings and secrets are managed in docker-compose.prod.yml
```

</rewritten_file>
