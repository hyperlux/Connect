import { PrismaClient } from '@prisma/client';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

console.log('🔌 Initializing Prisma client with DATABASE_URL:', {
  url: process.env.DATABASE_URL?.replace(/:\/\/([^@]+)@/, '://****@'), // Hide password in logs
  env: {
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_DB: process.env.POSTGRES_DB
  }
});

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

// Detailed connection retry with comprehensive error logging
const connectWithRetry = async (retries = 5) => {
  const maxRetries = retries;
  
  while (retries > 0) {
    try {
      console.log(`Attempting to connect to database. Retries left: ${retries}`);
      
      // Detailed connection attempt logging
      console.log('Connection Details:', {
        url: process.env.DATABASE_URL?.replace(/:\/\/([^@]+)@/, '://****@'),
        env: {
          POSTGRES_USER: process.env.POSTGRES_USER,
          POSTGRES_DB: process.env.POSTGRES_DB
        }
      });

      await prisma.$connect();
      console.log('✅ Successfully connected to database');
      return;
    } catch (error) {
      console.error('❌ Detailed Database Connection Error:', {
        message: error.message,
        code: error.code,
        errorCode: error.errorCode,
        stack: error.stack
      });

      retries--;

      if (retries > 0) {
        console.log(`Retrying database connection in 5 seconds... (${retries} retries remaining)`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      } else {
        logger.error('Failed to connect to database after multiple attempts', error);
        throw error;
      }
    }
  }
};

// Attempt connection on module import
connectWithRetry().catch(error => {
  console.error('Fatal database connection error:', error);
  process.exit(1);
});

export { prisma };