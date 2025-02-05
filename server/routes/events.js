import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get all events with optional date range filtering
router.get('/', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const whereCondition = {};

    // If both start and end dates are provided, use them for filtering
    if (startDate && endDate) {
      whereCondition.date = {
         gte: new Date(startDate),
         lte: new Date(endDate)
      };
    } else {
      // Default to current week if no dates provided
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const endOfWeek = new Date(today);
      endOfWeek.setDate(today.getDate() + 7);

      whereCondition.date = {
         gte: today,
         lt: endOfWeek
      };
    }

    const events = await prisma.event.findMany({
      where: whereCondition,
      orderBy: { date: 'asc' }
    });

    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

export const eventsRouter = router;
