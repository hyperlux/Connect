/// <reference types="vite/client" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare module '*.svg' {
  import * as React from 'react';
  const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

declare module '@tanstack/react-query' {
  export function useQuery<T>(
    key: any[],
    fn: () => Promise<T>,
    options?: any
  ): { data: T; isLoading: boolean; error: any };
}

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
  comments?: Array<{
    id: string;
    content: string;
    author: {
      id: string;
      name: string;
    };
    createdAt: string;
  }>;
}

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  category: string;
  organizer?: {
    id: string;
    name: string;
  };
  comments?: Array<{
    id: string;
    content: string;
    author: {
      id: string;
      name: string;
    };
    createdAt: string;
  }>;
}

declare global {
  interface Window {
    __INITIAL_STATE__: any;
  }
}
