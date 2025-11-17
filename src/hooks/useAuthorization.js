import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { ROLES, canPerformAction } from '../constants/roles';

/**
 * Custom hook to handle authorization checks
 * Returns a function to check if user can perform an action
 * If not authorized, shows auth modal
 */
export const useAuthorization = () => {
  const { user, isAuthenticated } = useAuth();
  const [authModal, setAuthModal] = useState({
    isOpen: false,
    requiredRole: 'member',
    actionName: 'perform this action',
  });

  /**
   * Check if user is authorized for an action
   * @param {string} requiredRole - Role required (visitor, member, moderator, admin)
   * @param {string} actionName - Name of the action for the modal
   * @returns {boolean} True if authorized, false otherwise
   */
  const checkAuthorization = (requiredRole = 'member', actionName = 'perform this action') => {
    // If not authenticated, show login modal
    if (!isAuthenticated || !user) {
      setAuthModal({
        isOpen: true,
        requiredRole: requiredRole,
        actionName: actionName,
      });
      return false;
    }

    // Get user's role
    const userRole = user.role || 'visitor';

    // Check if user has required role/permission
    const hasPermission = canPerformAction(userRole, requiredRole);

    if (!hasPermission) {
      setAuthModal({
        isOpen: true,
        requiredRole: requiredRole,
        actionName: actionName,
      });
      return false;
    }

    return true;
  };

  const closeAuthModal = () => {
    setAuthModal(prev => ({ ...prev, isOpen: false }));
  };

  return {
    checkAuthorization,
    authModal,
    closeAuthModal,
    user,
    isAuthenticated,
  };
};
