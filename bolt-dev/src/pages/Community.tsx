import React from 'react';
import { Award, MessageSquare, Calendar } from 'lucide-react';

const members = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Community Leader',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    stats: {
      posts: 156,
      events: 23,
      joined: 'Jan 2023'
    }
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Event Organizer',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    stats: {
      posts: 89,
      events: 45,
      joined: 'Mar 2023'
    }
  }
];

const achievements = [
  { id: 1, name: 'Event Organizer', description: 'Organized 5+ community events', icon: Calendar },
  { id: 2, name: 'Active Contributor', description: '100+ forum posts', icon: MessageSquare },
  { id: 3, name: 'Community Leader', description: 'Recognized for outstanding contributions', icon: Award }
];

export default function Community() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Community Members</h1>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm">
            {members.map((member) => (
              <div key={member.id} className="p-6 border-b last:border-0">
                <div className="flex items-center gap-4">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-gray-900 font-medium">{member.stats.posts}</div>
                    <div className="text-gray-500">Posts</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-gray-900 font-medium">{member.stats.events}</div>
                    <div className="text-gray-500">Events</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-gray-900 font-medium">{member.stats.joined}</div>
                    <div className="text-gray-500">Joined</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Community Achievements</h2>
            <div className="space-y-4">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <achievement.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{achievement.name}</h3>
                    <p className="text-sm text-gray-500">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}