import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture?: string;
  bio?: string;
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
<<<<<<< Updated upstream
  baseURL: '/api',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

=======
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  withCredentials: true,
});

>>>>>>> Stashed changes
const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
<<<<<<< Updated upstream
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
=======
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
>>>>>>> Stashed changes
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setError(null);
      const response = await api.post('/auth/login', credentials);
<<<<<<< Updated upstream
      const { user: userData, token } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
      return userData;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
=======
      const userData = response.data;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
>>>>>>> Stashed changes
    }
  };

  const register = async (userData: any) => {
    try {
      setError(null);
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (err: any) {
<<<<<<< Updated upstream
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      throw new Error(errorMessage);
=======
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
>>>>>>> Stashed changes
    }
  };

  const logout = () => {
<<<<<<< Updated upstream
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
=======
    setUser(null);
    localStorage.removeItem('user');
>>>>>>> Stashed changes
  };

  const clearError = () => setError(null);

  const updateProfile = async (data: Partial<User>) => {
    try {
      const response = await api.put('/users/profile', data);
      const updatedUser = response.data;
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (err: any) {
<<<<<<< Updated upstream
      const errorMessage = err.response?.data?.message || 'Profile update failed';
      setError(errorMessage);
      throw new Error(errorMessage);
=======
      setError(err.response?.data?.message || 'Profile update failed');
      throw err;
>>>>>>> Stashed changes
    }
  };

  const uploadProfilePicture = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('profilePicture', file);
<<<<<<< Updated upstream
      const response = await api.post('/users/profile/picture', formData);
=======
      const response = await api.post('/users/profile-picture', formData);
>>>>>>> Stashed changes
      const updatedUser = response.data;
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (err: any) {
<<<<<<< Updated upstream
      const errorMessage = err.response?.data?.message || 'Profile picture upload failed';
      setError(errorMessage);
      throw new Error(errorMessage);
=======
      setError(err.response?.data?.message || 'Profile picture upload failed');
      throw err;
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
export { api }; 
=======
export { api };
>>>>>>> Stashed changes
