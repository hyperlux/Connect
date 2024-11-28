const API_URL = 'http://localhost:5000';

async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
    mode: 'cors'
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(errorData.message || 'Request failed');
  }

  return response.json();
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
  }),
}; 