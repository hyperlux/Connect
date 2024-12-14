import { IconProps } from 'lucide-react';
import { QueryClient } from '@tanstack/react-query';

declare global {
  // Event Types
  interface CalendarEvent {
    id: string;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    category: string;
    location: string;
    createdBy: string;
    comments?: Comment[];
  }

  interface Comment {
    id: string;
    content: string;
    author: string;
    createdAt: Date;
  }

  // Forum Types
  interface ForumPost {
    id: string;
    title: string;
    content: string;
    author?: {
      id: string;
      name: string;
    };
    category: string;
    createdAt: string;
    updatedAt: string;
    votes: number;
    comments: Comment[];
  }

  interface CreatePostFormData {
    title: string;
    content: string;
    category: string;
  }

  // Settings Types
  interface UserSettings {
    theme: 'light' | 'dark' | 'system';
    fontSize: 'small' | 'medium' | 'large';
    notifications: {
      email: boolean;
      push: boolean;
      events: boolean;
      forums: boolean;
      decisions: boolean;
    };
    accessibility: {
      highContrast: boolean;
      reducedMotion: boolean;
      screenReader: boolean;
    };
  }

  // Icon Types
  type LucideIcon = React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >;

  // Query Types
  interface QueryHookResult<T> {
    data: T;
    isLoading: boolean;
    error: any;
  }

  // Extend Window Interface
  interface Window {
    queryClient: QueryClient;
  }
}

export {};
