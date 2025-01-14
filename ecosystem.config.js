module.exports = {
  apps: [{
    name: 'auroville-connect-server',
    script: 'index.js',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
      PORT: process.env.PORT || 5000,
      HOST: '0.0.0.0',
      DATABASE_URL: process.env.DATABASE_URL || "postgresql://auroville_user:ok@db:5432/auroville_connect",
      JWT_SECRET: process.env.JWT_SECRET || "ea21a8d798aa16aacce7fbcff1cde5dfbe50a294d5c7d14aee0ee4f6a6d2a5a7a",
      SMTP_SERVER: process.env.SMTP_SERVER,
      SMTP_PORT: process.env.SMTP_PORT,
      SMTP_USERNAME: process.env.SMTP_USERNAME,
      SMTP_PASSWORD: process.env.SMTP_PASSWORD,
      SMTP_AUTH: process.env.SMTP_AUTH,
      SMTP_DOMAIN: process.env.SMTP_DOMAIN
    },
    error_file: 'logs/error.log',
    out_file: 'logs/out.log',
    max_memory_restart: '512M',
    exp_backoff_restart_delay: 100,
    watch: false,
    max_restarts: 10,
    min_uptime: '30s',
    listen_timeout: 15000,
    kill_timeout: 5000,
    merge_logs: true,
    autorestart: true
  }]
};
