import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '../lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true });
          
          const data = await api.post('/auth/login', { email, password });
          
          if (!data.token || !data.user) {
            throw new Error('Invalid response from server');
          }

          // Set auth state
          set({ 
            user: data.user, 
            token: data.token, 
            isAuthenticated: true,
            isLoading: false
          });

          // Store token for API requests
          localStorage.setItem('auth-token', data.token);
        } catch (error) {
          set({ 
            user: null, 
            token: null, 
            isAuthenticated: false,
            isLoading: false
          });
          console.error('Login error:', error);
          throw error;
        }
      },
      logout: async () => {
        try {
          set({ isLoading: true });
          const token = localStorage.getItem('auth-token');
          
          if (token) {
            await api.withAuth(token).post('/auth/logout', {});
          }
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          // Always clear state
          set({ 
            user: null, 
            token: null, 
            isAuthenticated: false,
            isLoading: false 
          });
          localStorage.removeItem('auth-token');
        }
      },
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