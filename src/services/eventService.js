import { authService } from './authService';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Events Service
 * Handles all event-related API operations
 */

/**
 * Get all events with optional filters
 * @param {Object} options - Query options
 * @param {string} options.department - Filter by department ID
 * @param {string} options.search - Search term for title
 * @param {number} options.page - Page number (default: 1)
 * @param {number} options.limit - Items per page (default: 10)
 * @param {string} options.sortBy - Sort field (default: createdAt)
 * @param {string} options.order - Sort order: asc|desc (default: desc)
 * @param {boolean} options.isActive - Filter by active status (default: true)
 * @returns {Promise} { events: [], pagination: {} }
 */
export const getAllEvents = async (options = {}) => {
  try {
    const params = new URLSearchParams();

    if (options.department) params.append('department', options.department);
    if (options.search) params.append('search', options.search);
    if (options.page) params.append('page', options.page);
    if (options.limit) params.append('limit', options.limit);
    if (options.sortBy) params.append('sortBy', options.sortBy);
    if (options.order) params.append('order', options.order);
    if (options.isActive !== undefined) params.append('isActive', options.isActive);

    const url = `${API_URL}/events?${params.toString()}`;
    console.log('📅 Fetching events from:', url);

    const response = await fetch(url);
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch events');
    }

    return {
      events: result.data || [],
      pagination: result.pagination || {},
      count: result.count || 0,
    };
  } catch (error) {
    console.error('❌ Events fetch error:', error);
    throw error;
  }
};

/**
 * Get events for a specific department
 * @param {string} departmentId - Department MongoDB ID
 * @param {Object} options - Additional query options
 * @returns {Promise} { events: [], pagination: {} }
 */
export const getEventsByDepartment = async (departmentId, options = {}) => {
  return getAllEvents({
    department: departmentId,
    page: options.page || 1,
    limit: options.limit || 10,
    sortBy: options.sortBy || 'createdAt',
    order: options.order || 'desc',
    isActive: options.isActive !== undefined ? options.isActive : true,
  });
};

/**
 * Get a single event by ID
 * @param {string} id - Event MongoDB ID
 * @returns {Promise} Event object
 */
export const getEventById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/events/${id}`);
    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch event');
    }

    return result.data;
  } catch (error) {
    console.error('❌ Event fetch error:', error);
    throw error;
  }
};

/**
 * Create a new event
 * @param {Object} eventData - { department: string, title: string }
 * @returns {Promise} Created event object
 */
export const createEvent = async (eventData) => {
  try {
    const token = authService.getToken();
    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers,
      body: JSON.stringify(eventData),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to create event');
    }

    console.log('✅ Event created:', result.data);
    return result.data;
  } catch (error) {
    console.error('❌ Event creation error:', error);
    throw error;
  }
};

/**
 * Update an existing event
 * @param {string} id - Event MongoDB ID
 * @param {Object} updateData - { title?: string, isActive?: boolean }
 * @returns {Promise} Updated event object
 */
export const updateEvent = async (id, updateData) => {
  try {
    const token = authService.getToken();
    const headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/events/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(updateData),
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to update event');
    }

    console.log('✅ Event updated:', result.data);
    return result.data;
  } catch (error) {
    console.error('❌ Event update error:', error);
    throw error;
  }
};

/**
 * Delete an event
 * @param {string} id - Event MongoDB ID
 * @returns {Promise} Success message
 */
export const deleteEvent = async (id) => {
  try {
    const token = authService.getToken();
    const headers = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}/events/${id}`, {
      method: 'DELETE',
      headers,
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(result.message || 'Failed to delete event');
    }

    console.log('✅ Event deleted');
    return result;
  } catch (error) {
    console.error('❌ Event deletion error:', error);
    throw error;
  }
};

/**
 * Search events by title
 * @param {string} searchTerm - Search query
 * @param {string} departmentId - Optional department filter
 * @returns {Promise} { events: [], pagination: {} }
 */
export const searchEvents = async (searchTerm, departmentId = null) => {
  const options = {
    search: searchTerm,
    page: 1,
    limit: 20,
  };

  if (departmentId) {
    options.department = departmentId;
  }

  return getAllEvents(options);
};

export default {
  getAllEvents,
  getEventsByDepartment,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  searchEvents,
};
