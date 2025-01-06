import React from 'react';
import { Leaf, Droplet, Sun } from 'lucide-react';

const updates = [
  {
    id: 1,
    title: 'Solar Energy Production',
    value: '2.4 MW',
    change: '+12%',
    icon: Sun
  },
  {
    id: 2,
    title: 'Water Conservation',
    value: '45,000 L',
    change: '+8%',
    icon: Droplet
  },
  {
    id: 3,
    title: 'Trees Planted',
    value: '1,250',
    change: '+15%',
    icon: Leaf
  }
];

export default function SustainabilityUpdates() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Sustainability Updates</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {updates.map((update) => (
          <div key={update.id} className="p-4 bg-auroville-light rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <update.icon className="h-6 w-6 text-auroville-primary" />
              <span className="text-green-600 text-sm font-medium">{update.change}</span>
            </div>
            <div className="mt-2">
              <h3 className="text-sm font-medium text-gray-600">{update.title}</h3>
              <p className="text-2xl font-bold text-gray-900">{update.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}