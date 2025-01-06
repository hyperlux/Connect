import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from './api';

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
      isLoading: false,
      error: null,
      selectedCategory: 'All',
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
          const params = new URLSearchParams();
          params.append('page', page.toString());
          params.append('category', get().selectedCategory);
          params.append('sort', get().sortBy);
          
          const response = await api.get(`/forums/posts?${params.toString()}`);
          const { posts, total } = response.data;
          
          set({ 
            posts,
            totalPosts: total,
            currentPage: page,
            isLoading: false 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch posts',
            isLoading: false 
          });
        }
      },

      createPost: async (data) => {
        set({ isLoading: true, error: null });
        try {
          await api.post('/forums/posts', data);
          await get().fetchPosts(1);
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to create post',
            isLoading: false 
          });
        }
      },

      setSelectedCategory: (category) => {
        set({ selectedCategory: category });
        get().fetchPosts(1);
      },

      setSortBy: (sortBy) => {
        set({ sortBy });
        get().fetchPosts(1);
      },

      setSearchQuery: (query) => set({ searchQuery: query }),
      
      setFilters: (filters) => {
        set({ filters });
        get().fetchPosts(1);
      }
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
