import React from 'react';
import { MapPin, Navigation, Layers } from 'lucide-react';

const locations = [
  {
    id: 1,
    name: 'Matrimandir',
    category: 'Spiritual',
    description: 'The soul of Auroville, a place for concentration',
    coordinates: { lat: 12.0053, lng: 79.8080 }
  },
  {
    id: 2,
    name: "Visitor's Center",
    category: 'Information',
    description: 'Your first stop to discover Auroville',
    coordinates: { lat: 12.0052, lng: 79.8079 }
  },
  {
    id: 3,
    name: 'Solar Kitchen',
    category: 'Community',
    description: 'Community dining using solar energy',
    coordinates: { lat: 12.0051, lng: 79.8081 }
  }
];

export default function InteractiveMap() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Explore Auroville</h2>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Layers className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <Navigation className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg h-64 mb-4 flex items-center justify-center">
        <p className="text-gray-500">Interactive map will be integrated here</p>
      </div>

      <div className="space-y-3">
        {locations.map((location) => (
          <div 
            key={location.id}
            className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            <MapPin className="h-5 w-5 text-auroville-primary mt-1" />
            <div>
              <h3 className="font-medium text-gray-900">{location.name}</h3>
              <p className="text-sm text-gray-500">{location.description}</p>
              <span className="inline-block px-2 py-1 mt-1 text-xs rounded-full bg-auroville-light text-auroville-primary">
                {location.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}