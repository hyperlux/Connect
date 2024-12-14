import React, { useEffect, useState } from 'react';
import { Users, Calendar, MessageSquare, TrendingUp, Activity, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../lib/theme';
import { api } from '../lib/api';

interface Event {
  id: string;
  title: string;
  description: string;
  location: string | null;
  startDate: string;
  endDate: string | null;
  startTime: string | null;
  endTime: string | null;
}

const stats = [
  { label: 'Active Members', value: '12,345', icon: Users, trend: '+15%' },
  { label: 'Upcoming Events', value: '48', icon: Calendar, trend: '+5%' },
  { label: 'Forum Posts', value: '1,234', icon: MessageSquare, trend: '+25%' },
  { label: 'City Services', value: '89', icon: Activity, trend: '+10%' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Get current week's start and end dates
        const today = new Date();
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay()); // Start from Sunday
        startOfWeek.setHours(0, 0, 0, 0);
        
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // End on Saturday
        endOfWeek.setHours(23, 59, 59, 999);

        // Format dates for API
        const startDate = startOfWeek.toISOString().split('T')[0];
        const endDate = endOfWeek.toISOString().split('T')[0];
        
        const response = await api.get(`/events?startDate=${startDate}&endDate=${endDate}`);
        
        // Sort events by date and time
        const sortedEvents = response.data.sort((a: Event, b: Event) => {
          const dateA = new Date(`${a.startDate}T${a.startTime || '00:00'}`);
          const dateB = new Date(`${b.startDate}T${b.startTime || '00:00'}`);
          return dateA.getTime() - dateB.getTime();
        });
        
        setEvents(sortedEvents);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleNavigateToEvents = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/app/events');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (time: string | null) => {
    if (!time) return '';
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  const getEventTimeDisplay = (event: Event) => {
    const startTimeDisplay = formatTime(event.startTime);
    const endTimeDisplay = event.endTime ? formatTime(event.endTime) : '';
    return endTimeDisplay ? `${startTimeDisplay} - ${endTimeDisplay}` : startTimeDisplay;
  };

  const getCurrentWeekRange = () => {
    const today = new Date();
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + 6);
    
    return `${today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
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

          {/* Weekly Events */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold">Weekly Events</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">{getCurrentWeekRange()}</p>
              </div>
              <Link 
                to="/app/events"
                className="flex items-center gap-1 text-indigo-500 hover:text-indigo-600"
                onClick={handleNavigateToEvents}
              >
                <span className="text-sm">View All</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-4">Loading events...</div>
              ) : events.length === 0 ? (
                <div className="text-center py-4 text-gray-500">No events this week</div>
              ) : (
                events.map((event) => (
                  <div key={event.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded">
                      <Calendar className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{event.title}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {formatDate(event.startDate)} • {getEventTimeDisplay(event)}
                      </p>
                      {event.location && (
                        <p className="text-xs text-gray-500 mt-1">
                          📍 {event.location}
                        </p>
                      )}
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                        {event.description}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
