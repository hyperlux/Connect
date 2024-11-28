import React from 'react';
import { Shield } from 'lucide-react';
import { useSettings } from '../../../lib/settings';

export default function PrivacySettings() {
  const { privacy, updateSettings } = useSettings();

  const handleVisibilityChange = (value: typeof privacy.profileVisibility) => {
    updateSettings({
      privacy: {
        ...privacy,
        profileVisibility: value,
      },
    });
  };

  const handleToggle = (key: keyof typeof privacy) => {
    if (key === 'profileVisibility') return;
    updateSettings({
      privacy: {
        ...privacy,
        [key]: !privacy[key],
      },
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Shield className="h-5 w-5 text-auroville-primary" />
        <h2 className="text-lg font-semibold text-gray-900">Privacy</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Profile Visibility
          </label>
          <select
            value={privacy.profileVisibility}
            onChange={(e) => handleVisibilityChange(e.target.value as any)}
            className="w-full rounded-lg border-gray-300 focus:border-auroville-primary focus:ring-auroville-primary"
          >
            <option value="public">Public</option>
            <option value="community">Community Only</option>
            <option value="private">Private</option>
          </select>
        </div>

        <div className="space-y-4">
          {Object.entries(privacy)
            .filter(([key]) => key !== 'profileVisibility')
            .map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <span className="text-gray-700">Show {key.replace('show', '')}</span>
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value as boolean}
                    onChange={() => handleToggle(key as keyof typeof privacy)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-auroville-light rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-auroville-primary"></div>
                </label>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}