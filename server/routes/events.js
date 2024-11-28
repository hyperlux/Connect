import express from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
import { authenticate, requireAdmin } from '../middleware/authenticate.js';
import { createNotification } from './notifications.js';

const router = express.Router();

const eventSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  date: z.string().datetime(),
  location: z.string(),
  imageUrl: z.string().url().optional(),
});

// Get all events
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

// Create event
router.post('/', authenticate, async (req, res, next) => {
  try {
    const eventData = eventSchema.parse(req.body);
    const event = await prisma.event.create({
      data: {
        ...eventData,
        organizerId: req.user.id
      },
      include: {
        organizer: {
          select: {
            name: true
          }
        }
      }
    });

    // Get all users except the organizer
    const users = await prisma.user.findMany({
      where: {
        NOT: {
          id: req.user.id
        }
      }
    });

    // Create notifications for all users
    await Promise.all(users.map(user => 
      createNotification(
        user.id,
        'event',
        'New Event',
        `${event.organizer.name} created a new event: ${event.title}`,
        `/events/${event.id}`
      )
    ));

    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
});

// Update event (admin or organizer only)
router.put('/:id', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const eventData = eventSchema.parse(req.body);
    
    const event = await prisma.event.findUnique({
      where: { id },
      include: { organizer: true }
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user is admin or event organizer
    if (req.user.role !== 'ADMIN' && event.organizerId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this event' });
    }

    const updatedEvent = await prisma.event.update({
      where: { id },
      data: eventData,
      include: {
        organizer: {
          select: {
            name: true
          }
        }
      }
    });

    res.json(updatedEvent);
  } catch (error) {
    next(error);
  }
});

// Delete event (admin or organizer only)
router.delete('/:id', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const event = await prisma.event.findUnique({
      where: { id },
      include: { organizer: true }
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if user is admin or event organizer
    if (req.user.role !== 'ADMIN' && event.organizerId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to delete this event' });
    }

    // Delete all attendees first
    await prisma.eventAttendee.deleteMany({
      where: { eventId: id }
    });

    // Delete the event
    await prisma.event.delete({
      where: { id }
    });

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// Admin: Delete any event
router.delete('/:id/admin', authenticate, requireAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const event = await prisma.event.findUnique({
      where: { id }
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Delete all attendees first
    await prisma.eventAttendee.deleteMany({
      where: { eventId: id }
    });

    // Delete the event
    await prisma.event.delete({
      where: { id }
    });

    res.json({ message: 'Event deleted successfully by admin' });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/attend', authenticate, async (req, res, next) => {
  try {
    const { id } = req.params;
    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        organizer: true
      }
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    await prisma.eventAttendee.create({
      data: {
        eventId: id,
        userId: req.user.id
      }
    });

    // Notify the event organizer
    await createNotification(
      event.organizerId,
      'attendance',
      'New Attendee',
      `${req.user.name} is attending your event: ${event.title}`,
      `/events/${event.id}`
    );

    res.json({ message: 'Successfully registered for event' });
  } catch (error) {
    next(error);
  }
});

export const eventsRouter = router;