import { PrismaClient } from '@prisma/client';

console.log('🔌 Initializing Prisma client with DATABASE_URL:', {
  url: process.env.DATABASE_URL?.replace(/:\/\/([^@]+)@/, '://****@') // Hide password in logs
});

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    },
  },
});

// Test database connection
const connectWithRetry = async (retries = 5) => {
  try {
    await prisma.$connect();
    console.log('✅ Successfully connected to database');
  } catch (error) {
    console.error('❌ Failed to connect to database:', error);
    if (retries > 0) {
      console.log(`Retrying database connection in 5 seconds... (${retries} retries remaining)`);
      await new Promise(resolve => setTimeout(resolve, 5000));
      await connectWithRetry(retries - 1);
    } else {
      process.exit(1);
    }
  }
};

connectWithRetry();

export { prisma };