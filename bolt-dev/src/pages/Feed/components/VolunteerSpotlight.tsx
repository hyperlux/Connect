import React from 'react';
import { Heart, Users, Calendar } from 'lucide-react';

const opportunities = [
  {
    id: 1,
    title: 'Reforestation Project',
    location: 'Sadhana Forest',
    schedule: 'Weekdays, 8 AM - 12 PM',
    volunteers: 12,
    image: 'https://images.unsplash.com/photo-1576085898323-218337e3e43c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    id: 2,
    title: 'Community Kitchen',
    location: 'Solar Kitchen',
    schedule: 'Daily, 6 AM - 2 PM',
    volunteers: 8,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  }
];

export default function VolunteerSpotlight() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-auroville-primary" />
          <h2 className="text-lg font-semibold text-gray-900">Volunteer Opportunities</h2>
        </div>
        <button className="text-sm text-auroville-primary hover:underline">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {opportunities.map((opportunity) => (
          <div key={opportunity.id} className="flex gap-4">
            <img
              src={opportunity.image}
              alt={opportunity.title}
              className="w-24 h-24 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-medium text-gray-900">{opportunity.title}</h3>
              <p className="text-sm text-gray-600">{opportunity.location}</p>
              <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{opportunity.schedule}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{opportunity.volunteers} needed</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}