import { useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { AuthContext } from './authContextCreate';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on app load
  useEffect(() => {
    const initAuth = () => {
      const token = authService.getToken();
      if (token) {
        // TODO: You can decode JWT token to get user info
        // For now, we'll store user data from login/signup response
        const userData = localStorage.getItem('user');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const response = await authService.login(email, password);
    // Handle nested response structure: response.data.user and response.data.token
    const userData = response.data?.user || response.user;
    const token = response.data?.token || response.token;
    
    if (userData) {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    }
    if (token) {
      localStorage.setItem('token', token);
    }
    return response;
  };

  const signup = async (email, password) => {
    const response = await authService.register(email, password);
    // Handle nested response structure: response.data.user and response.data.token
    const userData = response.data?.user || response.user;
    const token = response.data?.token || response.token;
    
    if (userData) {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    }
    if (token) {
      localStorage.setItem('token', token);
    }
    return response;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
