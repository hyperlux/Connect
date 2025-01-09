import React from 'react';
import { Bell, AlertCircle, Info } from 'lucide-react';

const updates = [
  {
    type: 'alert',
    icon: AlertCircle,
    message: 'Road maintenance near Solar Kitchen',
    time: '10 mins ago'
  },
  {
    type: 'info',
    icon: Info,
    message: 'New exhibition at Visitor Center',
    time: '1 hour ago'
  },
  {
    type: 'info',
    icon: Info,
    message: 'Water conservation workshop today',
    time: '2 hours ago'
  }
];

export default function LiveUpdates() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="h-5 w-5 text-auroville-primary" />
        <h2 className="text-lg font-semibold text-gray-900">Live Updates</h2>
      </div>

      <div className="space-y-4">
        {updates.map((update, index) => (
          <div 
            key={index}
            className="flex items-start gap-3 p-3 rounded-lg bg-gray-50"
          >
            <update.icon 
              className={`h-5 w-5 mt-0.5 ${
                update.type === 'alert' 
                  ? 'text-red-500' 
                  : 'text-blue-500'
              }`} 
            />
            <div>
              <p className="text-gray-700">{update.message}</p>
              <span className="text-sm text-gray-500">{update.time}</span>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 px-4 py-2 text-sm text-auroville-primary hover:underline">
        View All Updates
      </button>
    </div>
  );
}