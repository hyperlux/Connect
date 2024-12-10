import { createContext, useContext, useState, useEffect } from 'react';
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
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  withCredentials: true,
});

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      setError(null);
      const response = await api.post('/auth/login', credentials);
      const userData = response.data;
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return userData;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    }
  };

  const register = async (userData: any) => {
    try {
      setError(null);
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
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
      setError(err.response?.data?.message || 'Profile update failed');
      throw err;
    }
  };

  const uploadProfilePicture = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('profilePicture', file);
      const response = await api.post('/users/profile-picture', formData);
      const updatedUser = response.data;
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Profile picture upload failed');
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{
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
      }}
    >
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
