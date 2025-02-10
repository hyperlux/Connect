import { Users, Calendar, MessageSquare, TrendingUp, Activity, ArrowRight, RefreshCw } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../lib/theme';
import api from '../lib/api';
import { fetchWithCache } from '../lib/cache';
import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

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

interface DashboardStats {
  activeMembers: number;
  upcomingEvents: number;
  forumPosts: number;
  cityServices: number;
}

const STATS_CONFIG = [
  { label: 'Active Members', key: 'activeMembers' as const, icon: Users, trend: '+15%' },
  { label: 'Upcoming Events', key: 'upcomingEvents' as const, icon: Calendar, trend: '+5%' },
  { label: 'Forum Posts', key: 'forumPosts' as const, icon: MessageSquare, trend: '+25%' },
  { label: 'City Services', key: 'cityServices' as const, icon: Activity, trend: '+10%' },
];

// Cache durations
const EVENTS_CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const STATS_CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

export default function Dashboard() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [events, setEvents] = useState<Event[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isStale, setIsStale] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      // Explicit token validation
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || 'null');

      if (!token || !user) {
        navigate('/login');
        return;
      }

      setLoading(true);
      setError(null);

      // Get current week's start and end dates
      const today = new Date();
      const startOfWeek = new Date(today);
      startOfWeek.setDate(today.getDate() - today.getDay());
      startOfWeek.setHours(0, 0, 0, 0);
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      endOfWeek.setHours(23, 59, 59, 999);

      // Format dates for API
      const startDate = startOfWeek.toISOString().split('T')[0];
      const endDate = endOfWeek.toISOString().split('T')[0];
      
      // Fetch events with caching
      const eventsData = await fetchWithCache<Event[]>(
        `/api/events?startDate=${startDate}&endDate=${endDate}`,
        `dashboard:events:${startDate}:${endDate}`,
        EVENTS_CACHE_DURATION
      );
      
      // Sort events by date and time
      const sortedEvents = eventsData.sort((a: Event, b: Event) => {
        const dateA = new Date(`${a.startDate}T${a.startTime || '00:00'}`);
        const dateB = new Date(`${b.startDate}T${b.startTime || '00:00'}`);
        return dateA.getTime() - dateB.getTime();
      });
      
      setEvents(sortedEvents);
      setIsStale(false); // fromCache is not available with fetchWithCache

      // Fetch dashboard stats with caching
      const statsData = await fetchWithCache<DashboardStats>(
        '/api/dashboard/stats',
        'dashboard:stats',
        STATS_CACHE_DURATION
      );
      
      setStats(statsData);
      
    } catch (error: any) {
      console.error('Dashboard data fetch error:', error);
      
      // Detailed error handling
      if (error.response) {
        switch (error.response.status) {
          case 401:
            navigate('/login');
            break;
          case 403:
            setError('You do not have permission to view this dashboard.');
            break;
          case 500:
            setError('Server error. Please try again later.');
            break;
          default:
            setError('Unable to load dashboard. Please try again.');
        }
      } else {
        setError('Network error. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Rest of the component remains the same as the previous implementation...

  // Render method modifications
  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => {
              setError(null);
              fetchDashboardData();
            }} 
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS_CONFIG.map(({ label, key, icon: Icon, trend }) => {
          const value = stats?.[key] ?? 0;
          return (
            <div 
              key={key}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Icon className="h-5 w-5 text-gray-400" />
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {label}
                  </h3>
                </div>
                <span className="text-sm text-green-500">{trend}</span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-gray-700 dark:text-gray-300">
                {value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Weekly Events */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              This Week's Events
            </h2>
            <Link
              to="/events"
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center"
            >
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          {events.length > 0 ? (
            <div className="space-y-4">
              {events.map((event) => (
                <div 
                  key={event.id}
                  className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                      {event.title}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {event.description}
                    </p>
                    <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(event.startDate).toLocaleDateString()}
                      {event.startTime && ` at ${event.startTime}`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
              No events scheduled for this week
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
