import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verifyUser(email) {
  if (!email) {
    console.error('Please provide an email address');
    process.exit(1);
  }

  try {
    const user = await prisma.user.update({
      where: { email },
      data: { 
        emailVerified: true,
        verificationToken: null
      }
    });
    console.log('User verified:', user);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Get email from command line argument
const email = process.argv[2];
verifyUser(email);
