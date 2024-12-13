import express from 'express';
import { prisma } from '../lib/prisma.js';
import { sendNotificationEmail } from '../lib/email.js';

const router = express.Router();

// Get user's notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: {
        userId: req.user.id,
        read: false
      },
      orderBy: {
        createdAt: 'desc'
      },
      take: 10
    });
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
});

// Mark notification as read
router.put('/:id/read', async (req, res) => {
  try {
    const notification = await prisma.notification.update({
      where: {
        id: req.params.id,
        userId: req.user.id
      },
      data: {
        read: true
      }
    });
    res.json(notification);
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ message: 'Failed to update notification' });
  }
});

// Test email route
router.post('/test-email', async (req, res) => {
  try {
    const testEmail = req.body.email || 'test@example.com';
    await sendNotificationEmail(testEmail, {
      title: 'Test Notification',
      message: 'This is a test notification email from Auroville Community platform.'
    });
    res.json({ success: true, message: 'Test email sent successfully' });
  } catch (error) {
    console.error('Error sending test email:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export const notificationsRouter = router;
