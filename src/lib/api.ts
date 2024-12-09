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

// In production, we use relative URLs since we're proxying through nginx
const baseURL = process.env.NODE_ENV === 'production' 
  ? 'https://auroville.social/api'
  : 'http://localhost:3000';

// Create axios instance with default config
export const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 10000,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
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
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response error:', {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });

      // Handle specific error cases
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 403:
          console.error('Access forbidden');
          break;
        case 500:
          console.error('Server error');
          break;
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network error - no response received:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error:', error.message);
    }

    // Add error context for better debugging
    const enhancedError = {
      ...error,
      context: {
        url: error.config?.url,
        method: error.config?.method,
        timestamp: new Date().toISOString(),
      },
    };

    return Promise.reject(enhancedError);
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