/**
 * src/api/httpClient.js
 * Interceptor-Driven HTTP Client with Silent Token Refresh & Request Queueing
 */

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';

// Internal in-memory token state (fast & XSS-defensive)
let inMemoryAccessToken = localStorage.getItem('hyped_access_token') || null;
let isRefreshing = false;
let failedQueue = [];

// Global callback triggered when refresh fails and full logout is mandatory
let onUnauthorizedCallback = null;

export const setAuthToken = (token) => {
  inMemoryAccessToken = token;
  if (token) {
    localStorage.setItem('hyped_access_token', token);
  } else {
    localStorage.removeItem('hyped_access_token');
  }
};

export const getAuthToken = () => inMemoryAccessToken;

export const setOnUnauthorizedCallback = (callback) => {
  onUnauthorizedCallback = callback;
};

// Process queued requests that were paused during active token refresh
const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

/**
 * Core HTTP Request Execution with Request & Response Interceptors
 */
export const httpClient = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  // 1. REQUEST INTERCEPTOR: Inject headers and Bearer token
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const token = getAuthToken();
  if (token && !headers['Authorization']) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers
  };

  try {
    const response = await fetch(url, config);

    // 2. RESPONSE INTERCEPTOR: Handle HTTP 401 Unauthorized
    if (response.status === 401 && !options._retry && endpoint !== '/auth/login' && endpoint !== '/auth/refresh') {
      if (isRefreshing) {
        // Enqueue subsequent failed requests until current refresh settles
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((newToken) => {
            config.headers['Authorization'] = `Bearer ${newToken}`;
            return fetch(url, config).then(res => res.json());
          })
          .catch((err) => Promise.reject(err));
      }

      options._retry = true;
      isRefreshing = true;

      const refreshTokenValue = localStorage.getItem('hyped_refresh_token');

      if (!refreshTokenValue) {
        isRefreshing = false;
        if (onUnauthorizedCallback) onUnauthorizedCallback();
        return Promise.reject(new Error('Session expired. Please log in again.'));
      }

      try {
        // Execute silent token refresh
        const refreshResponse = await fetch(`${BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken: refreshTokenValue })
        });

        if (!refreshResponse.ok) {
          throw new Error('Refresh token invalid');
        }

        const refreshData = await refreshResponse.json();
        const newAccessToken = refreshData.accessToken || refreshData.token;
        const newRefreshToken = refreshData.refreshToken;

        setAuthToken(newAccessToken);
        if (newRefreshToken) {
          localStorage.setItem('hyped_refresh_token', newRefreshToken);
        }

        processQueue(null, newAccessToken);
        isRefreshing = false;

        // Replay original request with fresh token
        config.headers['Authorization'] = `Bearer ${newAccessToken}`;
        const replayedResponse = await fetch(url, config);
        return handleResponse(replayedResponse);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;
        setAuthToken(null);
        localStorage.removeItem('hyped_refresh_token');
        if (onUnauthorizedCallback) onUnauthorizedCallback();
        return Promise.reject(refreshError);
      }
    }

    return handleResponse(response);
  } catch (networkError) {
    return Promise.reject(networkError);
  }
};

/**
 * Standardize API responses and error parsing
 */
const handleResponse = async (response) => {
  const isJson = response.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const error = new Error(data?.message || response.statusText || 'Request failed');
    error.status = response.status;
    error.data = data;
    return Promise.reject(error);
  }

  return data;
};

// Convenience REST Verb Wrappers
export const api = {
  get: (endpoint, options = {}) => httpClient(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options = {}) => httpClient(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body, options = {}) => httpClient(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  patch: (endpoint, body, options = {}) => httpClient(endpoint, { ...options, method: 'PATCH', body: JSON.stringify(body) }),
  delete: (endpoint, options = {}) => httpClient(endpoint, { ...options, method: 'DELETE' })
};