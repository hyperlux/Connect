const API_URL = import.meta.env.VITE_API_URL || 'https://api.auroville.social';

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

    if (!response.ok) {
      console.error('❌ Response not OK:', {
        status: response.status,
        statusText: response.statusText
      });
      const errorData = await response.json().catch(() => ({ 
        message: response.statusText || 'Request failed' 
      }));
      throw new Error(errorData.message || 'Request failed');
    }

    const data = await response.json();
    console.log('✅ API response data:', data);
    return data;
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