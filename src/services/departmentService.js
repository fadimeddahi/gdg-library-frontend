const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

/**
 * Get auth token from localStorage
 */
const getAuthToken = () => {
  const token = localStorage.getItem('token');
  return token;
};

/**
 * Department Service
 */
export const departmentService = {
  /**
   * Get all departments
   * @returns {Promise<Array>} List of departments
   */
  getAllDepartments: async () => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE_URL}/departments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch departments`);
      }

      const result = await response.json();
      
      // Backend returns: { success: true, count: 7, data: [...] }
      return result.data || [];
    } catch (error) {
      console.error('Error fetching departments:', error);
      throw error;
    }
  },

  /**
   * Get single department by slug
   * @param {string} slug - Department slug (e.g., 'design', 'dev')
   * @returns {Promise<object>} Department details
   */
  getDepartmentBySlug: async (slug) => {
    try {
      const token = getAuthToken();
      
      const response = await fetch(`${API_BASE_URL}/departments/${slug}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch department`);
      }

      const result = await response.json();
      return result.data || null;
    } catch (error) {
      console.error('Error fetching department:', error);
      throw error;
    }
  },
};
