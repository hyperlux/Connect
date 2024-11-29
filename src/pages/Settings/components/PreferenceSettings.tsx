import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';

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
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Language
        </label>
        <select
          {...register('language')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-auroville-primary focus:ring-auroville-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600"
        >
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="ta">Tamil</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Time Zone
        </label>
        <select
          {...register('timezone')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-auroville-primary focus:ring-auroville-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600"
        >
          {timeZones.map((zone) => (
            <option key={zone} value={zone}>
              {zone.replace('_', ' ')}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Date Format
        </label>
        <select
          {...register('dateFormat')}
          onChange={(e) => setDateFormat(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-auroville-primary focus:ring-auroville-primary sm:text-sm dark:bg-gray-700 dark:border-gray-600"
        >
          {DATE_FORMATS.map(({ value, label }) => (
            <option key={value} value={value}>
              {label} ({format(today, value)})
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">
          Notification Preferences
        </h3>
        <div className="mt-4 space-y-4">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                {...register('notifications.email')}
                type="checkbox"
                className="focus:ring-auroville-primary h-4 w-4 text-auroville-primary border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="font-medium text-gray-700 dark:text-gray-200">Email</label>
              <p className="text-gray-500 dark:text-gray-400">Get notified via email</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                {...register('notifications.push')}
                type="checkbox"
                className="focus:ring-auroville-primary h-4 w-4 text-auroville-primary border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="font-medium text-gray-700 dark:text-gray-200">Push Notifications</label>
              <p className="text-gray-500 dark:text-gray-400">Receive push notifications</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                {...register('notifications.sms')}
                type="checkbox"
                className="focus:ring-auroville-primary h-4 w-4 text-auroville-primary border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label className="font-medium text-gray-700 dark:text-gray-200">SMS</label>
              <p className="text-gray-500 dark:text-gray-400">Get SMS notifications</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-auroville-primary hover:bg-auroville-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-auroville-primary"
          >
            Save Changes
          </button>
        </div>
      </div>
    </form>
  );
}