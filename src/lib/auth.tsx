import React, { createContext, useContext, useState, useEffect } from 'react';
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
      
      // Enhanced logging for authentication initialization
      console.log('Initialize Auth:', {
        hasToken: !!token,
        hasStoredUser: !!storedUser
      });

      // Reset loading state and clear previous errors
      setIsLoading(true);
      setError(null);
      
      if (!token || !storedUser) {
        console.warn('No token or stored user found');
        setIsLoading(false);
        return;
      }

      try {
        // Parse stored user with error handling
        const parsedUser = JSON.parse(storedUser);
        
        console.log('Parsed User:', {
          id: parsedUser.id,
          email: parsedUser.email,
          name: parsedUser.name
        });

        // Verify token and user data
        const response = await api.get('/auth/verify', {
          headers: {
            'X-Verification-Request': 'true',
            'Authorization': `Bearer ${token}`
          }
        });

        console.log('Verification Response:', {
          status: response.status,
          hasData: !!response.data,
          userId: response.data?.id
        });

        // Validate response
        if (!response.data || !response.data.id) {
          throw new Error('Invalid user verification');
        }

        // Update user state with verified data
        const verifiedUser = {
          ...parsedUser,
          ...response.data
        };

        setUser(verifiedUser);
        localStorage.setItem('user', JSON.stringify(verifiedUser));
      } catch (err: any) {
        console.error('Token verification error:', {
          message: err.message,
          responseStatus: err.response?.status,
          responseData: err.response?.data
        });

        // Handle different error scenarios
        if (err.response?.status === 401) {
          // Token is invalid or expired
          console.warn('Token verification failed. Clearing authentication.');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('refreshToken');
          setUser(null);
          setError('Session expired. Please log in again.');
        } else {
          // Network or server error
          console.error('Authentication verification failed');
          setError('Unable to verify authentication. Please try again.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Set up interval to periodically verify token
    const intervalId = setInterval(initializeAuth, 15 * 60 * 1000); // Verify every 15 minutes

    return () => clearInterval(intervalId);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      // Reset state before login attempt
      setError(null);
      setIsLoading(true);
      
      // Enhanced logging for debugging
      console.log('Login attempt:', {
        email: credentials.email,
        timestamp: new Date().toISOString()
      });

      // Validate input
      if (!credentials.email || !credentials.password) {
        throw new Error('Email and password are required');
      }

      const response = await api.post('/auth/login', credentials, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-Login-Request': 'true'
        }
      });

      // Validate response
      if (!response.data || !response.data.token || !response.data.user) {
        throw new Error('Invalid server response');
      }

      const { user: userData, token, refreshToken } = response.data;
      
      // Comprehensive token storage
      localStorage.setItem('token', token);
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Update context state
      setUser(userData);
      
      // Logging successful login
      console.log('Login successful:', {
        userId: userData.id,
        email: userData.email,
        timestamp: new Date().toISOString()
      });
      
      return response.data;
    } catch (err: any) {
      // Detailed error logging
      console.error('Login error details:', {
        error: err,
        errorResponse: err.response?.data,
        status: err.response?.status
      });

      // Specific error handling
      const errorMessage = err.response?.data?.message || 
                           err.response?.data?.error || 
                           'Login failed';
      
      // Set specific error messages based on status
      switch (err.response?.status) {
        case 401:
          setError('Invalid email or password');
          break;
        case 403:
          if (err.response?.data?.needsVerification) {
            setError('Please verify your email before logging in');
            // Optionally, you could trigger a navigation to email verification page
            // window.location.href = '/verify-email';
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

      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setUser(null);
    setError(null);
  };

  const clearError = () => setError(null);

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
        localStorage.setItem('token', token);
        if (refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }
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

  // Enhanced authentication method
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    console.log('Authentication Check:', {
      token: !!token,
      storedUser: !!storedUser,
      parsedUser: storedUser ? JSON.parse(storedUser) : null
    });

    return !!token && !!storedUser;
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
  
  // Add runtime type inspection
  console.log('Auth Context:', {
    isAuthenticated: context.isAuthenticated(),
    type: typeof context.isAuthenticated,
    user: context.user,
    isLoading: context.isLoading
  });
  
  return context;
};

export { api };
