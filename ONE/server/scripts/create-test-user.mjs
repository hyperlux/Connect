import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Delete existing test user if it exists
  await prisma.user.deleteMany({
    where: {
      OR: [
        { id: 'some-user-id' },
        { email: 'test@example.com' }
      ]
    }
  });

  const hashedPassword = await bcrypt.hash('testpassword', 10);
  const user = await prisma.user.create({
    data: {
      id: 'some-user-id',
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
      role: 'USER',
      emailVerified: true
    }
  });

  console.log('Created test user:', user);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });