import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';
import { dirname } from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler.js';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { authRouter } from './routes/auth.mjs';
import { forumsRouter } from './routes/forums.js';
import { usersRouter } from './routes/users.js';
import winston from 'winston';
import fs from 'fs';

// Load environment variables from parent directory's .env
console.log('Loading environment variables from .env');
dotenv.config({ path: path.join(dirname(fileURLToPath(import.meta.url)), '../.env') });

// Initialize logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

// Load configuration based on environment
let config;
if (process.env.NODE_ENV === 'production') {
  config = await import('./config/production.mjs');
} else {
  config = await import('./config/development.mjs');
}

const app = express();

// Apply rate limiting
app.use(rateLimit({
  window: config.security.timeWindow,
  max: config.security.maxRequests
}));

// Apply CORS
app.use(cors(config.corsConfig));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Register routes
app.use('/auth', authRouter);
app.use('/forums', forumsRouter);
app.use('/users', usersRouter);

// Apply error handling middleware
app.use(errorHandler);

// Start server
const host = process.env.HOST || '0.0.0.0';
const port = config.port;

console.log(`Starting server with HOST=${host} PORT=${port}`);

app.listen(port, host, () => {
  console.log(`✅ Server started successfully on ${host}:${port}`);
  logger.info(`Server started on ${host}:${port}`);
});

// Handle uncaught exceptions and rejections
process.on('uncaughtException', (err) => {
  logger.error('Uncaught exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled rejection:', reason);
  process.exit(1);
});
