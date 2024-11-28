import { prisma } from '../lib/prisma.js';
import { createNotification } from '../routes/notifications.js';

async function updateUser(email, name) {
  try {
    // Update user name
    const user = await prisma.user.update({
      where: { email },
      data: { name }
    });

    // Create notification for the user
    await createNotification(
      user.id,
      'profile',
      'Profile Updated',
      'Your profile name has been updated successfully.',
      '/profile'
    );

    console.log(`Successfully updated name to "${name}" for ${email}!`);
    process.exit(0);
  } catch (error) {
    console.error('Error updating user:', error);
    process.exit(1);
  }
}

// Get arguments from command line
const email = process.argv[2];
const name = process.argv[3];

if (!email || !name) {
  console.error('Please provide email and new name');
  console.error('Usage: node update-user.js <email> <name>');
  process.exit(1);
}

updateUser(email, name); 