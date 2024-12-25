# Ubuntu Server Setup Guide

## Prerequisites
- Ubuntu Server 20.04 or later
- Node.js 18+ and npm installed
- Git installed
- Certbot installed for SSL certificates

## Installation Steps

1. Clone the repository:
```bash
git clone https://github.com/yourusername/AurovilleConnect.git
cd AurovilleConnect
```

2. Install dependencies:
```bash
npm install
cd server && npm install && cd ..
```

3. Set up SSL certificates:
```bash
# Install certbot if not already installed
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Get certificates for both domains
sudo certbot certonly --nginx -d auroville.social
sudo certbot certonly --nginx -d api.auroville.social
```

4. Set up nginx:
```bash
# Install nginx if not already installed
sudo apt install nginx

# Copy nginx configuration
sudo cp nginx.conf /etc/nginx/sites-available/auroville-connect
sudo ln -s /etc/nginx/sites-available/auroville-connect /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default  # Remove default config

# Test nginx configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
```

5. Set up the systemd service:
```bash
sudo cp auroville-connect.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable auroville-connect
sudo systemctl start auroville-connect
```

6. Check service status:
```bash
sudo systemctl status auroville-connect
```

## Environment Variables

Make sure to create a `.env` file in the server directory with the following variables:
```
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
SMTP_SERVER=your_smtp_server
SMTP_PORT=your_smtp_port
SMTP_USERNAME=your_smtp_username
SMTP_PASSWORD=your_smtp_password
SMTP_AUTH=your_smtp_auth_method (e.g., plain)
SMTP_DOMAIN=your_smtp_domain
```

## Monitoring Logs

To view service logs:
```bash
# View application logs
sudo journalctl -u auroville-connect -f

# View nginx access logs
sudo tail -f /var/log/nginx/access.log

# View nginx error logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/api_error.log
```

## Troubleshooting

If the service fails to start:
1. Check logs using journalctl
2. Verify all environment variables are set correctly
3. Ensure proper file permissions
4. Check SSL certificates are valid:
   ```bash
   sudo certbot certificates
   ```
5. Test nginx configuration:
   ```bash
   sudo nginx -t
   ```
6. Check nginx status:
   ```bash
   sudo systemctl status nginx
   ```

## SSL Certificate Renewal

Certbot automatically renews certificates when they're close to expiry. To test the renewal process:
```bash
sudo certbot renew --dry-run
```

## Updating the Application

To update the application:
1. Pull latest changes:
```bash
git pull origin main
```

2. Restart the services:
```bash
sudo systemctl restart auroville-connect
sudo systemctl restart nginx
```

## Production Deployment

To deploy the application for production, follow these steps:

1. **Build the frontend:**
   Run the command `npm run build` in the project's root directory. This will create a `dist` directory containing the production-ready files.

2. **Configure Nginx:**
   Configure Nginx to serve the static files from the `dist` directory. Your Nginx configuration should point to the correct path where the built files are located.

3. **Start the server:**
   Start the server in production mode using `pm2 start ecosystem.config.js`. This will start the server using the configuration in `ecosystem.config.js`, which should be set to production mode.

   **Important:** Do not use `npm run dev:all` or `vite` to serve the frontend in production. These are development commands and are not suitable for production environments.

By following these steps, you will ensure that your application is running correctly in a production environment.
