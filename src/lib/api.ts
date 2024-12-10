/// <reference types="vite/client" />

// Type declarations for environment variables
declare global {
  interface ImportMetaEnv {
    readonly VITE_API_URL: string
    readonly VITE_APP_URL: string
    // Add other env variables as needed
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}

import axios, { AxiosRequestConfig, AxiosError } from 'axios';

// Use relative URLs for API requests
const baseURL = '/api';

// Create axios instance with default config
export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 30000,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log outgoing requests in development
    if (process.env.NODE_ENV === 'development') {
      console.log('API Request:', {
        url: `${config.baseURL}${config.url}`,
        method: config.method,
        data: config.data
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
      console.error('API Response error:', {
        status: error.response.status,
        data: error.response.data,
        url: `${error.config?.baseURL}${error.config?.url}`,
        method: error.config?.method,
        requestData: error.config?.data
      });

      // Handle specific error cases
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token');
          if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login';
          }
          break;
        case 403:
          console.error('Access forbidden');
          break;
        case 404:
          console.error('API endpoint not found');
          break;
        case 500:
          console.error('Server error:', error.response.data);
          break;
      }
    } else if (error.request) {
      console.error('Network error - no response received:', {
        url: `${error.config?.baseURL}${error.config?.url}`,
        method: error.config?.method
      });
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