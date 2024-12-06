import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from './api';

interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  createdAt: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  initialize: () => Promise<void>;
}

// Helper to get initial state from localStorage
const getInitialState = () => {
  try {
    const stored = localStorage.getItem('auth-storage');
    if (stored) {
      const { state } = JSON.parse(stored);
      return {
        user: state.user,
        token: state.token,
        isAuthenticated: Boolean(state.token && state.user),
      };
    }
  } catch (error) {
    console.error('Error reading auth state:', error);
  }
  return { user: null, token: null, isAuthenticated: false };
};

const initialState = getInitialState();

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: initialState.user,
      token: initialState.token,
      isAuthenticated: initialState.isAuthenticated,
      isLoading: false,
      error: null,

      initialize: async () => {
        try {
          const token = get().token;
          if (token) {
            const user = await api.withAuth(token).get('/api/users/me');
            set({ user, isAuthenticated: true });
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          // If token is invalid, clear the auth state
          set({ user: null, token: null, isAuthenticated: false });
        }
      },

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          const data = await api.post('/auth/login', { email, password });
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      register: async ({ name, email, password }) => {
        try {
          set({ isLoading: true, error: null });
          const data = await api.post('/auth/register', { 
            name, 
            email, 
            password 
          });
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true });
          const token = get().token;
          if (token) {
            await api.withAuth(token).post('/auth/logout', {});
          }
          localStorage.removeItem('auth-storage');
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false
          });
        } catch (error: any) {
          set({ error: error.message, isLoading: false });
          throw error;
        }
      },

      clearError: () => set({ error: null }),

      updateProfile: async (data: Partial<User>) => {
        try {
          set({ isLoading: true, error: null });
          const token = get().token;
          if (!token) {
            throw new Error('No authentication token');
          }

          const updatedUser = await api.withAuth(token).put('/api/users/profile', data);
          set({ 
            user: { ...get().user, ...updatedUser },
            isLoading: false 
          });
        } catch (error: any) {
          console.error('Profile update error:', error);
          set({ error: error.message, isLoading: false });
          throw error;
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);