import React from 'react';
import { Star, Users, Heart } from 'lucide-react';

const highlights = [
  {
    id: 1,
    title: 'Sustainable Living Workshop',
    organizer: 'Green Practices Team',
    participants: 45,
    image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 2,
    title: 'Youth Cultural Exchange',
    organizer: 'Cultural Integration Group',
    participants: 78,
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 3,
    title: 'Organic Farming Initiative',
    organizer: 'Food Link',
    participants: 32,
    image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  }
];

export default function CommunityHighlights() {
  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-dark-primary">Community Highlights</h2>
      
      <div className="space-y-4">
        {highlights.map((highlight) => (
          <div key={highlight.id}>
            <h3 className="font-medium text-gray-800 dark:text-dark-primary">{highlight.title}</h3>
            <p className="text-sm text-gray-500 dark:text-dark-secondary">{highlight.organizer}</p>
            <span className="text-sm text-gray-500 dark:text-dark-secondary">{highlight.participants} participants</span>
          </div>
        ))}
      </div>
    </div>
  );
}