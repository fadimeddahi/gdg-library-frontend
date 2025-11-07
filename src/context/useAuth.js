import { useContext } from 'react';
import { AuthContext } from './authContextCreate';

/**
 * Custom hook to use auth context
 * @returns {Object} Auth context with user, loading, login, signup, logout, isAuthenticated
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default useAuth;
