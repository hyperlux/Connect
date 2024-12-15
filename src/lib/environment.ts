// Environment variables with fallbacks
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
export const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL || 'http://localhost:5173';

// For debugging
console.log('API_URL:', API_URL);
console.log('FRONTEND_URL:', FRONTEND_URL);
