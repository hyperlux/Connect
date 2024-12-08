const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = 'polletkiro@gmail.com';
  const password = 'Admin123!';
  const name = 'Admin User';

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Delete existing user if exists
    await prisma.user.deleteMany({
      where: { email }
    });

    // Create new admin user with email verified
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'ADMIN',
        emailVerified: true,  // Set email as verified
        verificationToken: null  // Clear any verification token
      }
    });

    console.log('Created admin user:', user);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 