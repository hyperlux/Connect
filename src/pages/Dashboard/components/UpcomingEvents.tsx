import React from 'react';
import { Calendar } from 'lucide-react';

const events = [
  {
    title: 'Meditation Workshop',
    date: 'Tomorrow, 6:00 AM',
    location: 'Matrimandir',
    image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    title: 'Permaculture Course',
    date: 'Wed, 9:00 AM',
    location: 'Buddha Garden',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    title: 'Community Lunch',
    date: 'Thu, 12:30 PM',
    location: 'Solar Kitchen',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  }
];

export default function UpcomingEvents() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-5 w-5 text-auroville-primary" />
        <h2 className="text-lg font-semibold text-gray-800">Upcoming Events</h2>
      </div>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.title} className="flex items-center gap-4">
            <img
              src={event.image}
              alt={event.title}
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-medium text-gray-800">{event.title}</h3>
              <p className="text-sm text-gray-500">{event.date}</p>
              <p className="text-sm text-gray-500">{event.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}