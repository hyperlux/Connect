import express from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

const eventSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  date: z.string().datetime(),
  location: z.string(),
  imageUrl: z.string().url().optional(),
});

router.get('/', async (req, res, next) => {
  try {
    const { month, year } = req.query;
    let where = {};
    
    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      where.date = {
        gte: startDate,
        lte: endDate
      };
    }

    const events = await prisma.event.findMany({
      where,
      include: {
        organizer: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        attendees: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true
              }
            }
          }
        }
      },
      orderBy: {
        date: 'asc'
      }
    });
    res.json(events);
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticate, async (req, res, next) => {
  try {
    const eventData = eventSchema.parse(req.body);
    const event = await prisma.event.create({
      data: {
        ...eventData,
        organizerId: req.user.id
      }
    });
    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
});

router.post('/:id/attend', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.eventAttendee.create({
      data: {
        eventId: id,
        userId: req.user.id
      }
    });
    res.json({ message: 'Successfully registered for event' });
  } catch (error) {
    next(error);
  }
});

export const eventsRouter = router;