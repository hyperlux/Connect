import React, { useEffect } from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '../lib/notifications';
import { useTheme } from '../lib/theme';

export default function NotificationsPopover() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { 
    notifications, 
    unreadCount, 
    isLoading,
    error,
    fetchNotifications, 
    markAsRead, 
    markAllAsRead 
  } = useNotifications();

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500">Loading notifications...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className={`relative ${isDark ? 'text-dark-primary' : 'text-gray-700'}`}>
      <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-hover">
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notifications dropdown content */}
      <div className={`absolute right-0 mt-2 w-80 rounded-md shadow-lg ${
        isDark ? 'bg-dark-card' : 'bg-white'
      }`}>
        <div className="py-1">
          {notifications.length === 0 ? (
            <div className="px-4 py-2 text-sm text-gray-500">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`px-4 py-2 hover:bg-gray-50 dark:hover:bg-dark-hover ${
                  !notification.read ? 'bg-blue-50 dark:bg-dark-lighter' : ''
                }`}
              >
                <div className="text-sm font-medium">{notification.title}</div>
                <div className="text-sm text-gray-500">{notification.message}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}