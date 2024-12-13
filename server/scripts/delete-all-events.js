import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function deleteAllEvents() {
  try {
    const deletedCount = await prisma.event.deleteMany({});
    console.log(`Successfully deleted ${deletedCount.count} events`);
  } catch (error) {
    console.error('Error deleting events:', error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteAllEvents();
