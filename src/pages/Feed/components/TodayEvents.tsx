import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'Morning Meditation',
    time: '06:00 AM',
    location: 'Matrimandir',
    type: 'Spiritual',
    isNew: true
  },
  {
    id: 2,
    title: 'Permaculture Workshop',
    time: '09:30 AM',
    location: 'Buddha Garden',
    type: 'Education',
    isNew: true
  },
  {
    id: 3,
    title: 'Community Lunch',
    time: '12:30 PM',
    location: 'Solar Kitchen',
    type: 'Community'
  }
];

export default function TodayEvents() {
  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm">
      <div className="p-4 border-b dark:border-dark">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-auroville-primary" />
            <h2 className="font-semibold text-gray-900 dark:text-dark-primary">Today's Events</h2>
          </div>
          <button className="text-sm text-auroville-primary hover:underline">
            View All
          </button>
        </div>
      </div>

      <div className="divide-y dark:divide-dark">
        {events.map((event) => (
          <div key={event.id} className="p-4 hover:bg-gray-50 dark:hover:bg-dark-lighter">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900 dark:text-dark-primary">{event.title}</h3>
              {event.isNew && (
                <span className="px-2 py-1 text-xs rounded-full bg-auroville-light text-auroville-primary">
                  New
                </span>
              )}
            </div>
            
            <div className="space-y-1 text-sm text-gray-600 dark:text-dark-secondary">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}