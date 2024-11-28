import express from 'express';
import { prisma } from '../lib/prisma.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const services = await prisma.cityService.findMany({
      include: {
        provider: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    res.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Failed to fetch services' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, description, category, contactInfo } = req.body;
    const service = await prisma.cityService.create({
      data: {
        name,
        description,
        category,
        contactInfo,
        providerId: req.user.id
      },
      include: {
        provider: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });
    res.status(201).json(service);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ message: 'Failed to create service' });
  }
});

export const servicesRouter = router;