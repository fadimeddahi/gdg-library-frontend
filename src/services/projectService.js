import { authService } from './authService';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Projects Service
 * Handles all project-related API operations
 */

/**
 * Get all projects with optional filters
 * @param {Object} options - Query options
 * @param {string} options.department - Filter by department ID
 * @param {string} options.search - Search term for title
 * @param {number} options.page - Page number (default: 1)
 * @param {number} options.limit - Items per page (default: 10)
 * @param {string} options.sortBy - Sort field (default: createdAt)
 * @param {string} options.order - Sort order: asc|desc (default: desc)
 * @param {boolean} options.isActive - Filter by active status (default: true)
 * @returns {Promise} { projects: [], pagination: {} }
 */
export const getAllProjects = async (options = {}) => {
  try {
    const params = new URLSearchParams();

    if (options.department) params.append('department', options.department);
    if (options.search) params.append('search', options.search);
    if (options.page) params.append('page', options.page);
    if (options.limit) params.append('limit', options.limit);
    if (options.sortBy) params.append('sortBy', options.sortBy);
    if (options.order) params.append('order', options.order);
    if (options.isActive !== undefined) params.append('isActive', options.isActive);

    const url = `${API_URL}/projects?${params.toString()}`;

    const response = await fetch(url);
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch projects');
    }

    return {
      projects: result.data || [],
      pagination: result.pagination || {},
      count: result.count || 0,
    };
  } catch (error) {
    console.error('❌ Projects fetch error:', error);
    throw error;
  }
};

/**
 * Get projects for a specific department
 * @param {string} departmentId - Department MongoDB ID
 * @param {Object} options - Additional query options
 * @returns {Promise} { projects: [], pagination: {} }
 */
export const getProjectsByDepartment = async (departmentId, options = {}) => {
  return getAllProjects({
    department: departmentId,
    page: options.page || 1,
    limit: options.limit || 10,
    sortBy: options.sortBy || 'createdAt',
    order: options.order || 'desc',
    isActive: options.isActive !== undefined ? options.isActive : true,
  });
};

/**
 * Get a single project by ID
 * @param {string} id - Project MongoDB ID
 * @returns {Promise} Project object
 */
export const getProjectById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/projects/${id}`);
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch project');
    }

    return result.data;
  } catch (error) {
    console.error('❌ Project fetch error:', error);
    throw error;
  }
};

/**
 * Create a new project
 * @param {Object} projectData - { department: string, title: string }
 * @returns {Promise} Created project object
 */
export const createProject = async (projectData) => {
  try {
    const token = authService.getToken();
    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/projects`, {
      method: 'POST',
      headers,
      body: JSON.stringify(projectData),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to create project');
    }

    return result.data;
  } catch (error) {
    console.error('Project creation error:', error);
    throw error;
  }
};

/**
 * Update an existing project
 * @param {string} id - Project MongoDB ID
 * @param {Object} updateData - { title?: string, isActive?: boolean }
 * @returns {Promise} Updated project object
 */
export const updateProject = async (id, updateData) => {
  try {
    const token = authService.getToken();
    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(updateData),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to update project');
    }

    return result.data;
  } catch (error) {
    console.error('❌ Project update error:', error);
    throw error;
  }
};

/**
 * Delete a project
 * @param {string} id - Project MongoDB ID
 * @returns {Promise} Success message
 */
export const deleteProject = async (id) => {
  try {
    const token = authService.getToken();
    const headers = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/projects/${id}`, {
      method: 'DELETE',
      headers,
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to delete project');
    }

    return result;
  } catch (error) {
    console.error('❌ Project deletion error:', error);
    throw error;
  }
};

/**
 * Search projects by title
 * @param {string} searchTerm - Search query
 * @param {string} departmentId - Optional department filter
 * @returns {Promise} { projects: [], pagination: {} }
 */
export const searchProjects = async (searchTerm, departmentId = null) => {
  const options = {
    search: searchTerm,
    page: 1,
    limit: 20,
  };

  if (departmentId) {
    options.department = departmentId;
  }

  return getAllProjects(options);
};

export default {
  getAllProjects,
  getProjectsByDepartment,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  searchProjects,
};
