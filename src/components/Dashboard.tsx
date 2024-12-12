import React from 'react';
import { Users, Calendar, MessageSquare, TrendingUp, Activity, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../lib/theme';

const stats = [
  { label: 'Active Members', value: '12,345', icon: Users, trend: '+15%' },
  { label: 'Upcoming Events', value: '48', icon: Calendar, trend: '+5%' },
  { label: 'Forum Posts', value: '1,234', icon: MessageSquare, trend: '+25%' },
  { label: 'City Services', value: '89', icon: Activity, trend: '+10%' },
];

const recentEvents = [
  {
    title: 'Community Clean-up Drive',
    date: 'Mar 15, 2024',
    image: 'https://images.unsplash.com/photo-1558008258-3256797b43f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    attendees: 156
  },
  {
    title: 'Local Business Fair',
    date: 'Mar 20, 2024',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    attendees: 230
  },
  {
    title: 'Tech Workshop Series',
    date: 'Mar 25, 2024',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    attendees: 89
  }
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleNavigateToEvents = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/events');
  };

  return (
    <div className="w-full h-full">
      <div className="max-w-screen-2xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Community Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white dark:bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="h-6 w-6 text-indigo-500" />
                <span className="text-green-500 text-sm font-medium">{stat.trend}</span>
              </div>
              <h3 className="text-xl font-bold mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Community Engagement Section */}
        <div className="mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Community Engagement</h2>
            <div className="h-48 bg-gray-50 dark:bg-gray-700 rounded"></div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Latest Posts */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Latest Community Posts</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-3 pb-4 border-b border-gray-100 dark:border-gray-700 last:border-0">
                  <img
                    src={`https://images.unsplash.com/photo-${1492633423870 + i}-4f9aeb10bb8f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                    alt="User"
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium">Community Garden Project</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Started by Jane Smith • 2h ago</p>
                    <p className="text-sm">Looking for volunteers to help with the new community garden project...</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Upcoming Events</h2>
              <Link 
                to="/events"
                className="flex items-center gap-1 text-indigo-500 hover:text-indigo-600"
                onClick={handleNavigateToEvents}
              >
                <span className="text-sm">View All</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div key={event.title} className="flex items-center gap-3">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{event.date}</p>
                    <p className="text-xs text-gray-500">{event.attendees} attending</p>
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
