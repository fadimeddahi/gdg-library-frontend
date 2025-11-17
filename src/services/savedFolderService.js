const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

export const savedFolderService = {
  /**
   * Get all saved folders for the logged-in user
   * @returns {Promise<Array>} Array of saved folder objects
   */
  getAllSavedFolders: async () => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/saved-folders`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to fetch saved folders');
      }

      return data.data;
    } catch (error) {
      console.error('Error fetching saved folders:', error);
      throw error;
    }
  },

  /**
   * Save a folder to user's library
   * @param {Object} folderData - Folder data to save
   * @returns {Promise<Object>} Newly saved folder object
   */
  saveFolder: async (folderData) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/saved-folders`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(folderData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || `Server error: ${response.status}`);
      }

      if (!data.success) {
        throw new Error(data.message || 'Failed to save folder');
      }

      return data.data;
    } catch (error) {
      console.error('Error saving folder:', error);
      throw error;
    }
  },

  /**
   * Remove a saved folder from library
   * @param {string} folderId - MongoDB ObjectId of the saved folder
   * @returns {Promise<Object>} Success response
   */
  removeFolder: async (folderId) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/saved-folders/${folderId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to remove folder');
      }

      return data;
    } catch (error) {
      console.error('Error removing folder:', error);
      throw error;
    }
  },

  /**
   * Check if a specific folder is already saved
   * @param {string} departmentId - MongoDB ObjectId of department
   * @param {string} folderType - Type of folder (projects, guides, events, templates)
   * @returns {Promise<Object>} Object with isSaved boolean and folder data if saved
   */
  checkIfSaved: async (departmentId, folderType) => {
    try {
      const token = localStorage.getItem('token');
      
      const queryParams = new URLSearchParams({
        department: departmentId,
        folderType: folderType,
      });

      const response = await fetch(
        `${API_BASE_URL}/saved-folders/check?${queryParams}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to check save status');
      }

      return data;
    } catch (error) {
      console.error('Error checking save status:', error);
      throw error;
    }
  },

  /**
   * Update the item count for a saved folder
   * @param {string} folderId - MongoDB ObjectId of the saved folder
   * @returns {Promise<Object>} Updated folder object
   */
  updateFolderCount: async (folderId) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_BASE_URL}/saved-folders/${folderId}/count`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.message || 'Failed to update folder count');
      }

      return data.data;
    } catch (error) {
      console.error('Error updating folder count:', error);
      throw error;
    }
  },
};
