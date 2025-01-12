# Auroville Connect

A community platform for Auroville residents to connect, share information, and engage in discussions.

![Auroville Connect Dashboard](dashboard.png)
*The Auroville Connect dashboard showing community events, announcements, and forum posts*

## Features

- **Forum System**
  - Create and view posts
  - Comment on posts
  - Vote on posts and comments
  - Sort posts by hot, top, and new
  - View individual post details
  - Track post views

- **User Authentication**
  - Email-based registration
  - JWT authentication
  - Role-based access control
  - Password reset functionality
  - Email verification

- **Community Features**
  - Weekly events calendar
  - City services directory
  - Notifications system
  - User profiles


## Tech Stack

### Mindmap 
![Stack Structure](<Auroville Connect Project Structure.png>)

- **Frontend**
  - React with TypeScript
  - Vite for build tooling
  - TailwindCSS for styling
  - React Router for navigation
  - Zustand for state management

- **Backend**
  - Node.js with Express
  - PostgreSQL database
  - Prisma ORM
  - JWT for authentication
  - Nodemailer for emails

## Development Setup

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/auroville-connect.git
cd auroville-connect
```

2. Install dependencies:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

3. Set up environment variables:
```bash
# In root directory
cp .env.example .env

# In server directory
cd server
cp .env.example .env
```

4. Configure environment variables:
```bash
# Frontend (.env)
VITE_API_URL=http://localhost:5000
VITE_APP_URL=http://localhost:5173

# Backend (server/.env)
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/auroville"
JWT_SECRET="your_jwt_secret"
```

5. Set up the database:
```bash
cd server
npx prisma migrate dev
npx prisma db seed
```

6. Start development servers:
```bash
# Start backend (from server directory)
npm run dev

# Start frontend (from root directory)
npm run dev:local
```

The application will run at `http://localhost:5173` with the API at `http://localhost:5000`.

## Deployment Workflow

### Local Development to Production

1. Make and test changes locally:
```bash
# Start local development servers
npm run dev:local   # Frontend with local API
npm run start:all   # Both frontend and backend
```

2. Commit and push changes:
```bash
git add .
git commit -m "Your descriptive commit message"
git push origin main
```

3. Deploy to production server:
```bash
# SSH into the server
ssh user@auroville.social

# Pull latest changes
cd /root/AurovilleConnect
git pull origin main

# Update dependencies if needed
npm install
cd server && npm install

# Apply database migrations
npx prisma migrate deploy

# Rebuild the application
npm run build:prod

# Restart services
./restart-servers.sh
```

## Production Environment

### Server Configuration

- **Domain**: auroville.social
- **Production URL**: https://auroville.social
- **API URL**: https://api.auroville.social
- **Server OS**: Ubuntu Server
- **Process Manager**: PM2
- **Web Server**: Nginx
- **SSL**: Let's Encrypt

### Environment Variables

```bash
# Production Frontend (.env)
VITE_API_URL=https://api.auroville.social
VITE_APP_URL=https://auroville.social

# Production Backend (server/.env)
NODE_ENV=production
DATABASE_URL="postgresql://postgres:prod_password@localhost:5432/auroville"
```

### Monitoring & Maintenance

1. Service Status:
```bash
# Check application status
pm2 status
pm2 logs

# Check nginx status
sudo systemctl status nginx
```

2. Database Health:
```bash
# Check database size and tables
sudo -u postgres psql -c "
SELECT pg_size_pretty(pg_database_size('auroville')) as db_size,
       pg_size_pretty(pg_total_relation_size('\"User\"')) as users_size,
       pg_size_pretty(pg_total_relation_size('\"ForumPost\"')) as posts_size;
"

# Monitor connections
sudo -u postgres psql -c "
SELECT count(*) as connection_count 
FROM pg_stat_activity 
WHERE datname = 'auroville';
"
```

3. Error Monitoring:
```bash
# Application logs
journalctl -u auroville-connect -n 100 --no-pager | grep -i 'error'

# Database logs
sudo tail -f /var/log/postgresql/postgresql-*.log
```

### Deployment Checklist

Before deploying to production:

- [ ] All tests pass locally
- [ ] Database migrations are ready
- [ ] Environment variables are configured
- [ ] Build succeeds locally
- [ ] SSL certificates are valid
- [ ] Database backups are recent
- [ ] PM2 processes are configured
- [ ] Nginx configuration is correct

### Troubleshooting

1. Application Issues:
   - Check PM2 logs: `pm2 logs`
   - Verify environment variables
   - Check disk space: `df -h`
   - Monitor memory: `free -m`

2. Database Issues:
   - Check PostgreSQL status
   - Verify connection settings
   - Monitor active queries
   - Check available space

3. Network Issues:
   - Verify Nginx configuration
   - Check SSL certificates
   - Test API endpoints
   - Monitor server resources

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Auroville community for inspiration and support
- All contributors who have helped shape this project
