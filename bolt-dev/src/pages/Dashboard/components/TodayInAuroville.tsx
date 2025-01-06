import React from 'react';
import { Clock } from 'lucide-react';

const events = [
  {
    time: '06:00',
    title: 'Morning Meditation',
    location: 'Matrimandir',
    type: 'Spiritual'
  },
  {
    time: '08:00',
    title: 'Breakfast at Solar Kitchen',
    location: 'Solar Kitchen',
    type: 'Community'
  },
  {
    time: '09:30',
    title: 'Permaculture Workshop',
    location: 'Buddha Garden',
    type: 'Education'
  },
  {
    time: '15:00',
    title: 'Youth Meeting',
    location: 'Youth Center',
    type: 'Community'
  },
  {
    time: '17:30',
    title: 'Sunset Gathering',
    location: 'Beach Community',
    type: 'Social'
  }
];

export default function TodayInAuroville() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-auroville-primary" />
          <h2 className="text-lg font-semibold text-gray-800">Today in Auroville</h2>
        </div>
        <span className="text-sm text-gray-500">
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })}
        </span>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div 
            key={`${event.time}-${event.title}`}
            className="flex items-start gap-4"
          >
            <div className="w-16 text-right">
              <span className="text-sm font-medium text-gray-900">{event.time}</span>
            </div>
            <div className="flex-1 pb-4 border-b border-gray-100 last:border-0">
              <h3 className="font-medium text-gray-900">{event.title}</h3>
              <p className="text-sm text-gray-500">{event.location}</p>
              <span className="inline-block px-2 py-1 mt-1 text-xs rounded-full bg-auroville-light text-auroville-primary">
                {event.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}