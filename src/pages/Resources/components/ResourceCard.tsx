import React from 'react';
import { ExternalLink } from 'lucide-react';

interface ResourceCardProps {
  title: string;
  description: string;
  url: string;
  icon: any;
}

export default function ResourceCard({ title, description, url, icon: Icon }: ResourceCardProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6 hover:shadow-md transition-all hover:bg-gray-50 dark:hover:bg-dark-lighter"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
          <Icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-primary">{title}</h3>
      </div>
      <p className="text-gray-600 dark:text-dark-secondary mb-4">{description}</p>
      <div className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
        <span>Access Resource</span>
        <ExternalLink className="h-4 w-4 ml-2" />
      </div>
    </a>
  );
}