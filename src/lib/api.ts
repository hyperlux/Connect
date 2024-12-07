const API_URL = import.meta.env.VITE_API_URL || '/api';

async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...options.headers,
  };

  console.log('Making API request:', {
    url,
    method: options.method,
    headers,
    body: options.body
  });

  try {
    const response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
      mode: 'cors'
    });

    console.log('API response:', {
      status: response.status,
      statusText: response.statusText
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Request failed' }));
      throw new Error(errorData.message || 'Request failed');
    }

    const data = await response.json();
    console.log('API response data:', data);
    return data;
  } catch (error) {
    console.error('API request failed:', error);
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