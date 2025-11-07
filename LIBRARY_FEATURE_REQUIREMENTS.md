# My Library Feature - Backend Requirements

## 🎯 Overview

The **My Library** feature allows users to save their favorite folders (e.g., "Dev Projects", "Design Templates") and access them quickly in one place.

---

## 📊 Data Model

### **SavedFolder Collection**

```javascript
// models/SavedFolder.js
const savedFolderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
    index: true
  },
  folderType: {
    type: String,
    enum: ['projects', 'guides', 'events', 'templates'],
    required: true
  },
  folderName: {
    type: String,
    required: true
  },
  color: {
    type: String,
    enum: ['blue', 'yellow', 'green', 'red'],
    default: 'blue'
  },
  departmentName: {
    type: String,
    required: true
  },
  departmentSlug: {
    type: String,
    required: true
  },
  itemCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Unique index: a user can only save each folder once
savedFolderSchema.index({ user: 1, department: 1, folderType: 1 }, { unique: true });

module.exports = mongoose.model('SavedFolder', savedFolderSchema);
```

---

## 🔌 API Endpoints

### **1. Get User's Saved Folders**
```
GET /api/v1/saved-folders
```

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "673c1234...",
      "user": "user123...",
      "department": {
        "_id": "690d3f81...",
        "name": "Development",
        "slug": "dev"
      },
      "folderType": "projects",
      "folderName": "Projects",
      "color": "blue",
      "departmentName": "Development",
      "departmentSlug": "dev",
      "itemCount": 12,
      "createdAt": "2024-11-19T10:00:00.000Z"
    },
    {
      "_id": "673c5678...",
      "department": {
        "_id": "690d3f82...",
        "name": "Design",
        "slug": "design"
      },
      "folderType": "templates",
      "folderName": "Templates",
      "color": "green",
      "departmentName": "Design",
      "departmentSlug": "design",
      "itemCount": 8,
      "createdAt": "2024-11-18T14:30:00.000Z"
    }
  ],
  "count": 2
}
```

---

### **2. Save a Folder to Library**
```
POST /api/v1/saved-folders
```

**Headers:**
```
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "department": "690d3f818bdc298befa12a0e",
  "folderType": "projects",
  "folderName": "Projects",
  "color": "blue",
  "departmentName": "Development",
  "departmentSlug": "dev",
  "itemCount": 12
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "673c1234...",
    "user": "user123...",
    "department": "690d3f818bdc298befa12a0e",
    "folderType": "projects",
    "folderName": "Projects",
    "color": "blue",
    "departmentName": "Development",
    "departmentSlug": "dev",
    "itemCount": 12,
    "createdAt": "2024-11-19T10:00:00.000Z"
  }
}
```

**Error (Already Saved):**
```json
{
  "success": false,
  "message": "This folder is already in your library"
}
```

---

### **3. Remove Folder from Library**
```
DELETE /api/v1/saved-folders/:id
```

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "message": "Folder removed from library"
}
```

---

### **4. Check if Folder is Saved**
```
GET /api/v1/saved-folders/check?department={id}&folderType={type}
```

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "isSaved": true,
  "savedFolderId": "673c1234..."
}
```

---

## 🔒 Authentication

All endpoints require JWT authentication:
- Extract token from `Authorization: Bearer {token}` header
- Get user ID from token
- Only return/modify saved folders for that user

---

## 🧪 Testing Examples

### **Save a Folder:**
```bash
curl -X POST http://localhost:5000/api/v1/saved-folders \
  -H "Authorization: Bearer eyJhbGc..." \
  -H "Content-Type: application/json" \
  -d '{
    "department": "690d3f818bdc298befa12a0e",
    "folderType": "projects",
    "folderName": "Projects",
    "color": "blue",
    "departmentName": "Development",
    "departmentSlug": "dev",
    "itemCount": 12
  }'
```

### **Get Saved Folders:**
```bash
curl http://localhost:5000/api/v1/saved-folders \
  -H "Authorization: Bearer eyJhbGc..."
```

### **Remove Folder:**
```bash
curl -X DELETE http://localhost:5000/api/v1/saved-folders/673c1234... \
  -H "Authorization: Bearer eyJhbGc..."
```

---

## 📋 Implementation Checklist

- [ ] Create SavedFolder model
- [ ] Add unique index (user + department + folderType)
- [ ] Implement GET /saved-folders (list all saved)
- [ ] Implement POST /saved-folders (save folder)
- [ ] Implement DELETE /saved-folders/:id (remove folder)
- [ ] Implement GET /saved-folders/check (check if saved)
- [ ] Add authentication middleware to all endpoints
- [ ] Test with curl/Postman
- [ ] Verify user isolation (user A can't see user B's saved folders)

---

## 🎯 Frontend Integration (Preview)

```jsx
// Get saved folders
const [savedFolders, setSavedFolders] = useState([]);

useEffect(() => {
  const fetchSavedFolders = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/v1/saved-folders', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    setSavedFolders(data.data);
  };
  
  fetchSavedFolders();
}, []);

// Save a folder
const handleSaveFolder = async (department, folderType) => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:5000/api/v1/saved-folders', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      department: department._id,
      folderType: folderType,
      folderName: folderType.charAt(0).toUpperCase() + folderType.slice(1),
      color: getRandomColor(),
      departmentName: department.name,
      departmentSlug: department.slug,
      itemCount: 0
    })
  });
  
  if (response.ok) {
    // Folder saved!
  }
};
```

---

## 🚀 Priority

**Priority:** High - This feature significantly improves UX by allowing users to quickly access their most-used folders.

**Estimated Backend Dev Time:** 30-45 minutes

---

## 📞 Questions?

- Should there be a limit to how many folders a user can save? (e.g., max 20)
- Should item count update automatically or be static?
- Should folders have notes/descriptions?
- Should users be able to reorder their saved folders?

---

**Status:** Ready for Backend Implementation
**Date:** November 7, 2025
