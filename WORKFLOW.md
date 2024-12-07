# Auroville Connect Workflow

## Development Workflow

1. Make changes locally using Cursor
2. Test changes locally:
   ```bash
   # Start all services
   docker-compose up -d
   
   # View logs
   docker-compose logs -f
   ```

3. Commit and push changes:
   ```bash
   git add .
   git commit -m "your commit message"
   git push origin main
   ```

4. Deploy to production server:
   ```bash
   # SSH into server
   ssh root@134.209.151.102

   # Navigate to project
   cd AurovilleConnect

   # Pull latest changes
   git pull origin main

   # Rebuild and restart containers
   docker-compose down
   docker-compose build
   docker-compose up -d

   # View logs if needed
   docker-compose logs -f
   ```

5. View changes at https://auroville.social

## Docker Services

The application runs three services:
- Frontend (nginx) - Serves the web application
- API (Node.js) - Runs on port 5000
- Database (PostgreSQL) - Runs on port 5432

## Environment Variables

All configuration is done through environment variables in docker-compose.yml and .env files.
No distinction between development and production environments to keep things simple.