import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

// Add request interceptor for CORS preflight
api.interceptors.request.use((config) => {
  // Ensure OPTIONS requests are handled properly
  if (config.method === 'options') {
    config.headers['Access-Control-Request-Method'] = 'POST, GET, DELETE, PUT';
    config.headers['Access-Control-Request-Headers'] = 'Content-Type, Authorization';
  }
  return config;
});

// Error handling interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error);
  }
); 