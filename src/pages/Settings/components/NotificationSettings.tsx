import React from 'react';
import { Bell } from 'lucide-react';
import { useSettings } from '../../../lib/settings';

export default function NotificationSettings() {
  const { notifications, updateSettings } = useSettings();

  const handleChange = (key: keyof typeof notifications) => {
    updateSettings({
      notifications: {
        ...notifications,
        [key]: !notifications[key],
      },
    });
  };

  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Bell className="h-5 w-5 text-auroville-primary" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-primary">Notifications</h2>
      </div>

      <div className="space-y-4">
        {Object.entries(notifications).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <span className="text-gray-700 dark:text-dark-primary capitalize">{key}</span>
            </label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={() => handleChange(key as keyof typeof notifications)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-auroville-light dark:peer-focus:ring-auroville-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 dark:after:border-gray-600 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-auroville-primary"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}