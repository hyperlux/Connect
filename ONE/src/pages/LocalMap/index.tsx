import React from 'react';
import { MapPin, Navigation, Search, Layers } from 'lucide-react';

const locations = [
  {
    id: 1,
    name: 'City Hall',
    address: '123 Main Street',
    category: 'Government',
    distance: '0.5 miles'
  },
  {
    id: 2,
    name: 'Community Center',
    address: '456 Park Avenue',
    category: 'Recreation',
    distance: '1.2 miles'
  },
  {
    id: 3,
    name: 'Public Library',
    address: '789 Knowledge Way',
    category: 'Education',
    distance: '0.8 miles'
  }
];

export default function LocalMap() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Local Map</h1>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm hover:bg-gray-50">
            <Layers className="h-5 w-5 text-gray-600" />
            <span>Layers</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Navigation className="h-5 w-5" />
            <span>Get Directions</span>
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Search locations..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <div className="space-y-4">
              {locations.map((location) => (
                <button
                  key={location.id}
                  className="w-full flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 text-left"
                >
                  <MapPin className="h-5 w-5 text-gray-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900">{location.name}</h3>
                    <p className="text-sm text-gray-500">{location.address}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {location.category}
                      </span>
                      <span className="text-xs text-gray-500">{location.distance}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="bg-gray-100 rounded-lg h-[600px] flex items-center justify-center">
            <p className="text-gray-500">Map view will be integrated here</p>
          </div>
        </div>
      </div>
    </div>
  );
}