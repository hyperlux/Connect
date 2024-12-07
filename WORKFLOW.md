# Auroville Connect Workflow

## Development Workflow

1. Make changes locally using Cursor
2. Test changes locally:
   ```bash
   # In the server directory
   npm start
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

   # Restart the server
   cd server
   pm2 restart auroville-api
   ```

5. View changes at https://auroville.social

## Server Setup

The server runs using PM2 with a single configuration:

```bash
# Initial PM2 setup (only needed once)
cd ~/AurovilleConnect/server
pm2 start npm --name "auroville-api" -- start
pm2 save
```

## Environment Variables

All configuration is done through a single `.env` file in both server and frontend directories.
No distinction between development and production environments to keep things simple. 