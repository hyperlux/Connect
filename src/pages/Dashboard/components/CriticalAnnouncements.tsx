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
    <div className="bg-[#1E1E1E] rounded-xl p-4">
      <h2 className="font-semibold text-white mb-3 text-base">Important Announcements</h2>
      <div className="space-y-3">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className={`p-3 rounded-lg ${
              announcement.type === 'urgent'
                ? 'bg-red-900/20 border border-red-900/30'
                : 'bg-blue-900/20 border border-blue-900/30'
            }`}
          >
            <div className="flex items-start gap-3">
              {announcement.type === 'urgent' ? (
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 shrink-0" />
              ) : (
                <Info className="h-5 w-5 text-blue-400 mt-0.5 shrink-0" />
              )}
              <div>
                <h3 className={`font-medium text-base ${
                  announcement.type === 'urgent' 
                    ? 'text-red-200' 
                    : 'text-blue-200'
                }`}>
                  {announcement.title}
                </h3>
                <p className={`text-sm mt-1 ${
                  announcement.type === 'urgent' 
                    ? 'text-red-300' 
                    : 'text-blue-300'
                }`}>
                  {announcement.message}
                </p>
                <span className="text-xs text-gray-400 mt-2 block">
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