const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin(email, name, password) {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      // Update existing user to admin
      const updatedUser = await prisma.user.update({
        where: { email },
        data: {
          password: hashedPassword,
          role: 'ADMIN',
          name
        }
      });
      console.log(`Successfully updated admin account for ${email}!`);
      return updatedUser;
    }

    // Create new admin user
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: 'ADMIN'
      }
    });

    console.log(`Successfully created admin account for ${email}!`);
    return user;
  } catch (error) {
    console.error('Error creating/updating admin:', error);
    throw error;
  }
}

// Get arguments from command line
const email = process.argv[2];
const name = process.argv[3];
const password = process.argv[4];

if (!email || !name || !password) {
  console.error('Please provide email, name, and password');
  console.error('Usage: node create-admin.js <email> <name> <password>');
  process.exit(1);
}

createAdmin(email, name, password)
  .then(() => {
    console.log('Admin operation completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('Failed to create/update admin:', error);
    process.exit(1);
  }); 