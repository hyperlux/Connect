import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { api } from './api';

interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  createdAt: string;
  role?: string;
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
  isHydrated: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
  setHydrated: (state: boolean) => void;
}

// Helper to get initial state from localStorage
const getInitialState = () => {
  try {
    const token = localStorage.getItem('auth-token');
    const storedAuth = localStorage.getItem('auth-storage');
    if (storedAuth && token) {
      const { state } = JSON.parse(storedAuth);
      return {
        user: state.user,
        token: token,
        isAuthenticated: true
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
      isHydrated: false,
      error: null,

      setHydrated: (state: boolean) => set({ isHydrated: state }),

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          const data = await api.post('/auth/login', { email, password });
          
          // Store token in localStorage for API calls
          localStorage.setItem('auth-token', data.token);
          
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
          
          if (data.token) {
            // Store token in localStorage for API calls
            localStorage.setItem('auth-token', data.token);
            
            set({
              user: data.user,
              token: data.token,
              isAuthenticated: true,
              isLoading: false
            });
          } else {
            // Handle registration that requires email verification
            set({
              user: null,
              token: null,
              isAuthenticated: false,
              isLoading: false
            });
          }
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
          // Clear all auth data
          localStorage.removeItem('auth-token');
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
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated(true);
        }
      }
    }
  )
);