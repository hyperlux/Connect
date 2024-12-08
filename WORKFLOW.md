# Deployment Workflow

## Server Setup
- Ubuntu server running at auroville.social
- Docker and Docker Compose installed
- SSL certificates in /etc/letsencrypt

## Development Workflow

1. Make changes and push to git:
```bash
git add .
git commit -m "Your changes"
git push
```

2. Deploy on server:
```bash
git pull origin main
docker compose down
docker compose build
docker compose up -d
docker compose logs -f
```

3. Check logs if needed:
```bash
docker compose logs -f
```

## SSL Certificates
- Managed by Let's Encrypt
- Auto-renewal configured
- Mounted at /etc/letsencrypt

## Important Notes
- All development happens directly on the server
- Single docker-compose.yml for simplicity
- Production environment variables in .env

## Development and Deployment Workflow

## Local Development
1. Make changes locally in Cursor IDE
2. Test changes locally
3. Commit and push to git

## Server Deployment
1. SSH into server
2. Pull latest changes: `git pull`
3. Rebuild and restart services: `docker-compose down && docker-compose up --build -d`

## Domain Configuration
The application uses two domains:
- `auroville.social` - Frontend application
- `api.auroville.social` - Backend API

The nginx configuration (`nginx.conf`) handles:
- SSL termination for both domains
- Serving static frontend files from `/usr/share/nginx/html`
- Proxying API requests to the backend service
- HTTP to HTTPS redirection
- CORS headers for API requests

## SSL Certificates
SSL certificates from Let's Encrypt are mounted from:
```
/etc/letsencrypt/live/auroville.social/fullchain.pem
/etc/letsencrypt/live/auroville.social/privkey.pem
```

## Container Architecture
- Frontend: Nginx serving static files + handling SSL
- Backend: Node.js API service
- Database: PostgreSQL

## Important Files
- `nginx.conf` - Nginx configuration for both domains
- `docker-compose.yml` - Container orchestration
- `.env` - Environment variables (keep secure)
