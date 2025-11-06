// Role and permission definitions for GDG Resource Hub

export const ROLES = {
  VISITOR: {
    id: 'visitor',
    name: 'Visitor',
    level: 1,
    permissions: {
      canView: true,
      canDownload: false,
      canUpload: false,
      canEdit: false,
      canDelete: false,
      canManageMembers: false,
    },
  },
  MEMBER: {
    id: 'member',
    name: 'Member',
    level: 2,
    permissions: {
      canView: true,
      canDownload: true,
      canUpload: true,
      canEdit: false,
      canDelete: false,
      canManageMembers: false,
    },
  },
  CO_MANAGER: {
    id: 'co_manager',
    name: 'Co-Manager',
    level: 3,
    permissions: {
      canView: true,
      canDownload: true,
      canUpload: true,
      canEdit: true,
      canDelete: true,
      canManageMembers: false,
    },
  },
  ADMIN: {
    id: 'admin',
    name: 'Admin',
    level: 4,
    permissions: {
      canView: true,
      canDownload: true,
      canUpload: true,
      canEdit: true,
      canDelete: true,
      canManageMembers: true,
    },
  },
};

// Helper to get role list as array
export const ROLE_LIST = Object.values(ROLES);

// Helper to get role by id
export const getRoleById = (id) => {
  return ROLE_LIST.find(role => role.id === id);
};

// Helper to check if user has permission
export const hasPermission = (roleId, permissionName) => {
  const role = getRoleById(roleId);
  return role?.permissions[permissionName] || false;
};

// Helper to check if role can perform action
export const canPerformAction = (userRole, requiredRole) => {
  const user = getRoleById(userRole);
  const required = getRoleById(requiredRole);
  return user && required && user.level >= required.level;
};
