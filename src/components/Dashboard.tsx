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
    console.log('Navigate button clicked');
    e.preventDefault();
    e.stopPropagation();
    console.log('Attempting to navigate to /events');
    navigate('/events');
  };

  return (
    <div className={`flex-1 ${isDark ? 'bg-dark-lighter' : 'bg-gray-50'} p-6 overflow-auto`}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Community Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="h-8 w-8 text-blue-500" />
                <span className="text-green-500 text-sm font-medium">{stat.trend}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
              <p className="text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Community Engagement</h2>
            <div className="h-64 bg-gray-50 rounded-lg"></div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Upcoming Events</h2>
              <div>
                <Link 
                  to="/events"
                  className="flex items-center gap-1 text-auroville-primary hover:text-auroville-primary/80 transition-colors"
                  onClick={handleNavigateToEvents}
                >
                  <span className="text-sm">View All</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              {recentEvents.map((event) => (
                <div key={event.title} className="flex items-center gap-4">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">{event.title}</h3>
                    <p className="text-sm text-gray-500">{event.date}</p>
                    <p className="text-sm text-gray-500">{event.attendees} attending</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Discussions</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0">
                  <img
                    src={`https://images.unsplash.com/photo-${1492633423870 + i}-4f9aeb10bb8f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">Community Garden Project</h3>
                    <p className="text-sm text-gray-500 mb-1">Started by Jane Smith • 2h ago</p>
                    <p className="text-sm text-gray-600">Looking for volunteers to help with the new community garden project...</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Active Members</h2>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <img
                    src={`https://images.unsplash.com/photo-${1492633423870 + i}-4f9aeb10bb8f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                    alt="Member"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">Alex Johnson</h3>
                    <p className="text-sm text-gray-500">Local Business Owner</p>
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