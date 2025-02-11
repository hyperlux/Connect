// Force production mode when running on auroville.social
const isProd = import.meta.env.PROD || window.location.hostname === 'auroville.social';

export const environment = {
  production: isProd,
  API_URL: isProd
    ? 'https://api.auroville.social/api'
    : window.location.hostname === 'localhost'
      ? '/api'  // Use relative path to leverage Vite's proxy
      : 'https://api.auroville.social/api',
  FRONTEND_URL: isProd
    ? 'https://auroville.social'
    : window.location.hostname === 'localhost'
      ? 'http://localhost:5174'
      : 'https://auroville.social',
  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || '',
  SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY || ''
};

export const API_URL = environment.API_URL;
export const FRONTEND_URL = environment.FRONTEND_URL;
export const SUPABASE_URL = environment.SUPABASE_URL;
export const SUPABASE_ANON_KEY = environment.SUPABASE_ANON_KEY;
