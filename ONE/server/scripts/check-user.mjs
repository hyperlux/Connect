import { PrismaClient } from '@prisma/client';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient();

async function checkUser() {
  try {
    console.log('🔍 Looking up user in database...');
    const user = await prisma.user.findUnique({
      where: { email: 'polletkiro@gmail.com' }
    });
    
    if (!user) {
      console.log('❌ User not found in database');
      return;
    }
    
    console.log('✅ User found:', {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      emailVerified: user.emailVerified,
      hasPassword: !!user.password,
      passwordLength: user.password?.length
    });
  } catch (error) {
    console.error('❌ Error finding user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUser(); 