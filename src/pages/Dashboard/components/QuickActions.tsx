import React from 'react';
import { Compass, Heart, Phone, Newspaper } from 'lucide-react';

const actions = [
  {
    icon: Compass,
    title: 'Discover Auroville',
    description: 'New visitor guide & orientation',
    link: '/discover'
  },
  {
    icon: Heart,
    title: 'Volunteer',
    description: 'Join our community projects',
    link: '/volunteer'
  },
  {
    icon: Phone,
    title: 'Emergency Services',
    description: '24/7 support & assistance',
    link: '/emergency'
  },
  {
    icon: Newspaper,
    title: 'News & Updates',
    description: 'Latest community announcements',
    link: '/news'
  }
];

export default function QuickActions() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {actions.map((action) => (
        <button
          key={action.title}
          className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:bg-auroville-light transition-colors group"
        >
          <div className="p-3 rounded-lg bg-auroville-light group-hover:bg-white transition-colors">
            <action.icon className="w-6 h-6 text-auroville-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-medium text-gray-900">{action.title}</h3>
            <p className="text-sm text-gray-500">{action.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
}