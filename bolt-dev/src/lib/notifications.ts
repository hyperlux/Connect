import { api } from './api';

interface Notification {
  id: string;
  type: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface NotificationsResponse {
  notifications: Notification[];
  unreadCount: number;
}

export const getNotifications = async () => {
  const { data } = await api.get<NotificationsResponse>('/notifications');
  return data;
};

export const markAsRead = async (notificationId: string) => {
  const { data } = await api.put<Notification>(`/notifications/${notificationId}/read`);
  return data;
};

export const markAllAsRead = async () => {
  const { data } = await api.put<{ success: boolean }>('/notifications/read-all');
  return data;
};