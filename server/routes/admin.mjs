import express from 'express';
import { admin } from '../middleware/admin.js';
import { prisma } from '../lib/prisma.js';

const router = express.Router();

// Admin verification endpoint
router.post('/verify-user', admin, async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await prisma.user.update({
      where: { email },
      data: { 
        emailVerified: true,
        verificationToken: null 
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User verified successfully' });
  } catch (error) {
    console.error('Admin verification error:', error);
    return res.status(500).json({ 
      message: 'Failed to verify user',
      error: error.message 
    });
  }
});

export const adminRouter = router;
