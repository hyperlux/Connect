import React, { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './ui/dropdown-menu';

interface Notification {
  id: string;
  type: 'event' | 'attendance' | 'forum';
  title: string;
  message: string;
  link: string;
  read: boolean;
  createdAt: string;
}

export default function NotificationsPopover() {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const isDark = theme === 'dark';
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
    }
  }, [isAuthenticated]);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications', {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to fetch notifications');
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    try {
      // Mark as read
      await fetch(`/api/notifications/${notification.id}/read`, {
        method: 'PUT',
        credentials: 'include'
      });
      
      // Remove from list
      setNotifications(notifications.filter(n => n.id !== notification.id));
      
      // Navigate to the link
      navigate(notification.link);
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`relative p-2 rounded-lg transition-colors ${
            isDark 
              ? 'hover:bg-dark-lighter text-dark-secondary hover:text-dark-primary' 
              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
          }`}
        >
          <Bell className="h-5 w-5" />
          {notifications.length > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-2">
        <div className={`px-3 py-2 font-medium border-b ${
          isDark 
            ? 'text-dark-primary border-dark' 
            : 'text-gray-900 border-gray-200'
        }`}>
          Notifications
        </div>
        <div className="py-2">
          {loading ? (
            <div className={`px-3 py-2 text-sm ${
              isDark ? 'text-dark-secondary' : 'text-gray-500'
            }`}>
              Loading notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div className={`px-3 py-2 text-sm ${
              isDark ? 'text-dark-secondary' : 'text-gray-500'
            }`}>
              No new notifications
            </div>
          ) : (
            notifications.map(notification => (
              <DropdownMenuItem
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex flex-col gap-1">
                  <p className="font-medium">
                    {notification.title}
                  </p>
                  <p className={`text-sm ${
                    isDark ? 'text-dark-secondary' : 'text-gray-600'
                  }`}>
                    {notification.message}
                  </p>
                  <p className={`text-xs ${
                    isDark ? 'text-dark-secondary' : 'text-gray-500'
                  }`}>
                    {formatTimeAgo(notification.createdAt)}
                  </p>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>
        {notifications.length > 0 && (
          <div 
            onClick={() => navigate('/notifications')}
            className={`px-3 py-2 text-sm border-t ${
              isDark 
                ? 'text-auroville-primary border-dark hover:bg-dark-hover' 
                : 'text-auroville-primary border-gray-200 hover:bg-gray-50'
            } cursor-pointer text-center transition-colors`}
          >
            View all notifications
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}