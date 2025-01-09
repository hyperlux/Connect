import express from 'express';
import { PrismaClient } from '@prisma/client';
const router = express.Router();
const prisma = new PrismaClient();

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      orderBy: { name: 'asc' }
    });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
});

// Create new service
router.post('/', async (req, res) => {
  try {
    const service = await prisma.service.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        hours: req.body.hours,
        phone: req.body.phone,
        email: req.body.email,
        location: req.body.location,
        website: req.body.website
      }
    });
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create service' });
  }
});

// Get single service
router.get('/:id', async (req, res) => {
  try {
    const service = await prisma.service.findUnique({
      where: { id: req.params.id }
    });
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch service' });
  }
});

// Update service
router.put('/:id', async (req, res) => {
  try {
    const service = await prisma.service.update({
      where: { id: req.params.id },
      data: {
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        hours: req.body.hours,
        phone: req.body.phone,
        email: req.body.email,
        location: req.body.location,
        website: req.body.website
      }
    });
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update service' });
  }
});

// Delete service
router.delete('/:id', async (req, res) => {
  try {
    await prisma.service.delete({
      where: { id: req.params.id }
    });
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete service' });
  }
});

// Get services by category
router.get('/category/:category', async (req, res) => {
  try {
    const services = await prisma.service.findMany({
      where: {
        category: req.params.category
      },
      orderBy: { name: 'asc' }
    });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services by category' });
  }
});

export { router as servicesRouter };