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
    console.log('🔐 Checking authorization...');
    console.log('   Current user:', user);
    console.log('   Required role:', requiredRole);
    console.log('   Is authenticated:', isAuthenticated);

    // If not authenticated, show login modal
    if (!isAuthenticated || !user) {
      console.log('❌ User not authenticated');
      setAuthModal({
        isOpen: true,
        requiredRole: requiredRole,
        actionName: actionName,
      });
      return false;
    }

    // Get user's role
    const userRole = user.role || 'visitor';
    console.log('   User role:', userRole);

    // Check if user has required role/permission
    const hasPermission = canPerformAction(userRole, requiredRole);
    console.log('   Has permission:', hasPermission);

    if (!hasPermission) {
      console.log('❌ User does not have required role:', requiredRole);
      setAuthModal({
        isOpen: true,
        requiredRole: requiredRole,
        actionName: actionName,
      });
      return false;
    }

    console.log('✅ User authorized');
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
