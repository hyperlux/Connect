import { PrismaClient } from '@prisma/client';

console.log('🔌 Initializing Prisma client with DATABASE_URL:', {
  url: process.env.DATABASE_URL?.replace(/:[^:@]*@/, ':****@') // Hide password in logs
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
prisma.$connect()
  .then(() => {
    console.log('✅ Successfully connected to database');
  })
  .catch((error) => {
    console.error('❌ Failed to connect to database:', error);
  });

export { prisma };