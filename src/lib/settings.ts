import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserSettings {
  theme: 'light' | 'dark';
  notifications: {
    email: boolean;
    push: boolean;
    events: boolean;
    announcements: boolean;
    forum: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'community' | 'private';
    showEmail: boolean;
    showPhone: boolean;
  };
  preferences: {
    language: string;
    timezone: string;
    dateFormat: '12h' | '24h';
  };
  accessibility: {
    fontSize: 'small' | 'medium' | 'large';
    contrast: 'normal' | 'high';
    reduceMotion: boolean;
  };
}

interface SettingsState extends UserSettings {
  updateSettings: (settings: Partial<UserSettings>) => void;
  resetSettings: () => void;
}

const defaultSettings: UserSettings = {
  theme: 'dark',
  notifications: {
    email: true,
    push: true,
    events: true,
    announcements: true,
    forum: true,
  },
  privacy: {
    profileVisibility: 'community',
    showEmail: false,
    showPhone: false,
  },
  preferences: {
    language: 'en',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    dateFormat: '24h',
  },
  accessibility: {
    fontSize: 'medium',
    contrast: 'normal',
    reduceMotion: false,
  },
};

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      ...defaultSettings,
      updateSettings: (newSettings) =>
        set((state) => ({
          ...state,
          ...newSettings,
        })),
      resetSettings: () => set(defaultSettings),
    }),
    {
      name: 'user-settings',
    }
  )
);