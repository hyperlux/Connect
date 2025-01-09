import React from 'react';

const discussions = [
  {
    id: 1,
    title: 'Community Garden Project',
    author: 'Jane Smith',
    time: '2h ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    preview: 'Looking for volunteers to help with the new community garden project...'
  },
  {
    id: 2,
    title: 'Local Business Support Initiative',
    author: 'Mike Johnson',
    time: '4h ago',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    preview: 'Discussing ways to support local businesses during the upcoming...'
  },
  {
    id: 3,
    title: 'Youth Sports Program',
    author: 'Sarah Chen',
    time: '6h ago',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    preview: 'New youth sports program starting next month. Looking for coaches...'
  }
];

export default function RecentDiscussions() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Discussions</h2>
      <div className="space-y-4">
        {discussions.map((discussion) => (
          <div key={discussion.id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
            <img
              src={discussion.avatar}
              alt={discussion.author}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h3 className="font-medium text-gray-800">{discussion.title}</h3>
              <p className="text-sm text-gray-500 mb-1">Started by {discussion.author} • {discussion.time}</p>
              <p className="text-sm text-gray-600">{discussion.preview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}