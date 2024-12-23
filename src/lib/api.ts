/// <reference types="vite/client" />

import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { getFromCacheWithExpiry, saveToCache } from './cache';
import { API_URL } from './environment';

// Create axios instance with default config
export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
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

// Add request interceptor to include auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

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
      // Request made but no response received
      return Promise.reject(new Error('No response from server. Please try again.'));
    } else {
      // Error in request configuration
      return Promise.reject(new Error('Request failed. Please try again.'));
    }

    return Promise.reject(error);
  }
);

export interface CacheConfig {
  enabled: boolean;
  duration?: number; // Duration in milliseconds
  key?: string; // Custom cache key
}

const DEFAULT_CACHE_DURATION = 3600000; // 1 hour

// Helper function to generate cache key
const generateCacheKey = (url: string, params?: any): string => {
  const queryString = params ? `?${new URLSearchParams(params).toString()}` : '';
  return `api:${url}${queryString}`;
};

interface CachedResponse<T> {
  data: T;
  fromCache: boolean;
}

// Helper function to make authenticated and cached requests
export const withCache = (token: string) => {
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  };

  return {
    get: async <T>(
      url: string, 
      params?: any, 
      cacheConfig: CacheConfig = { enabled: false }
    ): Promise<CachedResponse<T>> => {
      if (cacheConfig.enabled) {
        const cacheKey = cacheConfig.key || generateCacheKey(url, params);
        const cacheDuration = cacheConfig.duration || DEFAULT_CACHE_DURATION;
        
        // Try to get from cache first
        const cachedData = getFromCacheWithExpiry<T>(cacheKey, cacheDuration);
        if (cachedData) {
          return { data: cachedData, fromCache: true };
        }

        // If not in cache or expired, fetch fresh data
        const response = await api.get<T>(url, { ...config, params });
        saveToCache(cacheKey, response.data);
        return { data: response.data, fromCache: false };
      }
      
      // If caching is disabled, just make the request
      const response = await api.get<T>(url, { ...config, params });
      return { data: response.data, fromCache: false };
    },
    post: <T>(url: string, data?: any) => api.post<T>(url, data, config),
    put: <T>(url: string, data?: any) => api.put<T>(url, data, config),
    delete: <T>(url: string) => api.delete<T>(url, config),
  };
};

// Helper function to make authenticated requests without caching
export const withAuth = (token: string) => {
  return withCache(token);
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
