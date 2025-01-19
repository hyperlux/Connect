import { api } from './api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  profilePicture?: string;
  bio?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface RegistrationResponse {
  message: string;
}

export const useAuth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const registerUser = async (data: { name: string; email: string; password: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post<RegistrationResponse>('/auth/register', data);
      // Store email for verification resend functionality
      localStorage.setItem('pendingVerificationEmail', data.email);
      // Navigate to email sent page with email in state
      navigate('/email-sent', { state: { email: data.email } });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const loginUser = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post<AuthResponse>('/auth/login', data);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      // Clear any pending verification email
      localStorage.removeItem('pendingVerificationEmail');
      setUser(user);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      const needsVerification = error.response?.data?.needsVerification;
      
      if (needsVerification) {
        // Store email for verification resend functionality
        localStorage.setItem('pendingVerificationEmail', data.email);
        navigate('/email-verification', { state: { email: data.email } });
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('pendingVerificationEmail');
    setUser(null);
    navigate('/login');
  };

  const getCurrentUser = () => {
    return user || JSON.parse(localStorage.getItem('user') || 'null');
  };

  const isAuthenticated: () => boolean = () => {
    return !!localStorage.getItem('token');
  };

  const updateProfile = async (data: { name?: string; email?: string; profilePicture?: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.patch('/users/me', data);
      const updatedUser = response.data;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return updatedUser;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Profile update failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadProfilePicture = async (file: File) => {
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await api.post('/users/me/profile-picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      const updatedUser = response.data;
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return updatedUser;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Profile picture upload failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const resendVerificationEmail = async (email: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/resend-verification', { email });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to resend verification email';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmail = async (token: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get(`/auth/verify-email?token=${token}`);
      // Clear pending verification email on successful verification
      localStorage.removeItem('pendingVerificationEmail');
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Email verification failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    register: registerUser,
    login: loginUser,
    logout: logoutUser,
    getCurrentUser,
    isAuthenticated,
    updateProfile,
    uploadProfilePicture,
    resendVerificationEmail,
    verifyEmail,
    clearError,
    isLoading,
    error,
    user
  };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export { api };
