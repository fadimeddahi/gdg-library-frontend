import { authService } from './authService';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Guides Service
 * Handles all guide-related API operations
 */

/**
 * Get all guides with optional filters
 * @param {Object} options - Query options
 * @param {string} options.department - Filter by department ID
 * @param {string} options.search - Search term for title
 * @param {number} options.page - Page number (default: 1)
 * @param {number} options.limit - Items per page (default: 10)
 * @param {string} options.sortBy - Sort field (default: createdAt)
 * @param {string} options.order - Sort order: asc|desc (default: desc)
 * @param {boolean} options.isActive - Filter by active status (default: true)
 * @returns {Promise} { guides: [], pagination: {} }
 */
export const getAllGuides = async (options = {}) => {
  try {
    const params = new URLSearchParams();

    if (options.department) params.append('department', options.department);
    if (options.search) params.append('search', options.search);
    if (options.page) params.append('page', options.page);
    if (options.limit) params.append('limit', options.limit);
    if (options.sortBy) params.append('sortBy', options.sortBy);
    if (options.order) params.append('order', options.order);
    if (options.isActive !== undefined) params.append('isActive', options.isActive);

    const url = `${API_URL}/guides?${params.toString()}`;
    console.log('📚 Fetching guides from:', url);

    const response = await fetch(url);
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch guides');
    }

    return {
      guides: result.data || [],
      pagination: result.pagination || {},
      count: result.count || 0,
    };
  } catch (error) {
    console.error('❌ Guides fetch error:', error);
    throw error;
  }
};

/**
 * Get guides for a specific department
 * @param {string} departmentId - Department MongoDB ID
 * @param {Object} options - Additional query options
 * @returns {Promise} { guides: [], pagination: {} }
 */
export const getGuidesByDepartment = async (departmentId, options = {}) => {
  return getAllGuides({
    department: departmentId,
    page: options.page || 1,
    limit: options.limit || 10,
    sortBy: options.sortBy || 'createdAt',
    order: options.order || 'desc',
    isActive: options.isActive !== undefined ? options.isActive : true,
  });
};

/**
 * Get a single guide by ID
 * @param {string} id - Guide MongoDB ID
 * @returns {Promise} Guide object
 */
export const getGuideById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/guides/${id}`);
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch guide');
    }

    return result.data;
  } catch (error) {
    console.error('❌ Guide fetch error:', error);
    throw error;
  }
};

/**
 * Create a new guide
 * @param {Object} guideData - { department: string, title: string }
 * @returns {Promise} Created guide object
 */
export const createGuide = async (guideData) => {
  try {
    const token = authService.getToken();
    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/guides`, {
      method: 'POST',
      headers,
      body: JSON.stringify(guideData),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to create guide');
    }

    console.log('✅ Guide created:', result.data);
    return result.data;
  } catch (error) {
    console.error('❌ Guide creation error:', error);
    throw error;
  }
};

/**
 * Update an existing guide
 * @param {string} id - Guide MongoDB ID
 * @param {Object} updateData - { title?: string, isActive?: boolean }
 * @returns {Promise} Updated guide object
 */
export const updateGuide = async (id, updateData) => {
  try {
    const token = authService.getToken();
    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/guides/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(updateData),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to update guide');
    }

    console.log('✅ Guide updated:', result.data);
    return result.data;
  } catch (error) {
    console.error('❌ Guide update error:', error);
    throw error;
  }
};

/**
 * Delete a guide
 * @param {string} id - Guide MongoDB ID
 * @returns {Promise} Success message
 */
export const deleteGuide = async (id) => {
  try {
    const token = authService.getToken();
    const headers = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/guides/${id}`, {
      method: 'DELETE',
      headers,
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to delete guide');
    }

    console.log('✅ Guide deleted');
    return result;
  } catch (error) {
    console.error('❌ Guide deletion error:', error);
    throw error;
  }
};

/**
 * Search guides by title
 * @param {string} searchTerm - Search query
 * @param {string} departmentId - Optional department filter
 * @returns {Promise} { guides: [], pagination: {} }
 */
export const searchGuides = async (searchTerm, departmentId = null) => {
  const options = {
    search: searchTerm,
    page: 1,
    limit: 20,
  };

  if (departmentId) {
    options.department = departmentId;
  }

  return getAllGuides(options);
};

export default {
  getAllGuides,
  getGuidesByDepartment,
  getGuideById,
  createGuide,
  updateGuide,
  deleteGuide,
  searchGuides,
};
