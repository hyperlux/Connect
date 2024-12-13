import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const events = [
  {
    title: "Dehashakti New Year's Tournament",
    description: "Sports tournament for children of Aurovilians, Newcomers and Volunteers. Sports include Futsal, Basketball, Frisbee, Volleyball, Long Jump, Sprint",
    startDate: new Date("2025-01-03T00:00:00Z"),
    endDate: new Date("2025-01-04T23:59:59Z"),
    contact: "avpeb@auroville.org.in",
    isRecurring: false
  },
  {
    title: "Auroville Marathon",
    description: "Annual Auroville Marathon",
    startDate: new Date("2025-02-16T00:00:00Z"),
    endDate: new Date("2025-02-16T23:59:59Z"),
    website: "https://www.aurovillemarathon.com/register/",
    contact: "marathon@auroville.org.in",
    isRecurring: false
  },
  {
    title: "Savitri Satsang",
    description: "Weekly Savitri Satsang at Savitri Bhavan",
    startDate: new Date(),
    location: "Savitri Bhavan",
    isRecurring: true,
    frequency: "weekly",
    dayOfWeek: "Wednesday",
    startTime: "16:30",
    endTime: "17:15"
  },
  {
    title: "OM Choir",
    description: "Weekly OM Choir at Savitri Bhavan",
    startDate: new Date(),
    location: "Savitri Bhavan",
    isRecurring: true,
    frequency: "weekly",
    dayOfWeek: "Wednesday",
    startTime: "17:30",
    endTime: "18:15"
  },
  {
    title: "Meditation at Matrimandir Amphitheatre",
    description: "Weekly meditation session",
    startDate: new Date(),
    location: "Matrimandir Amphitheatre",
    isRecurring: true,
    frequency: "weekly",
    dayOfWeek: "Thursday",
    startTime: "17:30",
    endTime: "18:00"
  },
  {
    title: "Vipassana Meditation",
    description: "Weekly Vipassana meditation session",
    startDate: new Date(),
    location: "Udavi School",
    isRecurring: true,
    frequency: "weekly",
    dayOfWeek: "Sunday",
    startTime: "08:00",
    endTime: "12:00"
  }
];

const services = [
  {
    name: "Auroville's Financial Services (FS)",
    description: "Financial services for the Auroville community",
    category: "Finance",
    hours: "Mon-Sat, 9am-12:30pm, 3pm-4:30pm",
    phone: "0413 2622171",
    email: "financialservice@auroville.org.in"
  },
  {
    name: "Electrical Service (AVES)",
    description: "Electrical services and maintenance",
    category: "Utility",
    hours: "Mon-Sat, 8am-4:30pm",
    phone: "0413 2622132 / 9488868747",
    email: "aves@auroville.org.in"
  },
  {
    name: "Gas Bottle Service",
    description: "Gas bottle supply and service",
    category: "Utility",
    hours: "Mon-Sat, 9am-1pm and 2pm-4pm",
    phone: "0413 2622452",
    email: "avgasservice@auroville.org.in"
  },
  {
    name: "Water Service",
    description: "Water supply and maintenance",
    category: "Utility",
    hours: "Mon-Sat, 8am-12pm and 2pm-4:30pm",
    phone: "0413 2622877, 89035 53246",
    email: "avwaterservice@auroville.org.in"
  },
  {
    name: "Eco Service",
    description: "Waste Collection and Management",
    category: "Utility",
    hours: "Mon-Sat, 8:30am-12:30pm, and 1:30pm-4:30pm",
    phone: "94435 35172",
    email: "ecoservice@auroville.org.in"
  },
  {
    name: "Santé",
    description: "General Medicine, Nursing, Ayurveda, Psychotherapy, Acupuncture, Homeopathy, Physiotherapy, Midwifery",
    category: "Health",
    hours: "Mon-Sat, 9:00am-12:30pm & 2:00-4:30pm",
    phone: "0413-3509942 / 3509943"
  },
  {
    name: "Health Center Kuilapalayam",
    description: "Medical center providing healthcare services",
    category: "Health",
    hours: "Doctor: Mon-Fri 8:30am-5:00pm, Sat 8:30am-1pm; Pharmacy: Mon-Sat 8:00am-5:30pm",
    phone: "0413-3509942 / 3509943"
  },
  {
    name: "Dental Clinic Kuilapalayam",
    description: "Dental healthcare services",
    category: "Health",
    hours: "Mon-Sat, 9am-5pm",
    phone: "0413 2622007 / 2622265",
    email: "aurodentalcentre@auroville.org.in"
  },
  {
    name: "Auroville Library",
    description: "Community library with children's storytime on Saturdays",
    category: "Education",
    hours: "Mon-Sat 9am-12:30pm, Mon/Wed/Thu/Fri/Sat 2pm-4:30pm, Tue 4pm-6:30pm"
  },
  {
    name: "Auroville Institute of Applied Technology",
    description: "Educational institute offering courses in Software Development, Machine Learning, Applied Electronics, Chip Design, Electric",
    category: "Education",
    hours: "Mon-Fri 9am-5pm"
  }
];

async function main() {
  try {
    console.log('🧹 Clearing existing data...');
    
    // Delete all existing records
    await prisma.event.deleteMany();
    await prisma.service.deleteMany();
    
    console.log('✅ Existing data cleared');
    console.log('🌱 Starting seed...');

    // Add events
    console.log('Adding events...');
    for (const event of events) {
      try {
        await prisma.event.create({
          data: event
        });
        console.log(`✅ Added event: ${event.title}`);
      } catch (error) {
        console.error(`❌ Failed to add event ${event.title}:`, error);
        throw error;
      }
    }
    console.log('✅ All events added successfully');

    // Add services
    console.log('Adding services...');
    for (const service of services) {
      try {
        await prisma.service.create({
          data: service
        });
        console.log(`✅ Added service: ${service.name}`);
      } catch (error) {
        console.error(`❌ Failed to add service ${service.name}:`, error);
        throw error;
      }
    }
    console.log('✅ All services added successfully');

    console.log('✨ Seed completed successfully');
  } catch (error) {
    console.error('❌ Error during seed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 