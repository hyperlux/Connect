/// <reference types="vite/client" />

import axios, { AxiosRequestConfig, AxiosError } from 'axios';

// Configure base URL to always use relative path, letting Vite handle proxying
const baseURL = '/api';

// Create axios instance with default config
export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 30000, // Increase timeout for slower connections
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log outgoing requests in development
    if (import.meta.env.MODE === 'development') {
      console.log('Request:', {
        url: config.url,
        method: config.method,
        data: config.data,
        headers: config.headers
      });
    }
    
    return config;
  },
  (error: AxiosError) => {
    console.error('Request error:', error.message);
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response) {
      // Log detailed error information
      console.error('Response error:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
        url: error.config?.url,
        method: error.config?.method,
        requestData: error.config?.data
      });

      // Handle specific error cases
      switch (error.response.status) {
        case 401:
          // Only remove token and redirect if not on login page
          if (!window.location.pathname.includes('/login')) {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }
          break;
        case 403:
          console.error('Access forbidden');
          break;
        case 500:
          console.error('Server error:', error.response.data);
          break;
      }
    } else if (error.request) {
      console.error('Network error - no response received:', {
        request: error.request,
        url: error.config?.url,
        method: error.config?.method
      });
    } else {
      console.error('Error:', error.message);
    }

    return Promise.reject(error);
  }
);

// Helper function to make authenticated requests
export const withAuth = (token: string) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  };

  return {
    get: <T>(url: string) => api.get<T>(url, config),
    post: <T>(url: string, data?: any) => api.post<T>(url, data, config),
    put: <T>(url: string, data?: any) => api.put<T>(url, data, config),
    delete: <T>(url: string) => api.delete<T>(url, config),
  };
}; 

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  try {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    
    // Store the token
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('Login error:', error.message);
      throw error;
    }
    throw new Error('An unexpected error occurred during login');
  }
}
