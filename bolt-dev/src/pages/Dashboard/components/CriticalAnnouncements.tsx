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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div className="p-4">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-3">Important Announcements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className={`p-3 rounded-lg ${
                announcement.type === 'urgent'
                  ? 'bg-auroville-primary/10 border border-auroville-primary/20'
                  : 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900/30'
              }`}
            >
              <div className="flex items-start gap-3">
                {announcement.type === 'urgent' ? (
                  <AlertTriangle className="h-5 w-5 text-auroville-primary mt-0.5 shrink-0" />
                ) : (
                  <Info className="h-5 w-5 text-blue-500 dark:text-blue-400 mt-0.5 shrink-0" />
                )}
                <div>
                  <h3 className={`font-medium ${
                    announcement.type === 'urgent' 
                      ? 'text-auroville-primary' 
                      : 'text-blue-800 dark:text-blue-200'
                  }`}>
                    {announcement.title}
                  </h3>
                  <p className={`text-sm mt-1 ${
                    announcement.type === 'urgent' 
                      ? 'text-auroville-primary/90' 
                      : 'text-blue-700 dark:text-blue-300'
                  }`}>
                    {announcement.message}
                  </p>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 block">
                    {announcement.timestamp}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
