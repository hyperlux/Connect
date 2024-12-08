/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

const API_URL = import.meta.env.VITE_API_URL || 'https://api.auroville.social';

interface ApiError {
  message: string;
  status?: number;
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error: ApiError = {
      message: errorData.message || 'An error occurred',
      status: response.status
    };
    throw error;
  }
  return response.json();
}

async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Origin': 'https://auroville.social',
    ...options.headers,
  };

  console.log('🚀 Making API request:', {
    url,
    method: options.method,
    headers,
    body: options.body,
    mode: 'cors',
    credentials: 'include'
  });

  try {
    console.log('⏳ Sending fetch request...');
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
      mode: 'cors'
    });

    console.log('📥 Response received:', {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      headers: {
        'content-type': response.headers.get('content-type'),
        'access-control-allow-origin': response.headers.get('access-control-allow-origin'),
        'access-control-allow-credentials': response.headers.get('access-control-allow-credentials'),
        'access-control-allow-methods': response.headers.get('access-control-allow-methods'),
        'access-control-allow-headers': response.headers.get('access-control-allow-headers')
      }
    });

    return await handleResponse(response);
  } catch (error) {
    console.error('🔥 API request failed:', {
      error,
      type: error instanceof Error ? error.constructor.name : typeof error,
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    throw error;
  }
}

// API object with common methods
export const api = {
  get: (endpoint: string, options: RequestInit = {}) => 
    apiRequest(endpoint, { ...options, method: 'GET' }),
  
  post: (endpoint: string, data: any, options: RequestInit = {}) =>
    apiRequest(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    }),
  
  put: (endpoint: string, data: any, options: RequestInit = {}) =>
    apiRequest(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  
  delete: (endpoint: string, options: RequestInit = {}) =>
    apiRequest(endpoint, { ...options, method: 'DELETE' }),

  // Helper to add auth token to requests
  withAuth: (token: string) => ({
    get: (endpoint: string, options: RequestInit = {}) =>
      apiRequest(endpoint, {
        ...options,
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${token}`,
        },
      }),

    post: (endpoint: string, data: any, options: RequestInit = {}) =>
      apiRequest(endpoint, {
        ...options,
        method: 'POST',
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }),

    put: (endpoint: string, data: any, options: RequestInit = {}) =>
      apiRequest(endpoint, {
        ...options,
        method: 'PUT',
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }),

    delete: (endpoint: string, options: RequestInit = {}) =>
      apiRequest(endpoint, {
        ...options,
        method: 'DELETE',
        headers: {
          ...options.headers,
          'Authorization': `Bearer ${token}`,
        },
      }),
  })
}; 