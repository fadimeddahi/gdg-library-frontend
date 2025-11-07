const API_BASE_URL = 'http://localhost:5000/api/v1';

export const savedFolderService = {
  /**
   * Get all saved folders for the logged-in user
   * @returns {Promise<Array>} Array of saved folder objects
   */
  getAllSavedFolders: async () => {
    try {
      const token = localStorage.getItem('token');
      
      console.log('📚 Fetching all saved folders...');
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

      console.log('✅ Saved folders fetched:', data.data);
      return data.data;
    } catch (error) {
      console.error('❌ Error fetching saved folders:', error);
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
      
      console.log('💾 Saving folder:', folderData);
      const response = await fetch(`${API_BASE_URL}/saved-folders`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(folderData),
      });

      console.log('📡 Response status:', response.status);
      const data = await response.json();
      console.log('📡 Response data:', data);
      
      if (!response.ok) {
        throw new Error(data.message || `Server error: ${response.status}`);
      }

      if (!data.success) {
        throw new Error(data.message || 'Failed to save folder');
      }

      console.log('✅ Folder saved successfully:', data.data);
      return data.data;
    } catch (error) {
      console.error('❌ Error saving folder:', error);
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
      
      console.log('🗑️ Removing folder:', folderId);
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

      console.log('✅ Folder removed successfully');
      return data;
    } catch (error) {
      console.error('❌ Error removing folder:', error);
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
      
      console.log('🔍 Checking if saved:', { departmentId, folderType });
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

      console.log('✅ Save status checked:', data.isSaved);
      return data;
    } catch (error) {
      console.error('❌ Error checking save status:', error);
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
      
      console.log('📊 Updating folder count:', folderId);
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

      console.log('✅ Folder count updated:', data.data.itemCount);
      return data.data;
    } catch (error) {
      console.error('❌ Error updating folder count:', error);
      throw error;
    }
  },
};
