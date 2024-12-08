import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { Settings } from 'lucide-react';

interface PreferenceSettingsProps {
  onSave: (data: PreferenceFormData) => void;
  initialData?: PreferenceFormData;
}

interface PreferenceFormData {
  language: string;
  timezone: string;
  dateFormat: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
}

const COMMON_TIMEZONES = [
  'Asia/Kolkata',
  'UTC',
  'Europe/London',
  'America/New_York',
  'America/Los_Angeles',
  'Asia/Singapore',
  'Australia/Sydney'
];

const DATE_FORMATS = [
  { value: 'MM/dd/yyyy', label: 'MM/DD/YYYY' },
  { value: 'dd/MM/yyyy', label: 'DD/MM/YYYY' },
  { value: 'yyyy-MM-dd', label: 'YYYY-MM-DD' }
] as const;

export default function PreferenceSettings({ onSave, initialData }: PreferenceSettingsProps) {
  const { register, handleSubmit } = useForm<PreferenceFormData>({
    defaultValues: initialData
  });

  const [dateFormat, setDateFormat] = useState(initialData?.dateFormat || DATE_FORMATS[0].value);

  const timeZones = useMemo(() => {
    const systemTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const allTimeZones = new Set([
      ...COMMON_TIMEZONES,
      ...(systemTimeZone ? [systemTimeZone] : [])
    ]);
    return Array.from(allTimeZones).sort();
  }, []);

  const handleFormSubmit = (data: PreferenceFormData) => {
    onSave(data);
  };

  const today = new Date();

  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="h-5 w-5 text-auroville-primary" />
        <h2 className="text-lg font-semibold text-gray-900 dark:text-dark-primary">Preferences</h2>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-dark-primary mb-2">
            Language
          </label>
          <select
            {...register('language')}
            className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-dark-lighter dark:text-dark-primary focus:border-auroville-primary focus:ring-auroville-primary"
          >
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="ta">Tamil</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-dark-primary mb-2">
            Time Zone
          </label>
          <select
            {...register('timezone')}
            className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-dark-lighter dark:text-dark-primary focus:border-auroville-primary focus:ring-auroville-primary"
          >
            {timeZones.map((zone) => (
              <option key={zone} value={zone}>
                {zone.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-dark-primary mb-2">
            Date Format
          </label>
          <select
            {...register('dateFormat')}
            onChange={(e) => setDateFormat(e.target.value)}
            className="w-full rounded-lg border-gray-300 dark:border-gray-700 dark:bg-dark-lighter dark:text-dark-primary focus:border-auroville-primary focus:ring-auroville-primary"
          >
            {DATE_FORMATS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label} ({format(today, value)})
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-dark-primary mb-4">
            Notification Preferences
          </h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  {...register('notifications.email')}
                  type="checkbox"
                  className="focus:ring-auroville-primary h-4 w-4 text-auroville-primary border-gray-300 dark:border-gray-600 rounded dark:bg-dark-lighter"
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="font-medium text-gray-700 dark:text-dark-primary">Email</label>
                <p className="text-gray-500 dark:text-dark-secondary">Get notified via email</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  {...register('notifications.push')}
                  type="checkbox"
                  className="focus:ring-auroville-primary h-4 w-4 text-auroville-primary border-gray-300 dark:border-gray-600 rounded dark:bg-dark-lighter"
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="font-medium text-gray-700 dark:text-dark-primary">Push Notifications</label>
                <p className="text-gray-500 dark:text-dark-secondary">Receive push notifications</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  {...register('notifications.sms')}
                  type="checkbox"
                  className="focus:ring-auroville-primary h-4 w-4 text-auroville-primary border-gray-300 dark:border-gray-600 rounded dark:bg-dark-lighter"
                />
              </div>
              <div className="ml-3 text-sm">
                <label className="font-medium text-gray-700 dark:text-dark-primary">SMS</label>
                <p className="text-gray-500 dark:text-dark-secondary">Get SMS notifications</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-auroville-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-auroville-primary dark:focus:ring-offset-dark"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}