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

import axios, { AxiosRequestConfig } from 'axios';

const baseURL = process.env.NODE_ENV === 'production' 
  ? 'https://api.auroville.social'
  : 'http://localhost:3000';

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
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
  };

  return {
    get: <T>(url: string) => api.get<T>(url, config),
    post: <T>(url: string, data?: any) => api.post<T>(url, data, config),
    put: <T>(url: string, data?: any) => api.put<T>(url, data, config),
    delete: <T>(url: string) => api.delete<T>(url, config),
  };
}; 