import React from 'react';
import { Bike, Bus, Clock } from 'lucide-react';

const transportOptions = [
  {
    icon: Bike,
    title: 'Bicycle Rental',
    schedule: 'Daily: 8:00 AM - 5:00 PM',
    location: 'Visitor Center'
  },
  {
    icon: Bus,
    title: 'Community Bus',
    schedule: 'Every 30 mins: 7:00 AM - 6:00 PM',
    location: 'Multiple Stops'
  }
];

export default function TransportGuide() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Bus className="h-5 w-5 text-auroville-primary" />
        <h2 className="text-lg font-semibold text-gray-900">Transport Guide</h2>
      </div>

      <div className="space-y-4">
        {transportOptions.map((option) => (
          <div key={option.title} className="p-4 rounded-lg bg-gray-50">
            <div className="flex items-center gap-3 mb-2">
              <option.icon className="h-5 w-5 text-auroville-primary" />
              <h3 className="font-medium text-gray-900">{option.title}</h3>
            </div>
            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{option.schedule}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{option.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 px-4 py-2 border border-auroville-primary text-auroville-primary rounded-lg hover:bg-auroville-light transition-colors">
        View Full Schedule
      </button>
    </div>
  );
}