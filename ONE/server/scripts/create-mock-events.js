import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const mockEvents = [
  {
    title: "Morning Meditation at Matrimandir",
    description: "Join us for a peaceful morning meditation session at the Matrimandir. Open to all Auroville residents and guests with passes.",
    location: "Matrimandir",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    time: "06:00",
    endTime: "07:30",
    category: "Spiritual",
    imageUrl: "https://images.unsplash.com/photo-1528319725582-ddc096101511?w=800&auto=format&fit=crop",
    maxSpots: 50
  },
  {
    title: "Permaculture Workshop",
    description: "Learn sustainable gardening practices and permaculture principles at Buddha Garden. Hands-on workshop covering soil preparation, composting, and natural pest control.",
    location: "Buddha Garden",
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    time: "09:00",
    endTime: "12:00",
    category: "Education",
    imageUrl: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&auto=format&fit=crop",
    maxSpots: 30
  },
  {
    title: "Community Meeting at Unity Pavilion",
    description: "Monthly community gathering to discuss ongoing projects and initiatives in Auroville. All residents are welcome to participate.",
    location: "Unity Pavilion",
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    time: "14:00",
    endTime: "16:00",
    category: "Community",
    imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&auto=format&fit=crop",
    maxSpots: 100
  },
  {
    title: "Art Exhibition: Local Artists",
    description: "Featuring works from Auroville's talented artists. Mixed media exhibition including paintings, sculptures, and installations.",
    location: "Citadines Art Centre",
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
    time: "10:00",
    endTime: "18:00",
    category: "Arts",
    imageUrl: "https://images.unsplash.com/photo-1531913764164-f85c52201b45?w=800&auto=format&fit=crop",
    maxSpots: 200
  },
  {
    title: "Film Screening: Documentary Night",
    description: "Special screening of documentaries about sustainable living and community building. Discussion session follows the screening.",
    location: "Cinema Paradiso",
    date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
    time: "19:00",
    endTime: "21:30",
    category: "Culture",
    imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&auto=format&fit=crop",
    maxSpots: 80
  },
  {
    title: "Sports Day at Dehashakti",
    description: "Community sports day featuring various activities including basketball, volleyball, and athletics. All age groups welcome!",
    location: "Dehashakti Sports Ground",
    date: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // 6 days from now
    time: "15:00",
    endTime: "18:00",
    category: "Sports",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&auto=format&fit=crop",
    maxSpots: 150
  },
  {
    title: "Choir Practice Session",
    description: "Weekly practice session of the Auroville Choir. New members welcome! No prior experience necessary.",
    location: "Sri Aurobindo Auditorium",
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // tomorrow
    time: "17:00",
    endTime: "19:00",
    category: "Music",
    imageUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&auto=format&fit=crop",
    maxSpots: 40
  }
];

async function createMockEvents() {
  try {
    // First delete all existing events and event attendees
    console.log('Deleting existing events and attendees...');
    await prisma.eventAttendee.deleteMany({});
    await prisma.event.deleteMany({});
    console.log('All existing events and attendees deleted.');

    // Create a test admin if doesn't exist
    const hashedPassword = await bcrypt.hash('Admin123!', 10);
    
    let admin = await prisma.user.findUnique({
      where: { email: 'admin@test.com' }
    });

    if (!admin) {
      admin = await prisma.user.create({
        data: {
          email: 'admin@test.com',
          password: hashedPassword,
          name: 'Test Admin',
          role: 'ADMIN',
          emailVerified: true
        }
      });
      console.log('Test admin created:', admin);
    }

    // Create events
    for (const eventData of mockEvents) {
      const event = await prisma.event.create({
        data: {
          ...eventData,
          organizerId: admin.id
        }
      });
      console.log('Created event:', event.title);
    }

    console.log('All mock events created successfully!');
  } catch (error) {
    console.error('Error creating mock events:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createMockEvents();
