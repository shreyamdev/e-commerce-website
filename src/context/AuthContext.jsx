import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api, setAuthToken, setOnUnauthorizedCallback } from '../api/httpClient';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('hyped_user_session');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('hyped_access_token') || null);
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    setAuthToken(null);
    localStorage.removeItem('hyped_access_token');
    localStorage.removeItem('hyped_user_session');
    localStorage.removeItem('hyped_refresh_token');
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setOnUnauthorizedCallback(logout);
  }, [logout]);

  const checkAuthStatus = useCallback(async () => {
    const storedToken = localStorage.getItem('hyped_access_token');
    if (!storedToken) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setAuthToken(storedToken);

    try {
      const response = await api.get('/users/profile');
      const remoteUser = response.user || response;
      setToken(storedToken);
      setUser(remoteUser);
      localStorage.setItem('hyped_user_session', JSON.stringify(remoteUser));
    } catch (error) {
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = async (credentials) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      const response = await api.post('/auth/login', credentials);
      const accessToken = response.token || response.accessToken;
      const userData = response.user;

      if (!accessToken || !userData) {
        throw new Error('Invalid login response from server');
      }

      setToken(accessToken);
      setAuthToken(accessToken);
      setUser(userData);
      localStorage.setItem('hyped_access_token', accessToken);
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

  const register = async (userData) => {
    setIsLoading(true);
    setAuthError(null);
    try {
      await api.post('/auth/register', userData);
      return await login({ email: userData.email, password: userData.password });
    } catch (error) {
      const message = error.data?.message || error.message || 'Registration failed';
      setAuthError(message);
      setIsLoading(false);
      return { success: false, error: message };
    }
  };

  const hasRole = useCallback((requiredRole) => {
    if (!user) return false;
    return Array.isArray(requiredRole)
      ? requiredRole.includes(user.role)
      : user.role === requiredRole;
  }, [user]);

  const hasPermission = useCallback((permission) => {
    return Boolean(user?.permissions?.includes(permission));
  }, [user]);

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: Boolean(user && token),
      isLoading,
      authError,
      setAuthError,
      login,
      register,
      logout,
      checkAuthStatus,
      hasRole,
      hasPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be consumed within an <AuthProvider>');
  return context;
};
