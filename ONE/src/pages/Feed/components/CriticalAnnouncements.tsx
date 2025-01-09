import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

const announcements = [
  {
    id: 1,
    type: 'urgent',
    title: 'Water Conservation Notice',
    message: 'Due to reduced rainfall, please minimize water usage. Conservation guidelines in effect.',
    timestamp: '1 hour ago'
  },
  {
    id: 2,
    type: 'important',
    title: 'New Community Guidelines',
    message: 'Updated guidelines for community participation have been released.',
    timestamp: '3 hours ago'
  }
];

export default function CriticalAnnouncements() {
  return (
    <div className="space-y-4">
      {announcements.map((announcement) => (
        <div
          key={announcement.id}
          className={`p-4 rounded-xl ${
            announcement.type === 'urgent'
              ? 'bg-red-50 border border-red-100'
              : 'bg-blue-50 border border-blue-100'
          }`}
        >
          <div className="flex items-start gap-3">
            {announcement.type === 'urgent' ? (
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
            ) : (
              <Info className="h-5 w-5 text-blue-500 mt-0.5" />
            )}
            <div>
              <h3 className={`font-medium ${
                announcement.type === 'urgent' ? 'text-red-800' : 'text-blue-800'
              }`}>
                {announcement.title}
              </h3>
              <p className={`text-sm mt-1 ${
                announcement.type === 'urgent' ? 'text-red-600' : 'text-blue-600'
              }`}>
                {announcement.message}
              </p>
              <span className="text-xs text-gray-500 mt-2 block">
                {announcement.timestamp}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}