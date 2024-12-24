import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { environment } from './environment';

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
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<any>;
  logout: () => void;
  register: (userData: any) => Promise<any>;
  clearError: () => void;
  updateProfile: (data: Partial<User>) => Promise<any>;
  uploadProfilePicture: (file: File) => Promise<any>;
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Accept': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (!(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
  }
  // Remove Cache-Control header
  delete config.headers['Cache-Control'];
  return config;
});

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (!token || !storedUser) {
        setIsLoading(false);
        return;
      }

      // Set initial user state from localStorage
      setUser(JSON.parse(storedUser));
      
      const verifyToken = async (retryCount = 0) => {
        try {
          const response = await api.get('/auth/verify');
          const userData = response.data;
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
        } catch (err: any) {
          console.error('Token verification error:', err.response?.data || err.message);
          if (err.response?.status === 401) {
            // Token is invalid
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setUser(null);
          } else if (retryCount < 3 && (!err.response || err.response.status >= 500)) {
            // Retry on network errors or server errors, up to 3 times
            setTimeout(() => verifyToken(retryCount + 1), 1000 * (retryCount + 1));
            return;
          }
        }
        setIsLoading(false);
      };

      verifyToken();
    };

    initializeAuth();

    // Set up interval to periodically verify token
    const intervalId = setInterval(initializeAuth, 15 * 60 * 1000); // Verify every 15 minutes

    return () => clearInterval(intervalId);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await api.post('/auth/login', credentials);
      const { user: userData, token } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

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
      const { user: registeredUser, token } = response.data;
      
      if (token) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(registeredUser));
        setUser(registeredUser);
      }
      
      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const clearError = () => setError(null);

  const updateProfile = async (data: Partial<User>) => {
    try {
      setIsLoading(true);
      const response = await api.put('/users/profile', data);
      const updatedUser = response.data;
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
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
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Profile picture upload failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!user,
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
