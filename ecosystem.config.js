module.exports = {
  apps: [
    {
      name: 'auroville-connect-server',
      cwd: './server',
      script: 'index.js',
      env: {
        NODE_ENV: process.env.NODE_ENV || 'development',
        PORT: process.env.PORT || 5000,
        HOST: '0.0.0.0',
        DATABASE_URL: process.env.DATABASE_URL || "postgresql://postgres:newpassword123@localhost:5432/auroville",
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
      watch: process.env.NODE_ENV !== 'production',
      ignore_watch: ['node_modules', 'logs']
    },
    {
      name: 'auroville-connect-frontend',
      cwd: './',
      script: 'vite',
      env: {
        NODE_ENV: process.env.NODE_ENV || 'development',
        PORT: process.env.PORT || 3000,
        HOST: '0.0.0.0'
      },
      error_file: 'logs/error-frontend.log',
      out_file: 'logs/out-frontend.log',
      watch: process.env.NODE_ENV !== 'production',
      ignore_watch: ['node_modules', 'logs']
    }
  ]
};
