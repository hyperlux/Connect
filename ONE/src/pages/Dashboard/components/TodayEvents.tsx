import React from 'react';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="p-4 border-b border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-auroville-primary" />
            <h2 className="font-semibold text-gray-900 dark:text-white">Today's Events</h2>
          </div>
          <Link 
            to="/app/events"
            className="flex items-center gap-1 text-sm text-auroville-primary hover:text-auroville-primary/80 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {events.map((event) => (
          <div 
            key={event.id} 
            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-gray-900 dark:text-white">
                {event.title}
              </h3>
              {event.isNew && (
                <span className="px-2 py-0.5 text-xs rounded-full bg-auroville-primary/10 text-auroville-primary font-medium">
                  New
                </span>
              )}
            </div>
            
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
