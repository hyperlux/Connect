import express from 'express';
import { PrismaClient } from '@prisma/client';
const router = express.Router();
const prisma = new PrismaClient();

// Get all events
router.get('/', async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + 7);

    const events = await prisma.event.findMany({
      where: {
        startDate: {
          gte: today,
          lt: endOfWeek
        }
      },
      orderBy: { startDate: 'asc' }
    });

    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Create new event
router.post('/', async (req, res) => {
  try {
    const event = await prisma.event.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        startDate: new Date(req.body.startDate),
        endDate: req.body.endDate ? new Date(req.body.endDate) : null,
        location: req.body.location,
        contact: req.body.contact,
        website: req.body.website,
        isRecurring: req.body.isRecurring || false,
        frequency: req.body.frequency,
        dayOfWeek: req.body.dayOfWeek,
        startTime: req.body.startTime,
        endTime: req.body.endTime
      }
    });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Get single event
router.get('/:id', async (req, res) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: req.params.id }
    });
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

// Update event
router.put('/:id', async (req, res) => {
  try {
    const event = await prisma.event.update({
      where: { id: req.params.id },
      data: {
        title: req.body.title,
        description: req.body.description,
        startDate: new Date(req.body.startDate),
        endDate: req.body.endDate ? new Date(req.body.endDate) : null,
        location: req.body.location,
        contact: req.body.contact,
        website: req.body.website,
        isRecurring: req.body.isRecurring,
        frequency: req.body.frequency,
        dayOfWeek: req.body.dayOfWeek,
        startTime: req.body.startTime,
        endTime: req.body.endTime
      }
    });
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// Delete event
router.delete('/:id', async (req, res) => {
  try {
    await prisma.event.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

export { router as eventsRouter };
