import React from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const timeline = [
  {
    id: 1,
    title: 'Renewable Energy Initiative',
    status: 'approved',
    date: '2024-03-01',
    icon: CheckCircle
  },
  {
    id: 2,
    title: 'Community Center Renovation',
    status: 'pending',
    date: '2024-02-28',
    icon: Clock
  },
  {
    id: 3,
    title: 'New Transport System',
    status: 'rejected',
    date: '2024-02-25',
    icon: XCircle
  },
  {
    id: 4,
    title: 'Water Conservation Project',
    status: 'review',
    date: '2024-02-20',
    icon: AlertCircle
  }
];

const statusColors: Record<string, string> = {
  approved: 'text-green-500',
  pending: 'text-yellow-500',
  rejected: 'text-red-500',
  review: 'text-blue-500'
};

export default function DecisionTimeline() {
  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6 dark:p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-primary mb-6">Recent Decisions</h2>

      <div className="relative">
        <div className="absolute top-0 bottom-0 left-4 w-px bg-gray-200 dark:bg-gray-700" />
        
        <div className="space-y-6">
          {timeline.map((item) => (
            <div key={item.id} className="relative flex items-start gap-4">
              <div className={`relative z-10 rounded-full p-1 bg-white dark:bg-dark-card ${statusColors[item.status]}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-dark-primary">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-dark-secondary">
                  {new Date(item.date).toLocaleDateString()}
                </p>
                <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 mt-1">
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}