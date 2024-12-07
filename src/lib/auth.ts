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
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const clearAuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
};

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        console.log('Starting login process...');
        try {
          set({ ...clearAuthState, isLoading: true });
          const data = await api.post('/auth/login', { email, password });
          console.log('Login successful, received data:', data);
          
          if (!data.token || !data.user) {
            throw new Error('Invalid response from server');
          }

          // Update state atomically
          set({
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
          
          console.log('Auth state after login:', get());
        } catch (error: any) {
          console.error('Login failed:', error);
          set(clearAuthState);
          throw error;
        }
      },

      register: async ({ name, email, password }) => {
        console.log('Starting registration process...');
        try {
          set({ ...clearAuthState, isLoading: true });
          const data = await api.post('/auth/register', { 
            name, 
            email, 
            password 
          });
          console.log('Registration response:', data);
          
          if (data.token && data.user) {
            // Update state atomically
            set({
              user: data.user,
              token: data.token,
              isAuthenticated: true,
              isLoading: false,
              error: null
            });
          } else {
            // Handle registration that requires email verification
            set(clearAuthState);
          }
          console.log('Auth state after registration:', get());
        } catch (error: any) {
          console.error('Registration failed:', error);
          set(clearAuthState);
          throw error;
        }
      },

      logout: async () => {
        console.log('Starting logout process...');
        try {
          const token = get().token;
          
          // First clear the auth state
          set({ ...clearAuthState, isLoading: true });
          
          // Then try to call the logout endpoint
          if (token) {
            try {
              await api.withAuth(token).post('/auth/logout', {});
              console.log('Logout API call successful');
            } catch (error) {
              console.warn('Logout API call failed, but state is already cleared:', error);
            }
          }
          
          // Clear persisted state
          localStorage.removeItem('auth-storage');
          
          // Final state update
          set(clearAuthState);
          
          console.log('Logout complete, auth state:', get());
        } catch (error: any) {
          console.error('Logout process error:', error);
          // Ensure state is cleared even if there's an error
          set(clearAuthState);
          throw error;
        }
      },

      clearError: () => set({ error: null }),

      updateProfile: async (data: Partial<User>) => {
        try {
          set((state) => ({ ...state, isLoading: true, error: null }));
          const token = get().token;
          if (!token) {
            throw new Error('No authentication token');
          }

          const updatedUser = await api.withAuth(token).put('/api/users/profile', data);
          set((state) => ({ 
            ...state,
            user: { ...state.user, ...updatedUser },
            isLoading: false 
          }));
        } catch (error: any) {
          console.error('Profile update error:', error);
          set((state) => ({ ...state, error: error.message, isLoading: false }));
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
      })
    }
  )
);