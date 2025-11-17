const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

/**
 * Get auth token from localStorage
 */
const getAuthToken = () => {
  const token = localStorage.getItem('token');
  return token;
};

/**
 * Resource Service
 * Handles file/resource operations with filtering and pagination
 */
export const resourceService = {
  /**
   * Get all resources with filtering and pagination
   * @param {object} options - Query options
   * @param {string} options.department - Filter by department ID
   * @param {string} options.folder - Filter by folder ID
   * @param {string} options.type - 'file' | 'link' | 'all'
   * @param {string} options.search - Text search query
   * @param {string} options.tags - Comma-separated tags
   * @param {number} options.page - Page number (default: 1)
   * @param {number} options.limit - Items per page (default: 20)
   * @param {string} options.sortBy - Sort field: createdAt | title | views | downloads
   * @param {string} options.order - Sort order: asc | desc
   * @param {boolean} options.isActive - Filter active resources
   * @returns {Promise<object>} Resources with pagination info
   */
  getAllResources: async (options = {}) => {
    try {
      const token = getAuthToken();
      
      // Build query params
      const queryParams = new URLSearchParams();
      if (options.department) queryParams.append('department', options.department);
      if (options.folder) queryParams.append('folder', options.folder);
      if (options.type && options.type !== 'all') queryParams.append('type', options.type);
      if (options.search) queryParams.append('search', options.search);
      if (options.tags) queryParams.append('tags', options.tags);
      if (options.page) queryParams.append('page', options.page);
      if (options.limit) queryParams.append('limit', options.limit);
      if (options.sortBy) queryParams.append('sortBy', options.sortBy);
      if (options.order) queryParams.append('order', options.order);
      if (options.isActive !== undefined) queryParams.append('isActive', options.isActive);

      const url = `${API_BASE_URL}/resources?${queryParams}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`HTTP ${response.status}: ${errorData.message || 'Failed to fetch resources'}`);
      }

      const result = await response.json();
      
      // Backend returns: { success: true, count: 20, data: [...], pagination: {...} }
      return {
        resources: result.data || [],
        pagination: result.pagination || null,
        count: result.count || 0,
      };
    } catch (error) {
      console.error('Error fetching resources:', error);
      throw error;
    }
  },

  /**
   * Get resources for a specific department by slug
   * @param {string} departmentSlug - Department slug (e.g., 'design', 'dev')
   * @param {object} options - Additional query options
   * @returns {Promise<object>} Resources with pagination
   */
  getDepartmentResources: async (departmentSlug, options = {}) => {
    try {
      const token = getAuthToken();
      
      // Build query params
      const queryParams = new URLSearchParams();
      if (options.search) queryParams.append('search', options.search);
      if (options.type && options.type !== 'all') queryParams.append('type', options.type);
      if (options.tags) queryParams.append('tags', options.tags);
      if (options.page) queryParams.append('page', options.page);
      if (options.limit) queryParams.append('limit', options.limit);
      if (options.sortBy) queryParams.append('sortBy', options.sortBy);
      if (options.order) queryParams.append('order', options.order);
      if (options.isActive !== undefined) queryParams.append('isActive', options.isActive);

      const url = `${API_BASE_URL}/departments/${departmentSlug}/resources?${queryParams}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`HTTP ${response.status}: ${errorData.message || 'Failed to fetch resources'}`);
      }

      const result = await response.json();
      
      // Backend returns: { success: true, count: 20, data: [...], pagination: {...} }
      return {
        resources: result.data || [],
        pagination: result.pagination || null,
        count: result.count || 0,
      };
    } catch (error) {
      console.error('Error fetching department resources:', error);
      throw error;
    }
  },

  /**
   * Get resources in a specific folder
   * @param {string} folderId - Folder ID
   * @param {object} options - Additional query options
   * @returns {Promise<object>} Resources with pagination
   */
  getFolderResources: async (folderId, options = {}) => {
    return resourceService.getAllResources({ ...options, folder: folderId });
  },

  /**
   * Get single resource by ID
   * @param {string} resourceId - Resource ID
   * @returns {Promise<object>} Resource details
   */
  getResourceById: async (resourceId) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_BASE_URL}/resources/${resourceId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` }),
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch resource`);
      }

      const result = await response.json();
      return result.data || null;
    } catch (error) {
      console.error('Error fetching resource:', error);
      throw error;
    }
  },

  /**
   * Create a new resource
   * @param {object} resourceData - Resource data
   * @param {string} resourceData.title - Resource title
   * @param {string} resourceData.description - Resource description
   * @param {string} resourceData.department - Department ID
   * @param {string} resourceData.folder - Folder ID (optional)
   * @param {string} resourceData.fileUrl - File URL
   * @param {string} resourceData.fileType - File type (pdf, doc, etc.)
   * @param {number} resourceData.fileSize - File size in bytes
   * @param {Array<string>} resourceData.tags - Tags array
   * @param {string} resourceData.type - 'file' or 'link'
   * @returns {Promise<object>} Created resource
   */
  createResource: async (resourceData) => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_BASE_URL}/resources`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(resourceData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create resource');
      }

      const result = await response.json();
      return result.data || null;
    } catch (error) {
      console.error('Error creating resource:', error);
      throw error;
    }
  },

  /**
   * Update a resource
   * @param {string} resourceId - Resource ID
   * @param {object} updates - Fields to update
   * @returns {Promise<object>} Updated resource
   */
  updateResource: async (resourceId, updates) => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_BASE_URL}/resources/${resourceId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update resource');
      }

      const result = await response.json();
      return result.data || null;
    } catch (error) {
      console.error('Error updating resource:', error);
      throw error;
    }
  },

  /**
   * Delete a resource
   * @param {string} resourceId - Resource ID
   * @returns {Promise<boolean>}
   */
  deleteResource: async (resourceId) => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${API_BASE_URL}/resources/${resourceId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete resource');
      }

      return true;
    } catch (error) {
      console.error('Error deleting resource:', error);
      throw error;
    }
  },

  /**
   * Search resources with text query
   * @param {string} query - Search query
   * @param {object} filters - Additional filters
   * @returns {Promise<object>} Search results with pagination
   */
  searchResources: async (query, filters = {}) => {
    return resourceService.getAllResources({ ...filters, search: query });
  },

  /**
   * Filter resources by tags
   * @param {Array<string>} tags - Array of tags
   * @param {object} options - Additional options
   * @returns {Promise<object>} Filtered resources
   */
  filterByTags: async (tags, options = {}) => {
    const tagsString = Array.isArray(tags) ? tags.join(',') : tags;
    return resourceService.getAllResources({ ...options, tags: tagsString });
  },

  /**
   * Get recently uploaded resources
   * @param {number} limit - Number of resources to fetch
   * @returns {Promise<object>} Recent resources
   */
  getRecentResources: async (limit = 10) => {
    return resourceService.getAllResources({
      sortBy: 'createdAt',
      order: 'desc',
      limit: limit,
      isActive: true,
    });
  },

  /**
   * Get popular resources (by views)
   * @param {number} limit - Number of resources to fetch
   * @returns {Promise<object>} Popular resources
   */
  getPopularResources: async (limit = 10) => {
    return resourceService.getAllResources({
      sortBy: 'views',
      order: 'desc',
      limit: limit,
      isActive: true,
    });
  },

  /**
   * Get most downloaded resources
   * @param {number} limit - Number of resources to fetch
   * @returns {Promise<object>} Most downloaded resources
   */
  getMostDownloaded: async (limit = 10) => {
    return resourceService.getAllResources({
      sortBy: 'downloads',
      order: 'desc',
      limit: limit,
      isActive: true,
    });
  },
};
