// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
const ENDPOINTS = {
  REGISTER: '/auth/register',
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
};

// Custom error class
class AuthError extends Error {
  constructor(message, status, originalError) {
    super(message);
    this.name = 'AuthError';
    this.status = status;
    this.originalError = originalError;
  }
}

/**
 * Make authenticated HTTP request
 * @param {string} url - Endpoint URL
 * @param {object} options - Fetch options
 * @returns {Promise}
 */
const fetchWithAuth = async (url, options = {}) => {
  try {
    const token = authService.getToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
    });

    // Handle response
    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage = data?.message || data?.error || `HTTP ${response.status}`;
      throw new AuthError(
        errorMessage,
        response.status,
        data
      );
    }

    return data;
  } catch (error) {
    // Distinguish between network errors and API errors
    if (error instanceof AuthError) {
      throw error;
    }

    if (error instanceof TypeError) {
      throw new AuthError(
        'Network error. Please check your connection.',
        'NETWORK_ERROR',
        error
      );
    }

    throw new AuthError(
      error.message || 'An unexpected error occurred',
      'UNKNOWN_ERROR',
      error
    );
  }
};

/**
 * Validation helpers
 */
const validation = {
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isValidPassword: (password) => {
    return password && password.length >= 6;
  },

  validateCredentials: (email, password) => {
    const errors = {};

    if (!email || !validation.isValidEmail(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!validation.isValidPassword(password)) {
      errors.password = 'Password must be at least 6 characters';
    }

    return errors;
  },
};

/**
 * Authentication Service
 */
export const authService = {
  /**
   * Register new user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<object>} User data and token
   */
  register: async (email, password) => {
    // Validate input
    const errors = validation.validateCredentials(email, password);
    if (Object.keys(errors).length > 0) {
      throw new AuthError(
        Object.values(errors).join(', '),
        'VALIDATION_ERROR',
        errors
      );
    }

    const data = await fetchWithAuth(ENDPOINTS.REGISTER, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    // Store token if provided (handle nested structure)
    const token = data?.data?.token || data?.token;
    if (token) {
      localStorage.setItem('token', token);
    }

    return data;
  },

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<object>} User data and token
   */
  login: async (email, password) => {
    // Validate input
    const errors = validation.validateCredentials(email, password);
    if (Object.keys(errors).length > 0) {
      throw new AuthError(
        Object.values(errors).join(', '),
        'VALIDATION_ERROR',
        errors
      );
    }

    const data = await fetchWithAuth(ENDPOINTS.LOGIN, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    // Store token if provided (handle nested structure)
    const token = data?.data?.token || data?.token;
    if (token) {
      localStorage.setItem('token', token);
    }

    return data;
  },

  /**
   * Logout user
   */
  logout: async () => {
    try {
      await fetchWithAuth(ENDPOINTS.LOGOUT, {
        method: 'POST',
      });
    } catch (error) {
      // Continue logout even if API call fails
      console.warn('Logout API call failed:', error);
    } finally {
      localStorage.removeItem('token');
    }
  },

  /**
   * Get stored authentication token
   * @returns {string|null} JWT token or null
   */
  getToken: () => {
    return localStorage.getItem('token');
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} True if token exists
   */
  isAuthenticated: () => {
    return !!authService.getToken();
  },

  /**
   * Get authorization header
   * @returns {object} Header object with Bearer token
   */
  getAuthHeader: () => {
    const token = authService.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  },

  /**
   * Validation utilities (public)
   */
  validation,
};

