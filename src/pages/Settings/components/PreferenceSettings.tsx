import React from 'react';
import { Settings } from 'lucide-react';
import { useSettings } from '../../../lib/settings';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'French' },
  { code: 'ta', name: 'Tamil' },
];

export default function PreferenceSettings() {
  const { preferences, updateSettings } = useSettings();

  const handleChange = (key: keyof typeof preferences, value: string) => {
    updateSettings({
      preferences: {
        ...preferences,
        [key]: value,
      },
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="h-5 w-5 text-auroville-primary" />
        <h2 className="text-lg font-semibold text-gray-900">Preferences</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <select
            value={preferences.language}
            onChange={(e) => handleChange('language', e.target.value)}
            className="w-full rounded-lg border-gray-300 focus:border-auroville-primary focus:ring-auroville-primary"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Format
          </label>
          <select
            value={preferences.dateFormat}
            onChange={(e) => handleChange('dateFormat', e.target.value)}
            className="w-full rounded-lg border-gray-300 focus:border-auroville-primary focus:ring-auroville-primary"
          >
            <option value="12h">12-hour</option>
            <option value="24h">24-hour</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Timezone
          </label>
          <select
            value={preferences.timezone}
            onChange={(e) => handleChange('timezone', e.target.value)}
            className="w-full rounded-lg border-gray-300 focus:border-auroville-primary focus:ring-auroville-primary"
          >
            {Intl.supportedValuesOf('timeZone').map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}