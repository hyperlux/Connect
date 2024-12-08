import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkUser() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'polletkiro@gmail.com' }
    });
    
    console.log('User found:', {
      id: user?.id,
      email: user?.email,
      name: user?.name,
      role: user?.role,
      emailVerified: user?.emailVerified,
      hasPassword: !!user?.password
    });
  } catch (error) {
    console.error('Error finding user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUser(); 