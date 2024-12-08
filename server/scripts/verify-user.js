import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function verifyUser() {
  try {
    const user = await prisma.user.update({
      where: {
        email: 'polletkiro@gmail.com'
      },
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

verifyUser(); 