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

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      isHydrated: false,
      error: null,

      setHydrated: (state: boolean) => set({ isHydrated: state }),

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          const data = await api.post('/auth/login', { email, password });
          
          // Update state with user data and token
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error: any) {
          set({ 
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: error.message 
          });
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
            // Update state with user data and token
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
          set({ 
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: error.message 
          });
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
          // Clear auth state
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false
          });
        } catch (error: any) {
          // Still clear state even if logout request fails
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,
            error: error.message
          });
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
        // When state is rehydrated from storage, set hydrated flag
        if (state) {
          state.setHydrated(true);
        }
      }
    }
  )
);