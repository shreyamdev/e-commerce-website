/**
 * src/context/AuthContext.jsx
 * Production Authentication & Authorization Context Provider
 */

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api, setAuthToken, setOnUnauthorizedCallback } from '../api/httpClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('hyped_access_token') || null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  /**
   * Complete Session Teardown
   */
  const logout = useCallback(() => {
    try {
      const refreshToken = localStorage.getItem('hyped_refresh_token');
      if (refreshToken) {
        // Best-effort server-side session invalidation
        api.post('/auth/logout', { refreshToken }).catch(() => {});
      }
    } finally {
      setUser(null);
      setToken(null);
      setAuthToken(null);
      localStorage.removeItem('hyped_access_token');
      localStorage.removeItem('hyped_refresh_token');
      localStorage.removeItem('hyped_user_session');
      setIsLoading(false);
    }
  }, []);

  // Bind interceptor 401 failure directly to context logout
  useEffect(() => {
    setOnUnauthorizedCallback(logout);
  }, [logout]);

  /**
   * Session Hydration on Initial App Load
   */
  const checkAuthStatus = useCallback(async () => {
    setIsLoading(true);
    setAuthError(null);

    const storedToken = localStorage.getItem('hyped_access_token');
    const storedUser = localStorage.getItem('hyped_user_session');

    if (!storedToken) {
      setIsLoading(false);
      return;
    }

    try {
      setAuthToken(storedToken);
      // Validate session with backend user profile endpoint
      const remoteUser = await api.get('/auth/me');
      setUser(remoteUser);
      localStorage.setItem('hyped_user_session', JSON.stringify(remoteUser));
    } catch (err) {
      console.warn('Initial session check failed, falling back to cached session or refresh:', err);
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch {
          logout();
        }
      } else {
        logout();
      }
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  /**
   * User Authentication: Login
   */
  const login = async (credentials) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const response = await api.post('/auth/login', credentials);
      const accessToken = response.accessToken || response.token;
      const refreshToken = response.refreshToken;
      const userData = response.user;

      if (!accessToken || !userData) {
        throw new Error('Malformed authentication payload received from server');
      }

      // Commit credentials
      setToken(accessToken);
      setAuthToken(accessToken);
      setUser(userData);

      if (refreshToken) {
        localStorage.setItem('hyped_refresh_token', refreshToken);
      }
      localStorage.setItem('hyped_user_session', JSON.stringify(userData));

      return { success: true, user: userData };
    } catch (error) {
      const message = error.data?.message || error.message || 'Invalid email or password';
      setAuthError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * User Registration: Register
   */
  const register = async (userData) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const response = await api.post('/auth/register', userData);
      const accessToken = response.accessToken || response.token;
      const refreshToken = response.refreshToken;
      const newUser = response.user;

      if (accessToken && newUser) {
        setToken(accessToken);
        setAuthToken(accessToken);
        setUser(newUser);
        if (refreshToken) {
          localStorage.setItem('hyped_refresh_token', refreshToken);
        }
        localStorage.setItem('hyped_user_session', JSON.stringify(newUser));
      }

      return { success: true, user: newUser };
    } catch (error) {
      const message = error.data?.message || error.message || 'Registration failed';
      setAuthError(message);
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Role-Based Access Control (RBAC) Helpers
   */
  const hasRole = useCallback((requiredRole) => {
    if (!user) return false;
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user.role);
    }
    return user.role === requiredRole;
  }, [user]);

  const hasPermission = useCallback((permission) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        authError,
        setAuthError,
        login,
        register,
        logout,
        checkAuthStatus,
        hasRole,
        hasPermission
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be consumed within an <AuthProvider>');
  }
  return context;
};