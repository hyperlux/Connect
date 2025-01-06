import React from 'react';
import { LucideIcon } from 'lucide-react';

interface Stat {
  label: string;
  value: string;
  icon: LucideIcon;
  trend: string;
}

interface StatsGridProps {
  stats: Stat[];
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white dark:bg-dark-card p-6 rounded-xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <stat.icon className="h-8 w-8 text-auroville-primary" />
            <span className="text-green-500 dark:text-green-400 text-sm font-medium">{stat.trend}</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-dark-primary mb-1">{stat.value}</h3>
          <p className="text-gray-500 dark:text-dark-secondary">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}