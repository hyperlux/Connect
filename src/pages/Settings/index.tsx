import React from 'react';
import { Save } from 'lucide-react';
import NotificationSettings from './components/NotificationSettings';
import PrivacySettings from './components/PrivacySettings';
import PreferenceSettings from './components/PreferenceSettings';
import AccessibilitySettings from './components/AccessibilitySettings';
import { useSettings } from '../../lib/settings';

export default function Settings() {
  const { updateSettings } = useSettings();
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSave = async (settings: any) => {
    setIsSaving(true);
    try {
      updateSettings(settings);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-primary">Settings</h1>
        <button
          onClick={() => handleSave({})}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 bg-auroville-primary text-white rounded-lg hover:bg-opacity-90 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-auroville-primary dark:focus:ring-offset-dark"
        >
          <Save className="h-5 w-5" />
          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      <div className="space-y-6">
        <NotificationSettings />
        <PrivacySettings />
        <PreferenceSettings onSave={(settings) => handleSave(settings)} />
        <AccessibilitySettings />
      </div>
    </div>
  );
}