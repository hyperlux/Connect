import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import winston from 'winston';
import fs from 'fs';

// Load environment variables from parent directory's .env
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const app = express();

// Health check endpoint - placing it before any middleware
app.get('/health', (req, res) => {
  try {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV,
      uptime: process.uptime()
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Ensure logs directory exists
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Winston logger configuration
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ 
      filename: path.join(logsDir, 'error.log'), 
      level: 'error' 
    }),
    new winston.transports.File({ 
      filename: path.join(logsDir, 'combined.log')
    }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ],
});

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
    logger.info(`
    🚀 Server is running in ${process.env.NODE_ENV} mode
    🔊 Listening on ${process.env.HOST || '0.0.0.0'}:${PORT}
    📱 API URL: ${process.env.API_URL}
    🌐 Frontend URL: ${process.env.FRONTEND_URL}
    `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  server.close(() => {
    logger.info('Server closed gracefully');
  });
});

process.on('SIGINT', () => {
  server.close(() => {
    logger.info('Server closed gracefully');
  });
});

process.on('uncaughtException', (err) => {
  logger.error('Uncaught exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled rejection:', reason);
  process.exit(1);
});
