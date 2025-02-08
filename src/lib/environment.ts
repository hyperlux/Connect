// Force production mode when running on auroville.social
const isProd = import.meta.env.PROD || window.location.hostname === 'auroville.social';

export const environment = {
  production: isProd,
  API_URL: isProd
    ? 'https://api.auroville.social/api'
    : window.location.hostname === 'localhost'
      ? '/api'  // Use relative path to leverage Vite's proxy
      : 'http://64.227.152.147/api',  // Development server IP
  FRONTEND_URL: isProd
    ? 'https://auroville.social'
    : window.location.hostname === 'localhost'
      ? 'http://localhost:5174'
      : 'https://auroville.social'
};

export const API_URL = environment.API_URL;
export const FRONTEND_URL = environment.FRONTEND_URL;
