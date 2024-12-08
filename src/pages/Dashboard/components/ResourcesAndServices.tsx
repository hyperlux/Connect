import React from 'react';
import { Book, Bus, Heart, Shield, FileText, ArrowRight } from 'lucide-react';

const featuredResources = [
  {
    title: "Bus Schedule",
    description: "Accessible Bus trips Time Table",
    icon: Bus,
    category: "Community Services"
  },
  {
    title: "Snake Safety",
    description: "Information about poisonous snakes",
    icon: Shield,
    category: "Health & Safety"
  },
  {
    title: "Grant Applications",
    description: "Project grant application formats",
    icon: FileText,
    category: "Administrative"
  }
];

const featuredServices = [
  {
    name: "City Health Center",
    category: "Healthcare",
    description: "Primary healthcare services",
    hours: "Mon-Fri: 9:00 AM - 5:00 PM"
  },
  {
    name: "Public Library",
    category: "Education",
    description: "Books and digital resources",
    hours: "Mon-Sat: 10:00 AM - 8:00 PM"
  }
];

export default function ResourcesAndServices() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Resources Section */}
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Book className="h-5 w-5 text-auroville-primary" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-primary">Featured Resources</h2>
          </div>
          <button className="text-sm text-auroville-primary hover:underline flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4">
          {featuredResources.map((resource) => (
            <div key={resource.title} className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-auroville-light dark:bg-auroville-primary/20">
                <resource.icon className="h-5 w-5 text-auroville-primary" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-dark-primary">{resource.title}</h3>
                <p className="text-sm text-gray-500 dark:text-dark-secondary">{resource.description}</p>
                <span className="text-xs text-auroville-primary mt-1 inline-block">{resource.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-auroville-primary" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-primary">Featured Services</h2>
          </div>
          <button className="text-sm text-auroville-primary hover:underline flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4">
          {featuredServices.map((service) => (
            <div key={service.name} className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900 dark:text-dark-primary">{service.name}</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-auroville-light dark:bg-auroville-primary/20 text-auroville-primary">
                  {service.category}
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-dark-secondary mb-2">{service.description}</p>
              <p className="text-xs text-gray-500 dark:text-dark-secondary">{service.hours}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 