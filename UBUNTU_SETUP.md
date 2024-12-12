# Ubuntu Server Setup Guide

## Prerequisites
- Ubuntu Server 20.04 or later
- Node.js 18+ and npm installed
- Git installed

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

3. Set up the systemd service:
```bash
sudo cp auroville-connect.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable auroville-connect
sudo systemctl start auroville-connect
```

4. Check service status:
```bash
sudo systemctl status auroville-connect
```

## Environment Variables

Make sure to create a `.env` file in the server directory with the following variables:
```
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_pass
```

## Monitoring Logs

To view service logs:
```bash
sudo journalctl -u auroville-connect -f
```

## Troubleshooting

If the service fails to start:
1. Check logs using journalctl
2. Verify all environment variables are set correctly
3. Ensure proper file permissions
4. Check network connectivity to auroville.social

## Updating the Application

To update the application:
1. Pull latest changes:
```bash
git pull origin main
```

2. Restart the service:
```bash
sudo systemctl restart auroville-connect
