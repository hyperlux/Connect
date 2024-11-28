import React from 'react';
import { Leaf, Heart, Globe } from 'lucide-react';

const highlights = [
  {
    icon: Globe,
    title: 'Universal Township',
    description: 'A place where people of all countries can live in peace and harmony.'
  },
  {
    icon: Heart,
    title: 'Human Unity',
    description: 'An experiment in human unity and transformation of consciousness.'
  },
  {
    icon: Leaf,
    title: 'Sustainability',
    description: 'Living in harmony with nature through sustainable practices.'
  }
];

export default function IntroSection() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Welcome to Auroville</h2>
      
      <p className="text-gray-600 mb-6">
        Founded in 1968, Auroville is an international community dedicated to human 
        unity and sustainable living. Based on the vision of Sri Aurobindo and The 
        Mother, it's a unique experiment in conscious living and spiritual growth.
      </p>

      <div className="space-y-4">
        {highlights.map((item) => (
          <div key={item.title} className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-auroville-light">
              <item.icon className="h-6 w-6 text-auroville-primary" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <blockquote className="mt-6 border-l-4 border-auroville-primary pl-4 italic text-gray-600">
        "Auroville wants to be a universal town where men and women of all countries 
        are able to live in peace and progressive harmony above all creeds, all 
        politics and all nationalities."
        <footer className="text-sm mt-2">— The Mother</footer>
      </blockquote>
    </div>
  );
}