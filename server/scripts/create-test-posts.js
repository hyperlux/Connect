import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createTestPosts() {
  try {
    // Get our admin user
    const admin = await prisma.user.findUnique({
      where: { email: 'admin@test.com' }
    });

    if (!admin) {
      console.error('Admin user not found');
      return;
    }

    // Create some test posts
    const posts = await Promise.all([
      prisma.forumPost.create({
        data: {
          title: 'Welcome to the Auroville Community Forum',
          content: 'This is a space for community discussions, sharing ideas, and connecting with fellow Aurovilians.',
          category: 'Announcements',
          authorId: admin.id
        }
      }),
      prisma.forumPost.create({
        data: {
          title: 'Upcoming Community Events',
          content: 'Check out these exciting community events happening this week...',
          category: 'Events & Activities',
          authorId: admin.id
        }
      }),
      prisma.forumPost.create({
        data: {
          title: 'Sustainability Initiative Discussion',
          content: 'Let\'s discuss new sustainability initiatives for our community...',
          category: 'Community Projects',
          authorId: admin.id
        }
      })
    ]);

    console.log('Test posts created:', posts);

    // Add some comments
    const comments = await Promise.all([
      prisma.forumComment.create({
        data: {
          content: 'Great initiative! Looking forward to participating.',
          postId: posts[0].id,
          authorId: admin.id
        }
      }),
      prisma.forumComment.create({
        data: {
          content: 'When is the next community meeting?',
          postId: posts[0].id,
          authorId: admin.id
        }
      })
    ]);

    console.log('Test comments created:', comments);

  } catch (error) {
    console.error('Error creating test posts:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createTestPosts();
