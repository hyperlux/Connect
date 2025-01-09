import React from 'react';
import { Info, Check } from 'lucide-react';

const guidelines = [
  'Respect the silence around Matrimandir',
  'Use eco-friendly transport options',
  'Participate in community activities',
  'Support local businesses',
  'Practice waste segregation'
];

export default function VisitorsGuide() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-4">
        <Info className="h-5 w-5 text-auroville-primary" />
        <h2 className="text-lg font-semibold text-gray-900">Visitor's Guide</h2>
      </div>

      <p className="text-gray-600 mb-4">
        Welcome to Auroville! Here are some guidelines to help you have a 
        meaningful experience while respecting our community values.
      </p>

      <ul className="space-y-3">
        {guidelines.map((guideline) => (
          <li key={guideline} className="flex items-start gap-2">
            <Check className="h-5 w-5 text-green-500 mt-0.5" />
            <span className="text-gray-700">{guideline}</span>
          </li>
        ))}
      </ul>

      <button className="w-full mt-4 px-4 py-2 bg-auroville-primary text-white rounded-lg hover:bg-opacity-90 transition-colors">
        Download Complete Guide
      </button>
    </div>
  );
}