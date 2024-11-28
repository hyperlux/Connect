import { create } from 'zustand';
import axios from './axios';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  createdAt: string;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
}

// Mock notifications for development
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Welcome to Auroville',
    message: 'Thank you for joining our community platform.',
    type: 'success',
    read: false,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'New Event',
    message: 'Community gathering this weekend.',
    type: 'info',
    read: false,
    createdAt: new Date().toISOString()
  }
];

export const useNotifications = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,

  fetchNotifications: async () => {
    set({ isLoading: true, error: null });
    try {
      // In development, use mock data
      if (process.env.NODE_ENV === 'development') {
        set({ 
          notifications: mockNotifications,
          unreadCount: mockNotifications.filter(n => !n.read).length,
          isLoading: false 
        });
        return;
      }

      const response = await axios.get('/api/notifications');
      const notifications = response.data;
      set({ 
        notifications,
        unreadCount: notifications.filter((n: Notification) => !n.read).length,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: 'Failed to fetch notifications',
        isLoading: false 
      });
    }
  },

  markAsRead: async (id: string) => {
    try {
      if (process.env.NODE_ENV === 'development') {
        const notifications = get().notifications.map(n =>
          n.id === id ? { ...n, read: true } : n
        );
        set({ 
          notifications,
          unreadCount: notifications.filter(n => !n.read).length 
        });
        return;
      }

      await axios.put(`/api/notifications/${id}/read`);
      const notifications = get().notifications.map(n =>
        n.id === id ? { ...n, read: true } : n
      );
      set({ 
        notifications,
        unreadCount: notifications.filter(n => !n.read).length 
      });
    } catch (error) {
      set({ error: 'Failed to mark notification as read' });
    }
  },

  markAllAsRead: async () => {
    try {
      if (process.env.NODE_ENV === 'development') {
        const notifications = get().notifications.map(n => ({ ...n, read: true }));
        set({ notifications, unreadCount: 0 });
        return;
      }

      await axios.put('/api/notifications/read-all');
      const notifications = get().notifications.map(n => ({ ...n, read: true }));
      set({ notifications, unreadCount: 0 });
    } catch (error) {
      set({ error: 'Failed to mark all notifications as read' });
    }
  }
}));