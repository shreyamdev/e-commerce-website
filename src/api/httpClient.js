const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

let inMemoryAccessToken = localStorage.getItem('hyped_access_token') || null;
let onUnauthorizedCallback = null;

export const setAuthToken = (token) => {
  inMemoryAccessToken = token || null;
  if (token) localStorage.setItem('hyped_access_token', token);
  else localStorage.removeItem('hyped_access_token');
};

export const getAuthToken = () => inMemoryAccessToken;

export const setOnUnauthorizedCallback = (callback) => {
  onUnauthorizedCallback = callback;
};

const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    if (response.status === 401 && onUnauthorizedCallback) {
      onUnauthorizedCallback();
    }
    const message = data?.message || response.statusText || 'Request failed';
    const error = new Error(message);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

export const httpClient = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const token = getAuthToken();
  if (token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, { ...options, headers });
  return handleResponse(response);
};

export const api = {
  get: (endpoint, options = {}) => httpClient(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options = {}) => httpClient(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(body)
  }),
  put: (endpoint, body, options = {}) => httpClient(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(body)
  }),
  patch: (endpoint, body, options = {}) => httpClient(endpoint, {
    ...options,
    method: 'PATCH',
    body: JSON.stringify(body)
  }),
  delete: (endpoint, options = {}) => httpClient(endpoint, { ...options, method: 'DELETE' })
};
