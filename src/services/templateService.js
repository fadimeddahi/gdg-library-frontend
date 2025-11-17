import { authService } from './authService';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Templates Service
 * Handles all template-related API operations
 */

/**
 * Get all templates with optional filters
 * @param {Object} options - Query options
 * @param {string} options.department - Filter by department ID
 * @param {string} options.search - Search term for title
 * @param {number} options.page - Page number (default: 1)
 * @param {number} options.limit - Items per page (default: 10)
 * @param {string} options.sortBy - Sort field (default: createdAt)
 * @param {string} options.order - Sort order: asc|desc (default: desc)
 * @param {boolean} options.isActive - Filter by active status (default: true)
 * @returns {Promise} { templates: [], pagination: {} }
 */
export const getAllTemplates = async (options = {}) => {
  try {
    const params = new URLSearchParams();

    if (options.department) params.append('department', options.department);
    if (options.search) params.append('search', options.search);
    if (options.page) params.append('page', options.page);
    if (options.limit) params.append('limit', options.limit);
    if (options.sortBy) params.append('sortBy', options.sortBy);
    if (options.order) params.append('order', options.order);
    if (options.isActive !== undefined) params.append('isActive', options.isActive);

    const url = `${API_URL}/templates?${params.toString()}`;

    const response = await fetch(url);
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch templates');
    }

    return {
      templates: result.data || [],
      pagination: result.pagination || {},
      count: result.count || 0,
    };
  } catch (error) {
    console.error('❌ Templates fetch error:', error);
    throw error;
  }
};

/**
 * Get templates for a specific department
 * @param {string} departmentId - Department MongoDB ID
 * @param {Object} options - Additional query options
 * @returns {Promise} { templates: [], pagination: {} }
 */
export const getTemplatesByDepartment = async (departmentId, options = {}) => {
  return getAllTemplates({
    department: departmentId,
    page: options.page || 1,
    limit: options.limit || 10,
    sortBy: options.sortBy || 'createdAt',
    order: options.order || 'desc',
    isActive: options.isActive !== undefined ? options.isActive : true,
  });
};

/**
 * Get a single template by ID
 * @param {string} id - Template MongoDB ID
 * @returns {Promise} Template object
 */
export const getTemplateById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/templates/${id}`);
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch template');
    }

    return result.data;
  } catch (error) {
    console.error('❌ Template fetch error:', error);
    throw error;
  }
};

/**
 * Create a new template
 * @param {Object} templateData - { department: string, title: string }
 * @returns {Promise} Created template object
 */
export const createTemplate = async (templateData) => {
  try {
    const token = authService.getToken();
    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/templates`, {
      method: 'POST',
      headers,
      body: JSON.stringify(templateData),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to create template');
    }

    return result.data;
  } catch (error) {
    console.error('❌ Template creation error:', error);
    throw error;
  }
};

/**
 * Update an existing template
 * @param {string} id - Template MongoDB ID
 * @param {Object} updateData - { title?: string, isActive?: boolean }
 * @returns {Promise} Updated template object
 */
export const updateTemplate = async (id, updateData) => {
  try {
    const token = authService.getToken();
    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/templates/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(updateData),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to update template');
    }

    return result.data;
  } catch (error) {
    console.error('❌ Template update error:', error);
    throw error;
  }
};

/**
 * Delete a template
 * @param {string} id - Template MongoDB ID
 * @returns {Promise} Success message
 */
export const deleteTemplate = async (id) => {
  try {
    const token = authService.getToken();
    const headers = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/templates/${id}`, {
      method: 'DELETE',
      headers,
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to delete template');
    }

    return result;
  } catch (error) {
    console.error('❌ Template deletion error:', error);
    throw error;
  }
};

/**
 * Search templates by title
 * @param {string} searchTerm - Search query
 * @param {string} departmentId - Optional department filter
 * @returns {Promise} { templates: [], pagination: {} }
 */
export const searchTemplates = async (searchTerm, departmentId = null) => {
  const options = {
    search: searchTerm,
    page: 1,
    limit: 20,
  };

  if (departmentId) {
    options.department = departmentId;
  }

  return getAllTemplates(options);
};

export default {
  getAllTemplates,
  getTemplatesByDepartment,
  getTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  searchTemplates,
};
