# Development to Production Workflow

## Overview

This document outlines the complete workflow for developing and deploying the Auroville Connect platform, covering local development on Mac, Git repository management, and deployment to the Ubuntu production server.

## System Requirements

### Local Development (Mac)
- macOS with zsh or bash shell
- VSCode with updated shell integration
- Node.js 18+ and npm
- Git

### Production Server (Ubuntu)
- Ubuntu Server 20.04 or later
- bash shell
- Node.js 18+ and npm
- PostgreSQL 16+
- nginx
- PM2

## Local Development (Mac)

### Initial Setup

1. Clone the repository:
```bash
git clone https://github.com/hyperlux/AurovilleConnect.git
cd AurovilleConnect
```

2. Install dependencies:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server && npm install && cd ..
```

3. Set up environment variables:
```bash
# Create frontend .env
cp .env.example .env

# Create backend .env
cd server && cp .env.example .env && cd ..
```

### Development Process

1. Start development servers:
```bash
# Terminal 1: Start backend
npm run start:server

# Terminal 2: Start frontend
npm run dev:local
```

2. Code verification before commit:
```bash
# Run type checking
npm run typecheck

# Run linting
npm run lint

# Run both
npm run verify:build
```

3. Test production build locally:
```bash
# Build for production
npm run build:prod

# Preview production build
npm run preview
```

## Git Repository Management

### Branch Strategy

- `main`: Production branch, always stable
- `develop`: Development branch, feature integration
- `feature/*`: Individual feature branches
- `hotfix/*`: Emergency fixes for production

### Workflow

1. Create feature branch:
```bash
git checkout -b feature/your-feature-name
```

2. Make changes and commit:
```bash
git add .
git commit -m "feat: your descriptive commit message"
```

3. Keep branch updated:
```bash
git fetch origin
git rebase origin/develop
```

4. Push changes:
```bash
git push origin feature/your-feature-name
```

5. Create pull request:
- Feature branch → develop
- Include description of changes
- Link related issues

## Production Deployment (Ubuntu Server)

### Prerequisites

- SSH access to production server
- Proper environment variables set
- SSL certificates installed
- PostgreSQL database running

### Environment Configuration

The production server requires specific environment variables. Create a `.env` file in the server directory with the following configuration:

```bash
# Email Configuration
SMTP_SERVER=smtp.ionos.com
SMTP_PORT=465
SMTP_USERNAME=notifications@aurovillenetwork.us
SMTP_PASSWORD=lovelightforever888!
SMTP_FROM_NAME=Auroville Community
SMTP_FROM_EMAIL=notifications@aurovillenetwork.us

# Database Configuration
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=auroville
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/auroville"

# Node Environment
NODE_ENV=production

# CORS Configuration
CORS_ORIGIN=https://auroville.social
```

### Database Setup

1. Create the database:
```bash
sudo -u postgres psql -c "CREATE DATABASE auroville;"
```

2. Apply migrations:
```bash
cd server
npx prisma generate
npx prisma migrate deploy
cd ..
```

### Deployment Process

1. On local machine, prepare for deployment:
```bash
# Verify build
npm run verify:build
npm run build:prod
```

2. Push to repository:
```bash
git add .
git commit -m "chore: prepare for deployment"
git push origin main
```

3. SSH into production server:
```bash
ssh user@auroville.social
```

4. Deploy changes:
```bash
# Navigate to project
cd /root/AurovilleConnect

# Pull latest changes
git pull origin main

# Install dependencies
npm install
cd server && npm install && cd ..

# Apply database migrations
cd server && npx prisma migrate deploy && cd ..

# Build frontend
npm run build:prod

# Restart services
./restart-servers.sh
```

Note: The restart-servers.sh script logs all deployment activities to /var/log/auroville-deploy.log for monitoring and troubleshooting.

### Verify Deployment

1. Check application status:
```bash
# Check PM2 processes
pm2 status
pm2 logs

# Check nginx
sudo systemctl status nginx
```

2. Verify websites:
- Frontend: https://auroville.social
- API: https://api.auroville.social

3. Monitor logs:
```bash
# Deployment logs
tail -f /var/log/auroville-deploy.log

# Application logs
sudo journalctl -u auroville-connect -f

# Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## Rollback Process

If deployment fails:

1. Revert to previous version:
```bash
# On production server
cd /root/AurovilleConnect
git reset --hard HEAD~1
```

2. Rebuild and restart:
```bash
npm install
cd server && npm install && cd ..
npm run build:prod
./restart-servers.sh
```

3. If database rollback needed:
```bash
cd server
npx prisma migrate reset
```

## Maintenance

### SSL Certificates

Monitor SSL certificate expiration:
```bash
sudo certbot certificates
```

Renew certificates:
```bash
sudo certbot renew
```

### Database Backups

Create backup:
```bash
pg_dump -U postgres auroville > backup.sql
```

Restore if needed:
```bash
psql -U postgres auroville < backup.sql
```

### Log Rotation

Logs are automatically rotated by logrotate. Check configuration:
```bash
cat /etc/logrotate.d/nginx
```

### System Updates

Regular system updates:
```bash
sudo apt update
sudo apt upgrade
```

## Troubleshooting

### Common Issues

1. Build failures:
```bash
# Clear caches
rm -rf node_modules/.cache
rm -rf node_modules/.vite

# Fresh install
rm -rf node_modules
npm install
```

2. Database connection issues:
- Check DATABASE_URL in .env matches the format: postgresql://[user]:[password]@localhost:5432/[dbname]
- Verify PostgreSQL is running: `systemctl status postgresql`
- Check database permissions: `sudo -u postgres psql -c "\du"`
- Test connection: `psql -U postgres -d auroville -c "\conninfo"`

3. Nginx issues:
```bash
# Test configuration
sudo nginx -t

# Check logs
sudo tail -f /var/log/nginx/error.log
```

4. PM2 process crashes:
```bash
# Check logs
pm2 logs

# Restart with logging
pm2 restart all --log
```

5. Prisma migration issues:
```bash
# Reset Prisma client
rm -rf node_modules/.prisma
npm install @prisma/client

# Verify database connection
npx prisma db pull

# Force reset (if needed)
npx prisma migrate reset --force
```

### Shell Integration Issues

If you encounter shell integration warnings in VSCode:
1. Update VSCode (CMD/CTRL + Shift + P → "Update")
2. Ensure you're using a supported shell:
   - Mac: zsh (recommended) or bash
   - Ubuntu: bash
3. Select the correct shell in VSCode:
   - CMD/CTRL + Shift + P → "Terminal: Select Default Profile"
   - Choose zsh for Mac or bash for Ubuntu

### Emergency Contacts

- System Administrator: [Contact Info]
- Database Administrator: [Contact Info]
- Project Lead: [Contact Info]

Remember to keep this document updated as processes evolve. Last updated: December 14, 2024
