import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  category: string;
  createdAt: string;
  updatedAt: string;
  likes: number;
  comments: number;
}

export interface ForumState {
  posts: ForumPost[];
  categories: string[];
  isLoading: boolean;
  error: string | null;
  selectedCategory: string;
  currentPage: number;
  postsPerPage: number;
  totalPosts: number;
  sortBy: 'newest' | 'popular' | 'active';
  searchQuery: string;
  filters: {
    timeRange: 'all' | 'today' | 'week' | 'month';
    status: 'all' | 'open' | 'closed';
  };
  fetchPosts: (page: number) => Promise<void>;
  createPost: (data: Partial<ForumPost>) => Promise<void>;
  setSelectedCategory: (category: string) => void;
  setSortBy: (sort: ForumState['sortBy']) => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: ForumState['filters']) => void;
}

export const useForumStore = create<ForumState>()(
  persist(
    (set, get) => ({
      posts: [],
      categories: ['General', 'Announcements', 'Events', 'Projects', 'Questions'],
      isLoading: false,
      error: null,
      selectedCategory: 'all',
      currentPage: 1,
      postsPerPage: 10,
      totalPosts: 0,
      sortBy: 'newest',
      searchQuery: '',
      filters: {
        timeRange: 'all',
        status: 'all'
      },

      fetchPosts: async (page: number) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`/api/forum/posts?page=${page}&category=${get().selectedCategory}`);
          if (!response.ok) throw new Error('Failed to fetch posts');
          const data = await response.json();
          set({ 
            posts: data.posts,
            totalPosts: data.total,
            currentPage: page,
            isLoading: false 
          });
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },

      createPost: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const response = await fetch('/api/forum/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          });
          if (!response.ok) throw new Error('Failed to create post');
          await get().fetchPosts(1);
        } catch (error) {
          set({ error: (error as Error).message, isLoading: false });
        }
      },

      setSelectedCategory: (category) => {
        set({ selectedCategory: category });
        get().fetchPosts(1);
      },

      setSortBy: (sortBy) => set({ sortBy }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setFilters: (filters) => set({ filters })
    }),
    {
      name: 'forum-store',
      partialize: (state) => ({
        selectedCategory: state.selectedCategory,
        sortBy: state.sortBy,
        filters: state.filters
      })
    }
  )
);
