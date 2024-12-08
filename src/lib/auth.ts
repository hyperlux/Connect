import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { api } from './api';

interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  profilePicture?: string;
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
  uploadProfilePicture: (file: File) => Promise<void>;
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
          // Clear previous state and set loading
          set({ ...clearAuthState, isLoading: true });
          
          // Make API request
          const data = await api.post('/auth/login', { email, password });
          console.log('Login successful, received data:', data);
          
          if (!data.token || !data.user) {
            throw new Error('Invalid response from server');
          }

          // Update state atomically
          const newState = {
            user: data.user,
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
            error: null
          };
          
          // Set new state
          set(newState);
          
          // Double-check state was updated correctly
          const currentState = get();
          console.log('Auth state after login:', currentState);
          
          if (!currentState.isAuthenticated || !currentState.user) {
            console.error('State not updated correctly:', currentState);
            throw new Error('Failed to update auth state');
          }
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
            const newState = {
              user: data.user,
              token: data.token,
              isAuthenticated: true,
              isLoading: false,
              error: null
            };
            set(newState);
            
            const currentState = get();
            if (!currentState.isAuthenticated || !currentState.user) {
              throw new Error('Failed to update auth state after registration');
            }
          } else {
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
          
          // Verify state is cleared
          const currentState = get();
          if (currentState.isAuthenticated || currentState.user || currentState.token) {
            throw new Error('Failed to clear auth state');
          }
          
          console.log('Logout complete, auth state:', currentState);
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
      },

      uploadProfilePicture: async (file: File) => {
        try {
          set((state) => ({ ...state, isLoading: true, error: null }));
          const token = get().token;
          if (!token) {
            throw new Error('No authentication token');
          }

          const formData = new FormData();
          formData.append('profilePicture', file);

          const updatedUser = await api.withAuth(token).post('/api/users/profile/picture', formData, {
            headers: {
              'Content-Type': undefined,
            },
          });

          set((state) => ({ 
            ...state,
            user: { ...state.user, ...updatedUser },
            isLoading: false 
          }));
        } catch (error: any) {
          console.error('Profile picture upload error:', error);
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