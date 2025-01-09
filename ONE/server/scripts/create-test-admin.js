import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createTestAdmin() {
  try {
    const hashedPassword = await bcrypt.hash('Admin123!', 10);
    
    const admin = await prisma.user.create({
      data: {
        email: 'admin@test.com',
        password: hashedPassword,
        name: 'Test Admin',
        role: 'ADMIN',
        emailVerified: true
      }
    });

    console.log('Test admin created:', admin);
  } catch (error) {
    console.error('Error creating test admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestAdmin();
