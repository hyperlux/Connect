import express from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { prisma } from '../lib/prisma.js';

const router = express.Router();

// Update user profile
router.put('/profile', authenticate, async (req, res, next) => {
  try {
    console.log('Received profile update request:', {
      body: req.body,
      userId: req.user?.id
    });

    const { name, email, bio, avatar } = req.body;
    const userId = req.user.id;

    console.log('Updating user with data:', {
      userId,
      name,
      email,
      bio,
      avatar
    });

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        bio,
        avatar
      },
      select: {
        id: true,
        name: true,
        email: true,
        bio: true,
        avatar: true,
        createdAt: true
      }
    });

    console.log('User updated successfully:', updatedUser);
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    next(error);
  }
});

export const usersRouter = router;