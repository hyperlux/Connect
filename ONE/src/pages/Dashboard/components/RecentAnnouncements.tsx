import React from 'react';
import { Bell, ExternalLink } from 'lucide-react';

const announcements = [
  {
    id: 1,
    title: 'New Solar Plant Installation',
    category: 'Infrastructure',
    date: '2h ago',
    preview: 'Phase 2 of the solar power plant installation begins next week...',
    priority: 'high'
  },
  {
    id: 2,
    title: 'Water Conservation Workshop',
    category: 'Education',
    date: '1d ago',
    preview: 'Join us for a hands-on workshop on water conservation techniques...',
    priority: 'medium'
  },
  {
    id: 3,
    title: 'Community Farm Update',
    category: 'Agriculture',
    date: '2d ago',
    preview: 'Latest updates on organic farming initiatives and volunteer needs...',
    priority: 'normal'
  }
];

export default function RecentAnnouncements() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Recent Announcements</h2>
        <button className="text-auroville-primary hover:text-opacity-80">
          <ExternalLink className="h-5 w-5" />
        </button>
      </div>
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div 
            key={announcement.id} 
            className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <Bell className={`h-5 w-5 ${
              announcement.priority === 'high' 
                ? 'text-red-500' 
                : announcement.priority === 'medium'
                ? 'text-yellow-500'
                : 'text-green-500'
            }`} />
            <div>
              <h3 className="font-medium text-gray-800">{announcement.title}</h3>
              <p className="text-sm text-gray-500 mb-1">
                {announcement.category} • {announcement.date}
              </p>
              <p className="text-sm text-gray-600">{announcement.preview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}