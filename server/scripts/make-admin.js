import { prisma } from '../lib/prisma.js';
import { createNotification } from '../routes/notifications.js';

async function makeAdmin(email) {
  try {
    // Update user role to ADMIN
    const user = await prisma.user.update({
      where: { email },
      data: { role: 'ADMIN' }
    });

    // Create notification for the user
    await createNotification(
      user.id,
      'role',
      'Admin Access Granted',
      'You have been granted administrator privileges.',
      '/settings'
    );

    console.log(`Successfully made ${email} an admin!`);
    process.exit(0);
  } catch (error) {
    console.error('Error making admin:', error);
    process.exit(1);
  }
}

// Get email from command line argument
const email = process.argv[2];
if (!email) {
  console.error('Please provide an email address');
  process.exit(1);
}

makeAdmin(email); 