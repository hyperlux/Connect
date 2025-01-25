import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { environment } from './environment';
import { api } from './api';

const { API_URL } = environment;

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  profilePicture?: string;
  createdAt: string;
  status?: 'active' | 'pending' | 'suspended';
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: () => boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<any>;
  logout: () => void;
  register: (userData: any) => Promise<any>;
  clearError: () => void;
  updateProfile: (data: Partial<User>) => Promise<any>;
  uploadProfilePicture: (file: File) => Promise<any>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

// Safe localStorage wrapper to handle potential errors
const safeLocalStorage = {
  getItem: (key: string) => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return null;
    }
  },
  setItem: (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
    }
  },
  removeItem: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  }
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticatedState, setIsAuthenticatedState] = useState(false);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      const token = safeLocalStorage.getItem('token');
      const storedUser = safeLocalStorage.getItem('user');
      
      setIsLoading(true);
      setError(null);
      
      if (!token || !storedUser) {
        setIsAuthenticatedState(false);
        setIsLoading(false);
        return;
      }

      try {
        const parsedUser = JSON.parse(storedUser);

        const response = await api.get('/auth/verify', {
          headers: {
            'X-Verification-Request': 'true',
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data && response.data.id) {
          const verifiedUser = {
            ...parsedUser,
            ...response.data
          };

          setUser(verifiedUser);
          setIsAuthenticatedState(true);
          safeLocalStorage.setItem('user', JSON.stringify(verifiedUser));
        } else {
          throw new Error('Invalid user verification');
        }
      } catch (err: any) {
        console.error('Token verification error:', err);

        if (err.response?.status === 401) {
          safeLocalStorage.removeItem('token');
          safeLocalStorage.removeItem('user');
          safeLocalStorage.removeItem('refreshToken');
          setUser(null);
          setIsAuthenticatedState(false);
          setError('Session expired. Please log in again.');
        } else {
          setIsAuthenticatedState(false);
          setError('Unable to verify authentication. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    const intervalId = setInterval(initializeAuth, 15 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setError(null);
      setIsLoading(true);
      
      const response = await api.post('/auth/login', credentials, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-Login-Request': 'true'
        }
      });

      const { user: userData, token, refreshToken } = response.data;
      
      safeLocalStorage.setItem('token', token);
      if (refreshToken) {
        safeLocalStorage.setItem('refreshToken', refreshToken);
      }
      safeLocalStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
      setIsAuthenticatedState(true);
      
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      
      switch (err.response?.status) {
        case 401:
          setError('Invalid email or password');
          break;
        case 403:
          if (err.response?.data?.needsVerification) {
            setError('Please verify your email before logging in');
          } else {
            setError('Account is locked or disabled');
          }
          break;
        case 500:
          setError('Server error. Please try again later.');
          break;
        default:
          setError(errorMessage);
      }

      setIsAuthenticatedState(false);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = useCallback(() => {
    safeLocalStorage.removeItem('token');
    safeLocalStorage.removeItem('refreshToken');
    safeLocalStorage.removeItem('user');
    setUser(null);
    setError(null);
    setIsAuthenticatedState(false);
  }, []);

  const register = async (userData: any) => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await api.post('/auth/register', userData, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-Custom-Header': 'registration'
        }
      });
      const { user: registeredUser, token, refreshToken } = response.data;
      
      if (token) {
        safeLocalStorage.setItem('token', token);
        if (refreshToken) {
          safeLocalStorage.setItem('refreshToken', refreshToken);
        }
        safeLocalStorage.setItem('user', JSON.stringify(registeredUser));
        setUser(registeredUser);
        setIsAuthenticatedState(true);
      }
      
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      setIsAuthenticatedState(false);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  const updateProfile = async (data: Partial<User>) => {
    try {
      setIsLoading(true);
      const response = await api.put('/users/profile', data);
      const updatedUser = response.data;
      setUser(updatedUser);
      safeLocalStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Profile update failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadProfilePicture = async (file: File) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('profilePicture', file);
      const response = await api.post('/users/profile/picture', formData);
      const updatedUser = response.data;
      setUser(updatedUser);
      safeLocalStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Profile picture upload failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const isAuthenticated = () => {
    return isAuthenticatedState;
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    register,
    clearError,
    updateProfile,
    uploadProfilePicture,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export { api };
