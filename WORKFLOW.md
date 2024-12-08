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
git pull
docker compose build
docker compose up -d
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
