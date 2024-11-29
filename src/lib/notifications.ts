import { create } from 'zustand';
import { api } from './api';
import { useAuth } from './auth';

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

export const useNotifications = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,

  fetchNotifications: async () => {
    const { token } = useAuth.getState();
    if (!token) {
      console.log('No auth token available');
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const response = await api.withAuth(token).get('/api/notifications');
      const notifications = response.data || [];
      const unreadCount = notifications.filter((n: Notification) => !n.read).length;
      
      set({ 
        notifications,
        unreadCount,
        isLoading: false 
      });
    } catch (error: any) {
      console.error('Failed to fetch notifications:', error);
      set({ 
        notifications: [],
        unreadCount: 0,
        error: 'Failed to fetch notifications',
        isLoading: false 
      });
    }
  },

  markAsRead: async (id: string) => {
    const { token } = useAuth.getState();
    if (!token) return;

    try {
      await api.withAuth(token).put(`/api/notifications/${id}/read`, {});
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
    const { token } = useAuth.getState();
    if (!token) return;

    try {
      await api.withAuth(token).put('/api/notifications/read-all', {});
      const notifications = get().notifications.map(n => ({ ...n, read: true }));
      set({ notifications, unreadCount: 0 });
    } catch (error) {
      set({ error: 'Failed to mark all notifications as read' });
    }
  }
}));