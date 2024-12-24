Useful commands to remember

npm run dev:all

bash restart-servers.sh
                                 
   git pull origin main  
   git reset --hard 
                                
cd server
npm run dev

    ssh root@142.93.218.172
    password: love

cd AurovilleConnect

---
production server (ubuntu) environment
.env                                  
SMTP_SERVER=smtp.ionos.com
SMTP_PORT=587
SMTP_USERNAME=notifications@aurovillenetwork.us
SMTP_PASSWORD=lovelightforever888!
SMTP_FROM_NAME=Auroville Community
SMTP_FROM_EMAIL=notifications@aurovillenetwork.us

# Database configuration
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=auroville

# Node environment
NODE_ENV=production

# CORS Configuration
CORS_ORIGIN=https://auroville.social
SMTP_PORT=465


---
.env inside server folder
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/auroville"
JWT_SECRET="72jmcBa8LYTi7szZp1Lw9+GmKuEXp76og8B1FyySqOg8f3a5d2e1c4b7"
PORT=5000

# URLs
FRONTEND_URL=https://auroville.social
API_URL=https://api.auroville.social

# Email settings
SMTP_SERVER=smtp.ionos.com
SMTP_PORT=587
SMTP_USERNAME=notifications@aurovillenetwork.us
SMTP_PASSWORD=lovelightforever888!

# Database configuration
DB_PASSWORD=postgres

---
# Work with GPT-4o on your repo
# Removed Anthropic API Key

--

JWT_SECRET=ea21a8d798aa16aacce7fbcff1cde5dfbe50a294d5c7d14aee0ee>

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

---
# Project Context

## File Structure
```
.gitignore
auroville-connect.service
AurovilleConnect
dashboard.png
ecosystem.config.js
eslint.config.js
index.html
nginx.conf
package-lock.json
package.json
postcss.config.js
README.md
restart-servers.sh
settings
tailwind.config.js
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.d.ts
vite.config.ts
docs/
docs/README.md
docs/deployment/
docs/deployment/server-setup.md
docs/development/
docs/development/typescript-guide.md
docs/development/workflow.md
docs/maintenance/
logs/
prisma/
prisma/schema.prisma
prisma/migrations/
prisma/migrations/migration_lock.toml
prisma/migrations/20241212121403_add_voting/
prisma/migrations/20241213074915_add_events_and_services/
prisma/migrations/20241213120500_update_event_model/
public/
public/favicon.png
public/logodark.png
public/logolight.png
public/manifest.json
public/service-worker.js
public/auroimgs/
public/auroimgs/05jogging-in-the-green-belt_29944057187_o.jpg
public/auroimgs/06residential-zone_44160197054_o.jpg
public/auroimgs/08architecture_44830142842_o.jpg
public/auroimgs/09building-a-mud-house_29944061497_o.jpg
public/auroimgs/10building-new-roads_44830149562_o.jpg
public/auroimgs/12new-dawn-carpentry_44880868171_o.jpg
public/auroimgs/13buddha-garden-work_44880869151_o.jpg
public/auroimgs/14botanical-garden-nursery_43068782600_o.jpg
public/auroimgs/17preparing-lunch_44880875711_o.jpg
public/auroimgs/18permaculture-garden_44880878331_o.jpg
public/auroimgs/19residential-building_43068787770_o.jpg
public/auroimgs/20savitri-bhavan_43068788430_o.jpg
public/auroimgs/21meeting-in-unity-pavilion_43969149445_o.jpg
public/auroimgs/22general-meeting-in-unity-pavilion_43969150785_o.jpg
public/auroimgs/23international-meeting-in-unity-pavilion_43068790570_o.jpg
public/auroimgs/24auroville-village-action-group_43068792440_o.jpg
public/auroimgs/25dehashakti-sportsground_44160221854_o.jpg
public/auroimgs/26transition-school_44830164662_o.jpg
public/auroimgs/27the-learning-community-students_43969157465_o.jpg
public/auroimgs/29udavi-outreach-school_44160225694_o.jpg
public/auroimgs/30aikiyam-outreach-school_43969160545_o.jpg
public/auroimgs/31future-school-students-presentation_44880893391_o.jpg
public/auroimgs/32building-a-city_31007558868_o.jpg
public/auroimgs/33the-visitors-centre_29944086237_o.jpg
public/auroimgs/35mira-boutique-in-visitors-centre_44880897981_o.jpg
public/auroimgs/36auroville-consulting-office_31007561908_o.jpg
public/auroimgs/41sports_31007570488_o.jpg
public/auroimgs/43laughter-day_43068824640_o.jpg
public/auroimgs/44painting-with-flowers-workshop_43969172345_o.jpg
public/auroimgs/47art-exhibition-in-citadines-art-centre_43969174135_o.jpg
public/auroimgs/49drawing-kolams-in-matrimandir-amphitheatre_43068834800_o.jpg
public/auroimgs/50matrimandir_31007584638_o.jpg
public/auroimgs/51auroville-film-festival-screening_43068836740_o.jpg
public/auroimgs/52cinema-paradiso_43068838850_o.jpg
public/auroimgs/54new-year-meditation-in-the-pavilion-of-tibetan-culture_44160248614_o.jpg
public/auroimgs/55the-auroville-choir-in-the-sri-aurobindo-auditorium_43068844670_o.jpg
public/auroimgs/56auroville-birthday_31007597308_o.jpg
public/auroimgs/alternative-energy_43068818240_o.jpg
public/auroimgs/aureka-workshop_44830150712_o.jpg
public/auroimgs/av-papers_44160231204_o.jpg
public/auroimgs/clay-pottery-workshop-18th-december-2016_31007556068_o.jpg
public/auroimgs/construction-site-of-aspiration_31007518018_o.jpg
public/auroimgs/early-years-scanned-picture_43068769850_o.jpg
public/auroimgs/fred-c-drone-photos_43068849880_o.jpg
public/auroimgs/galaxy-model_44830138912_o.jpg
public/auroimgs/harvest_43068782900_o.jpg
public/auroimgs/harvest_44880874601_o.jpg
public/auroimgs/inauguration-of-auroville_29944053047_o.jpg
public/auroimgs/it-was-a-desert-by-ph_43068819790_o.jpg
public/auroimgs/last-school-buildings-and-compound_43969135685_o.jpg
public/auroimgs/matrimandir-front-view_43068847490_o.jpg
public/auroimgs/mirror-canvas-exhibition-2016_43068832610_o.jpg
public/auroimgs/nuagas-jazz-concert-visitor-centre-2016_43068843510_o.jpg
public/auroimgs/painting-demo-by-artists-a-viswam--m-jayakumar-2016_43068829700_o.jpg
public/auroimgs/sankalpa-art-journeys-art-break-day-2016-believe_44830186642_o.jpg
public/auroimgs/solar-bowls_44830174712_o.jpg
public/auroimgs/the-learning-community-tlc-open-house-2016_44830184292_o.jpg
public/auroimgs/town-hall-building_31007562958_o.jpg
server/
server/index.js
server/nodemon.json
server/package-lock.json
server/package.json
server/schema.sql
server/test-email.mjs
server/config/
server/config/development.cjs
server/config/production.cjs
server/lib/
server/lib/db.js
server/lib/email.js
server/lib/notifications.js
server/lib/prisma.js
server/lib/upload.js
server/logs/
server/middleware/
server/middleware/authenticate.js
server/middleware/errorHandler.js
server/prisma/
server/prisma/schema.prisma
server/prisma/seed.js
server/prisma/migrations/
server/routes/
server/routes/auth.mjs
server/routes/events.js
server/routes/forums.js
server/routes/notifications.js
server/routes/services.js
server/routes/users.js
server/scripts/
server/scripts/check-user.js
server/scripts/check-user.mjs
server/scripts/create-admin.js
server/scripts/create-auroville-data.js
server/scripts/create-mock-events.js
server/scripts/create-test-admin.js
server/scripts/create-test-post.js
server/scripts/create-test-posts.js
server/scripts/create-test-user.mjs
server/scripts/db-admin.js
server/scripts/delete-all-events.js
server/scripts/generate-jwt-secret.js
server/scripts/generate-test-jwt.mjs
server/scripts/make-admin.js
server/scripts/simple-admin.js
server/scripts/update-user.js
server/scripts/verify.mjs
server/uploads/
server/uploads/profilePicture-1734016799612-546596024.jpeg
server/uploads/profilePicture-1734016924408-975715777.jpeg
server/uploads/profilePicture-1734016950003-793753867.jpeg
server/uploads/profilePicture-1734017119408-113557662.jpeg
server/uploads/profilePicture-1734089133295-807569729.jpeg
server/uploads/profilePicture-1734972415956-991679439.jpg
server/uploads/profilePicture-1734972515840-990605496.jpg
server/uploads/profilePicture-1734972565004-999201852.jpg
server/uploads/profilePicture-1734972631867-533233469.jpg
server/uploads/profilePicture-1734972753531-337020529.jpg
server/uploads/profilePicture-1735033482089-737456602.jpeg
src/
src/App.tsx
src/env.d.ts
src/index.css
src/main.tsx
src/router.tsx
src/serviceWorkerRegistration.tsx
src/vite-env.d.ts
src/components/
src/components/Dashboard.tsx
src/components/Header.tsx
src/components/Layout.tsx
src/components/LoadingSpinner.tsx
src/components/LoginForm.tsx
src/components/LoginModal.tsx
src/components/MainContent.tsx
src/components/NotificationsPopover.tsx
src/components/PrivateRoute.tsx
src/components/RegisterModal.tsx
src/components/SearchResults.tsx
src/components/Sidebar.tsx
src/components/SignupForm.tsx
src/components/ThemeToggle.tsx
src/components/events/
src/components/forum/
src/components/services/
src/components/ui/
src/lib/
src/lib/api.ts
src/lib/auth.tsx
src/lib/cache.ts
src/lib/calendar.ts
src/lib/email.ts
src/lib/environment.ts
src/pages/
src/theme/
src/types/
ssl/
```

## Key Files
```
src/App.tsx
src/main.tsx
src/router.tsx
server/index.js
prisma/schema.prisma
package.json
```

## Active Processes
No active processes found.
