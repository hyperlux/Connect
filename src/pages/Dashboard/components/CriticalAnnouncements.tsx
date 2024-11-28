import { AlertTriangle, Info } from 'lucide-react';

const announcements = [
  {
    id: 1,
    type: 'urgent',
    title: 'Water Conservation Notice',
    message: 'Due to reduced rainfall, please minimize water usage. Conservation guidelines in effect.',
    timestamp: '1 hour ago'
  },
  {
    id: 2,
    type: 'important',
    title: 'New Community Guidelines',
    message: 'Updated community participation guidelines have been released.',
    timestamp: '3 hours ago'
  }
];

export default function CriticalAnnouncements() {
  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm p-6">
      <h2 className="font-semibold text-gray-900 dark:text-dark-primary mb-4">Important Announcements</h2>
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className={`p-4 rounded-xl ${
              announcement.type === 'urgent'
                ? 'bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30'
                : 'bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30'
            }`}
          >
            <div className="flex items-start gap-3">
              {announcement.type === 'urgent' ? (
                <AlertTriangle className="h-5 w-5 text-red-500 dark:text-red-400 mt-0.5" />
              ) : (
                <Info className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-0.5" />
              )}
              <div>
                <h3 className={`font-medium ${
                  announcement.type === 'urgent' 
                    ? 'text-red-800 dark:text-red-200' 
                    : 'text-blue-800 dark:text-blue-200'
                }`}>
                  {announcement.title}
                </h3>
                <p className={`text-sm mt-1 ${
                  announcement.type === 'urgent' 
                    ? 'text-red-600 dark:text-red-300' 
                    : 'text-blue-600 dark:text-blue-300'
                }`}>
                  {announcement.message}
                </p>
                <span className="text-xs text-gray-500 dark:text-dark-secondary mt-2 block">
                  {announcement.timestamp}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}