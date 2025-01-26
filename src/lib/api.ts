import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is due to an unauthorized request and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const token = localStorage.getItem('token');
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/refresh-token`, { token });
        
        const { token: newToken, user } = response.data;

        // Update stored token and user
        localStorage.setItem('token', newToken);
        localStorage.setItem('user', JSON.stringify(user));

        // Update the authorization header
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

        // Retry the original request with the new token
        return axios(originalRequest);
      } catch (refreshError) {
        // If refresh fails, logout the user
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

// Simple caching mechanism for API calls
export const withCache = (token?: string) => {
  const cache: Record<string, { data: any, timestamp: number }> = {};

  const cachedGet = async <T>(
    url: string, 
    config?: any, 
    cacheOptions?: { 
      enabled?: boolean, 
      duration?: number, 
      key?: string 
    }
  ) => {
    const { 
      enabled = false, 
      duration = 5 * 60 * 1000, // default 5 minutes
      key = url 
    } = cacheOptions || {};

    if (enabled) {
      const cachedResponse = cache[key];
      const now = Date.now();

      if (cachedResponse && (now - cachedResponse.timestamp) < duration) {
        return { 
          data: cachedResponse.data, 
          fromCache: true 
        };
      }
    }

    try {
      const response = await api.get<T>(url, {
        ...config,
        headers: {
          ...config?.headers,
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });

      if (enabled) {
        cache[key] = {
          data: response.data,
          timestamp: Date.now()
        };
      }

      return { 
        data: response.data, 
        fromCache: false 
      };
    } catch (error) {
      throw error;
    }
  };

  return {
    get: cachedGet,
    // You can extend this with other methods like post, put, delete if needed
  };
};
