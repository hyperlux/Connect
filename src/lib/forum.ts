import { create } from 'zustand';
import axios from './axios';

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  category: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  replies: number;
  views: number;
  lastActivity: string;
}

interface ForumState {
  posts: ForumPost[];
  categories: string[];
  isLoading: boolean;
  error: ErrorState | null;
  selectedCategory: string;
  currentPage: number;
  postsPerPage: number;
  totalPosts: number;
  sortBy: SortOption;
  fetchPosts: (page: number) => Promise<void>;
  createPost: (data: Partial<ForumPost>) => Promise<void>;
  setSelectedCategory: (category: string) => void;
  setSortOption: (option: SortOption) => void;
  editPost: (id: string, data: Partial<ForumPost>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  pinPost: (id: string) => Promise<void>;
}

type SortOption = 'latest' | 'mostViewed' | 'mostCommented';
type ErrorState = string;

export const useForumStore = create<ForumState>((set, get) => ({
  posts: [],
  categories: ['General', 'Announcements', 'Events', 'Projects', 'Questions', 'Ideas'],
  isLoading: false,
  error: null,
  selectedCategory: 'All',

  fetchPosts: async () => {
    try {
      set({ isLoading: true, error: null });
      const { selectedCategory } = get();
      const response = await axios.get('/api/forums/posts' + 
        (selectedCategory !== 'All' ? `?category=${selectedCategory}` : '')
      );
      
      const formattedPosts = response.data.map((post: any) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        category: post.category,
        author: post.author,
        createdAt: new Date(post.createdAt).toLocaleDateString(),
        replies: post.replies || 0,
        views: post.views || 0,
        lastActivity: new Date(post.lastActivity).toLocaleDateString()
      }));
      
      set({ posts: formattedPosts, isLoading: false });
    } catch (error: any) {
      console.error('Error fetching posts:', error);
      set({ 
        error: error.response?.data?.message || 'Failed to load posts', 
        isLoading: false 
      });
    }
  },

  createPost: async (data) => {
    try {
      set({ isLoading: true, error: null });
      await axios.post('/api/forums/posts', data);
      await get().fetchPosts();
    } catch (error: any) {
      console.error('Error creating post:', error);
      set({ 
        error: error.response?.data?.message || 'Failed to create post', 
        isLoading: false 
      });
    }
  },

  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
    get().fetchPosts();
  }
}));

interface PostAnalytics {
  viewCount: number;
  uniqueViewers: string[];
  engagementRate: number;
}

// Add useEffect in your forum page component to trigger the fetch
useEffect(() => {
  forumStore.fetchPosts();
}, []);
