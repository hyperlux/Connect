import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const events = [
  {
    title: "Dehashakti New Year's Tournament",
    description: "Sports tournament featuring Futsal, Basketball, Frisbee, Volleyball, Long Jump, and Sprint. Open to children of Aurovilians, Newcomers and Volunteers.",
    date: new Date('2025-01-03'),
    location: "Dehashakti Sports Ground",
    category: "Sports",
    time: "09:00",
    endTime: "17:00",
    maxSpots: 100
  },
  {
    title: "Auroville Marathon",
    description: "Annual Auroville Marathon event. Registration open from Dec 9, 2024 to Jan 25, 2025. Register at: https://www.aurovillemarathon.com/register/",
    date: new Date('2025-02-16'),
    location: "Auroville",
    category: "Sports",
    time: "06:00",
    endTime: "12:00",
    maxSpots: 1000
  },
  {
    title: "Savitri Satsang",
    description: "Weekly Savitri Satsang session",
    date: new Date(), // Current date as it's recurring
    location: "Savitri Bhavan",
    category: "Spiritual",
    time: "16:30",
    endTime: "17:15",
    maxSpots: 50
  },
  {
    title: "OM Choir",
    description: "Weekly OM Choir session",
    date: new Date(),
    location: "Savitri Bhavan",
    category: "Music",
    time: "17:30",
    endTime: "18:15",
    maxSpots: 30
  },
  {
    title: "Meditation at Matrimandir Amphitheatre",
    description: "Weekly meditation session at the Matrimandir Amphitheatre",
    date: new Date(),
    location: "Matrimandir Amphitheatre",
    category: "Spiritual",
    time: "17:30",
    endTime: "18:00",
    maxSpots: 200
  },
  {
    title: "Vipassana Meditation",
    description: "Weekly Vipassana meditation session",
    date: new Date(),
    location: "Udavi School",
    category: "Spiritual",
    time: "08:00",
    endTime: "12:00",
    maxSpots: 50
  }
];

const services = [
  {
    name: "Auroville's Financial Services (FS)",
    description: "Financial services for the Auroville community",
    category: "Financial",
    contactInfo: "Hours: Mon-Sat: 09:00-12:30, 15:00-16:30\nPhone: 0413 2622171\nEmail: financialservice@auroville.org.in"
  },
  {
    name: "Electrical Service (AVES)",
    description: "Electrical services and maintenance",
    category: "Utility",
    contactInfo: "Hours: Mon-Sat: 08:00-16:30\nPhone: 0413 2622132, 9488868747\nEmail: aves@auroville.org.in"
  },
  {
    name: "Gas Bottle Service",
    description: "Gas bottle supply and service",
    category: "Utility",
    contactInfo: "Hours: Mon-Sat: 09:00-13:00, 14:00-16:00\nPhone: 0413 2622452\nEmail: avgasservice@auroville.org.in"
  },
  {
    name: "Water Service",
    description: "Water supply and maintenance services",
    category: "Utility",
    contactInfo: "Hours: Mon-Sat: 08:00-12:00, 14:00-16:30\nPhone: 0413 2622877, 89035 53246\nEmail: avwaterservice@auroville.org.in"
  },
  {
    name: "Eco Service (Waste Collection/Management)",
    description: "Waste collection and management services",
    category: "Utility",
    contactInfo: "Hours: Mon-Sat: 08:30-12:30, 13:30-16:30\nPhone: 94435 35172\nEmail: ecoservice@auroville.org.in"
  },
  {
    name: "Santé",
    description: "Healthcare center offering various medical services including General Medicine, Nursing, Ayurveda, Psychotherapy, Acupuncture, Homeopathy, Physiotherapy, and Midwifery",
    category: "Health",
    contactInfo: "Hours: Mon-Sat: 09:00-12:30, 14:00-16:30\nPhone: 0413-3509942, 0413-3509943"
  },
  {
    name: "Health Center Kuilapalayam",
    description: "Healthcare center with doctor consultation and pharmacy services",
    category: "Health",
    contactInfo: "Doctor Hours: Mon-Fri: 08:30-17:00, Sat: 08:30-13:00\nPharmacy Hours: Mon-Sat: 08:00-17:30\nPhone: 0413-3509942, 0413-3509943"
  }
];

async function createAurovilleData() {
  try {
    // Create or find admin user
    console.log('Creating/finding admin user...');
    const adminUser = await prisma.user.upsert({
      where: { email: 'admin@auroville.org.in' },
      update: {},
      create: {
        email: 'admin@auroville.org.in',
        password: 'hashed_password_here', // In production, this should be properly hashed
        name: 'Admin',
        role: 'ADMIN',
        emailVerified: true
      }
    });
    console.log('Admin user ready:', adminUser.id);

    // Create events
    console.log('\nCreating events...');
    for (const eventData of events) {
      const existingEvent = await prisma.event.findFirst({
        where: { title: eventData.title }
      });

      if (!existingEvent) {
        const event = await prisma.event.create({
          data: {
            ...eventData,
            organizerId: adminUser.id
          }
        });
        console.log('Created event:', event.title);
      } else {
        console.log('Event already exists:', eventData.title);
      }
    }

    // Create services
    console.log('\nCreating services...');
    for (const serviceData of services) {
      const existingService = await prisma.cityService.findFirst({
        where: { name: serviceData.name }
      });

      if (!existingService) {
        const service = await prisma.cityService.create({
          data: {
            ...serviceData,
            providerId: adminUser.id
          }
        });
        console.log('Created service:', service.name);
      } else {
        console.log('Service already exists:', serviceData.name);
      }
    }

    console.log('\nAll data creation completed!');
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      meta: error.meta,
      stack: error.stack
    });
  } finally {
    await prisma.$disconnect();
  }
}

createAurovilleData();
