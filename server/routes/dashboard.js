import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    // Get count of active members (users who have logged in within last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const activeMembers = await prisma.user.count({
      where: {
        lastLoginAt: {
          gte: thirtyDaysAgo
        }
      }
    });

    // Get count of upcoming events (next 7 days)
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    
    const upcomingEvents = await prisma.event.count({
      where: {
        date: {
          gte: today,
          lte: nextWeek
        }
      }
    });

    // Get count of forum posts in last 30 days
    const forumPosts = await prisma.post.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo
        }
      }
    });

    // Get count of active city services
    const cityServices = await prisma.service.count({
    });

    res.json({
      activeMembers,
      upcomingEvents,
      forumPosts,
      cityServices
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard statistics' });
  }
});

export const dashboardRouter = router;
