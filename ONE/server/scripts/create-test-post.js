import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createTestPost() {
  try {
    // Get the admin user
    const admin = await prisma.user.findFirst({
      where: {
        email: 'admin@auroville.com'
      }
    });

    if (!admin) {
      console.error('Admin user not found');
      return;
    }

    // Create a test post
    const post = await prisma.forumPost.create({
      data: {
        title: 'Test Forum Post',
        content: 'This is a test forum post to verify the forum functionality.',
        category: 'General Discussion',
        authorId: admin.id
      }
    });

    console.log('Test post created successfully:', post);
  } catch (error) {
    console.error('Error creating test post:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestPost();
