import React from 'react';
import { Eye } from 'lucide-react';
import { useSettings } from '../../../lib/settings';

export default function AccessibilitySettings() {
  const { accessibility, updateSettings } = useSettings();

  const handleChange = (key: keyof typeof accessibility, value: any) => {
    updateSettings({
      accessibility: {
        ...accessibility,
        [key]: value,
      },
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Eye className="h-5 w-5 text-auroville-primary" />
        <h2 className="text-lg font-semibold text-gray-900">Accessibility</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Font Size
          </label>
          <select
            value={accessibility.fontSize}
            onChange={(e) => handleChange('fontSize', e.target.value)}
            className="w-full rounded-lg border-gray-300 focus:border-auroville-primary focus:ring-auroville-primary"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contrast
          </label>
          <select
            value={accessibility.contrast}
            onChange={(e) => handleChange('contrast', e.target.value)}
            className="w-full rounded-lg border-gray-300 focus:border-auroville-primary focus:ring-auroville-primary"
          >
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2">
            <span className="text-gray-700">Reduce Motion</span>
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={accessibility.reduceMotion}
              onChange={(e) => handleChange('reduceMotion', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-auroville-light rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-auroville-primary"></div>
          </label>
        </div>
      </div>
    </div>
  );
}