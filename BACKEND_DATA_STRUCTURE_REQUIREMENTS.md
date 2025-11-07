# Backend API Implementation - COMPLETE INTEGRATION GUIDE

## ⚠️ CRITICAL: Frontend is Ready - Backend Implementation Required

The frontend has been **fully implemented and tested**. All pages are correctly:
- Fetching department data by slug to obtain MongoDB ObjectIds
- Passing MongoDB ObjectIds (NOT slugs) to all collection endpoints
- Handling loading states, errors, and empty states
- Ready to display data immediately once backend endpoints are available

**Current Status:** Frontend is making API calls to endpoints that return **404 Not Found**. Once you implement these endpoints, the frontend will automatically display the data.

---

## 🚨 What You Need to Implement RIGHT NOW

### 1. Four New MongoDB Collections

Create these 4 collections in your MongoDB database:

```javascript
// collections: projects, guides, events, templates
```

Each collection uses this **EXACT schema**:

```javascript
const Schema = new mongoose.Schema({
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true,
    index: true  // IMPORTANT: Index for faster queries
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true  // IMPORTANT: Index for filtering
  }
}, {
  timestamps: true  // Auto-creates createdAt and updatedAt
});

// IMPORTANT: Add text index for search functionality
Schema.index({ title: 'text' });
```

### 2. Four New API Endpoints (MUST IMPLEMENT)

The frontend is **currently calling** these endpoints:

#### ✅ Endpoint 1: `GET /api/v1/projects`
**Status:** 🔴 Returns 404 - NOT IMPLEMENTED
**Frontend is calling:** `http://localhost:5000/api/v1/projects?department=690d3f818bdc298befa12a0e&page=1&limit=10&sortBy=createdAt&order=desc&isActive=true`

#### ✅ Endpoint 2: `GET /api/v1/guides`
**Status:** 🔴 Returns 404 - NOT IMPLEMENTED

#### ✅ Endpoint 3: `GET /api/v1/events`
**Status:** 🔴 Returns 404 - NOT IMPLEMENTED

#### ✅ Endpoint 4: `GET /api/v1/templates`
**Status:** 🔴 Returns 404 - NOT IMPLEMENTED

---

## 📋 Complete Implementation Guide

### Step 1: Create Mongoose Models

Create 4 files in your `models/` directory:

#### File: `models/Project.js`
```javascript
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: [true, 'Department is required'],
    index: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  }
}, {
  timestamps: true
});

// Text index for search
projectSchema.index({ title: 'text' });

module.exports = mongoose.model('Project', projectSchema);
```

#### File: `models/Guide.js`
```javascript
const mongoose = require('mongoose');

const guideSchema = new mongoose.Schema({
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: [true, 'Department is required'],
    index: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  }
}, {
  timestamps: true
});

// Text index for search
guideSchema.index({ title: 'text' });

module.exports = mongoose.model('Guide', guideSchema);
```

#### File: `models/Event.js`
```javascript
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: [true, 'Department is required'],
    index: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  }
}, {
  timestamps: true
});

// Text index for search
eventSchema.index({ title: 'text' });

module.exports = mongoose.model('Event', eventSchema);
```

#### File: `models/Template.js`
```javascript
const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: [true, 'Department is required'],
    index: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true
  }
}, {
  timestamps: true
});

// Text index for search
templateSchema.index({ title: 'text' });

module.exports = mongoose.model('Template', templateSchema);
```

---

### Step 2: Create Generic Controller

Since all 4 collections have identical logic, create a **factory function** to generate controllers:

#### File: `controllers/collectionController.js`
```javascript
/**
 * Generic Collection Controller Factory
 * Creates CRUD controllers for Projects, Guides, Events, Templates
 */

const createCollectionController = (Model, collectionName) => {
  return {
    /**
     * GET ALL - Get all items with filtering, search, pagination
     * Query params: department, search, page, limit, sortBy, order, isActive
     */
    getAll: async (req, res) => {
      try {
        const {
          department,
          search,
          page = 1,
          limit = 10,
          sortBy = 'createdAt',
          order = 'desc',
          isActive = 'true'
        } = req.query;

        // Build query
        const query = {};

        // Filter by department (REQUIRED by frontend)
        if (department) {
          query.department = department;
        }

        // Filter by active status
        if (isActive !== 'all') {
          query.isActive = isActive === 'true';
        }

        // Text search (if provided)
        if (search && search.trim()) {
          query.$text = { $search: search };
        }

        // Calculate pagination
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        // Build sort object
        const sortOrder = order === 'asc' ? 1 : -1;
        const sort = {};
        sort[sortBy] = sortOrder;

        // Execute query with pagination
        const [items, totalItems] = await Promise.all([
          Model.find(query)
            .populate('department', 'name slug')
            .sort(sort)
            .skip(skip)
            .limit(limitNum)
            .lean(),
          Model.countDocuments(query)
        ]);

        // Calculate pagination metadata
        const totalPages = Math.ceil(totalItems / limitNum);

        res.status(200).json({
          success: true,
          data: items,
          pagination: {
            page: pageNum,
            limit: limitNum,
            totalItems,
            totalPages
          },
          count: items.length
        });

      } catch (error) {
        console.error(`Error fetching ${collectionName}:`, error);
        res.status(500).json({
          success: false,
          message: `Failed to fetch ${collectionName}`,
          error: error.message
        });
      }
    },

    /**
     * GET BY ID - Get single item
     */
    getById: async (req, res) => {
      try {
        const { id } = req.params;

        const item = await Model.findById(id)
          .populate('department', 'name slug')
          .lean();

        if (!item) {
          return res.status(404).json({
            success: false,
            message: `${collectionName} not found`
          });
        }

        res.status(200).json({
          success: true,
          data: item
        });

      } catch (error) {
        console.error(`Error fetching ${collectionName}:`, error);
        res.status(500).json({
          success: false,
          message: `Failed to fetch ${collectionName}`,
          error: error.message
        });
      }
    },

    /**
     * CREATE - Create new item
     */
    create: async (req, res) => {
      try {
        const { department, title } = req.body;

        // Validation
        if (!department || !title) {
          return res.status(400).json({
            success: false,
            message: 'Department and title are required'
          });
        }

        // Create item
        const item = await Model.create({
          department,
          title
        });

        // Populate and return
        const populatedItem = await Model.findById(item._id)
          .populate('department', 'name slug')
          .lean();

        res.status(201).json({
          success: true,
          data: populatedItem
        });

      } catch (error) {
        console.error(`Error creating ${collectionName}:`, error);
        res.status(500).json({
          success: false,
          message: `Failed to create ${collectionName}`,
          error: error.message
        });
      }
    },

    /**
     * UPDATE - Update existing item
     */
    update: async (req, res) => {
      try {
        const { id } = req.params;
        const { title, isActive } = req.body;

        // Build update object
        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (isActive !== undefined) updateData.isActive = isActive;

        // Update item
        const item = await Model.findByIdAndUpdate(
          id,
          updateData,
          { new: true, runValidators: true }
        ).populate('department', 'name slug');

        if (!item) {
          return res.status(404).json({
            success: false,
            message: `${collectionName} not found`
          });
        }

        res.status(200).json({
          success: true,
          data: item
        });

      } catch (error) {
        console.error(`Error updating ${collectionName}:`, error);
        res.status(500).json({
          success: false,
          message: `Failed to update ${collectionName}`,
          error: error.message
        });
      }
    },

    /**
     * DELETE - Delete item
     */
    delete: async (req, res) => {
      try {
        const { id } = req.params;

        const item = await Model.findByIdAndDelete(id);

        if (!item) {
          return res.status(404).json({
            success: false,
            message: `${collectionName} not found`
          });
        }

        res.status(200).json({
          success: true,
          message: `${collectionName} deleted successfully`
        });

      } catch (error) {
        console.error(`Error deleting ${collectionName}:`, error);
        res.status(500).json({
          success: false,
          message: `Failed to delete ${collectionName}`,
          error: error.message
        });
      }
    }
  };
};

module.exports = createCollectionController;
```

---

### Step 3: Create Routes

Create 4 route files:

#### File: `routes/projectRoutes.js`
```javascript
const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const createCollectionController = require('../controllers/collectionController');

// Create controller instance
const projectController = createCollectionController(Project, 'Project');

// Routes
router.get('/', projectController.getAll);
router.get('/:id', projectController.getById);
router.post('/', projectController.create);
router.put('/:id', projectController.update);
router.delete('/:id', projectController.delete);

module.exports = router;
```

#### File: `routes/guideRoutes.js`
```javascript
const express = require('express');
const router = express.Router();
const Guide = require('../models/Guide');
const createCollectionController = require('../controllers/collectionController');

// Create controller instance
const guideController = createCollectionController(Guide, 'Guide');

// Routes
router.get('/', guideController.getAll);
router.get('/:id', guideController.getById);
router.post('/', guideController.create);
router.put('/:id', guideController.update);
router.delete('/:id', guideController.delete);

module.exports = router;
```

#### File: `routes/eventRoutes.js`
```javascript
const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const createCollectionController = require('../controllers/collectionController');

// Create controller instance
const eventController = createCollectionController(Event, 'Event');

// Routes
router.get('/', eventController.getAll);
router.get('/:id', eventController.getById);
router.post('/', eventController.create);
router.put('/:id', eventController.update);
router.delete('/:id', eventController.delete);

module.exports = router;
```

#### File: `routes/templateRoutes.js`
```javascript
const express = require('express');
const router = express.Router();
const Template = require('../models/Template');
const createCollectionController = require('../controllers/collectionController');

// Create controller instance
const templateController = createCollectionController(Template, 'Template');

// Routes
router.get('/', templateController.getAll);
router.get('/:id', templateController.getById);
router.post('/', templateController.create);
router.put('/:id', templateController.update);
router.delete('/:id', templateController.delete);

module.exports = router;
```

---

### Step 4: Register Routes in Main Server File

#### Modify: `server.js` or `app.js` or `index.js`

```javascript
// Import routes
const projectRoutes = require('./routes/projectRoutes');
const guideRoutes = require('./routes/guideRoutes');
const eventRoutes = require('./routes/eventRoutes');
const templateRoutes = require('./routes/templateRoutes');

// Register routes (add these AFTER your existing routes)
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/guides', guideRoutes);
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/templates', templateRoutes);
```

---

## 🧪 Testing Your Implementation

### Test 1: Create Test Data

Use MongoDB Compass or your MongoDB shell to insert test data:

```javascript
// Example: Insert test projects
db.projects.insertMany([
  {
    department: ObjectId("690d3f818bdc298befa12a0e"), // Replace with your actual department ID
    title: "Q1 2024 Planning Document",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    department: ObjectId("690d3f818bdc298befa12a0e"),
    title: "Project Proposal Template",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    department: ObjectId("690d3f818bdc298befa12a0e"),
    title: "Team Meeting Notes",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

// Repeat for guides, events, templates collections
```

### Test 2: Test Endpoints with cURL

```bash
# Test GET all projects
curl "http://localhost:5000/api/v1/projects?department=690d3f818bdc298befa12a0e&page=1&limit=10"

# Test GET all guides
curl "http://localhost:5000/api/v1/guides?department=690d3f818bdc298befa12a0e"

# Test CREATE project
curl -X POST http://localhost:5000/api/v1/projects \
  -H "Content-Type: application/json" \
  -d '{"department":"690d3f818bdc298befa12a0e","title":"New Project"}'

# Test search
curl "http://localhost:5000/api/v1/projects?search=planning&department=690d3f818bdc298befa12a0e"
```

### Test 3: Verify Frontend Integration

Once your backend is running:

1. Start your backend: `npm start` (or your backend start command)
2. Frontend is already running at: `http://localhost:5173`
3. Login to the frontend
4. Navigate to a department
5. Click "Projects", "Guides", "Events", or "Templates"
6. **Data should display automatically!**

---

## 📊 Expected API Response Format

The frontend expects this **EXACT format**:

```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "department": {
        "_id": "690d3f818bdc298befa12a0e",
        "name": "Development",
        "slug": "dev"
      },
      "title": "Project Proposal.pdf",
      "isActive": true,
      "createdAt": "2024-01-15T10:00:00.000Z",
      "updatedAt": "2024-01-15T10:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalItems": 25,
    "totalPages": 3
  },
  "count": 10
}
```

**Critical Fields:**
- ✅ `success`: Boolean
- ✅ `data`: Array of items
- ✅ `pagination`: Object with page, limit, totalItems, totalPages
- ✅ `count`: Number of items returned
- ✅ `department`: Must be populated with `_id`, `name`, `slug`

---

## 🔍 Query Parameters the Frontend Sends

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `department` | string (ObjectId) | - | **REQUIRED** - MongoDB department ID |
| `search` | string | - | Search term for title field |
| `page` | number | 1 | Page number for pagination |
| `limit` | number | 10 | Items per page |
| `sortBy` | string | createdAt | Field to sort by |
| `order` | string | desc | Sort order: "asc" or "desc" |
| `isActive` | boolean | true | Filter by active status |

**Example frontend call:**
```
GET /api/v1/projects?department=690d3f818bdc298befa12a0e&page=1&limit=10&sortBy=createdAt&order=desc&isActive=true
```

---

## ⚠️ Common Issues & Solutions

### Issue 1: Frontend shows "No projects yet"
**Cause:** No data in your MongoDB collection for that department
**Solution:** Insert test data with the correct department ObjectId

### Issue 2: Still getting 404
**Cause:** Routes not registered in server.js
**Solution:** Verify you added `app.use('/api/v1/projects', projectRoutes);` in your main server file

### Issue 3: Empty array returned
**Cause:** Department ObjectId mismatch
**Solution:** Verify the department ID in your test data matches the frontend's department ID (check console logs)

### Issue 4: "Department is required" error
**Cause:** Missing department in request body for POST
**Solution:** Ensure your POST request includes `{ "department": "ObjectId", "title": "Title" }`

---

## 📁 File Structure Summary

After implementation, you should have:

```
backend/
├── models/
│   ├── Project.js          ← NEW
│   ├── Guide.js            ← NEW
│   ├── Event.js            ← NEW
│   └── Template.js         ← NEW
├── controllers/
│   └── collectionController.js  ← NEW (factory function)
├── routes/
│   ├── projectRoutes.js    ← NEW
│   ├── guideRoutes.js      ← NEW
│   ├── eventRoutes.js      ← NEW
│   └── templateRoutes.js   ← NEW
└── server.js               ← MODIFY (add route registrations)
```

---

## ✅ Implementation Checklist

- [ ] Create 4 model files (Project, Guide, Event, Template)
- [ ] Create collectionController.js factory function
- [ ] Create 4 route files
- [ ] Register routes in server.js
- [ ] Restart backend server
- [ ] Insert test data in MongoDB
- [ ] Test GET endpoint with cURL
- [ ] Test POST endpoint with cURL
- [ ] Verify frontend displays data automatically
- [ ] Test search functionality
- [ ] Test pagination
- [ ] Test filtering by active status

---

## 🚀 Quick Start Commands

```bash
# 1. Create model files
touch models/Project.js models/Guide.js models/Event.js models/Template.js

# 2. Create controller
touch controllers/collectionController.js

# 3. Create routes
touch routes/projectRoutes.js routes/guideRoutes.js routes/eventRoutes.js routes/templateRoutes.js

# 4. Restart server
npm start

# 5. Test endpoint
curl "http://localhost:5000/api/v1/projects?department=YOUR_DEPARTMENT_ID"
```

---

## 📞 Frontend Integration Status

**Current Frontend Behavior:**

1. ✅ User clicks "Projects" in a department
2. ✅ Frontend fetches department by slug: `GET /api/v1/departments`
3. ✅ Extracts MongoDB ObjectId from response: `690d3f818bdc298befa12a0e`
4. ✅ Calls projects endpoint: `GET /api/v1/projects?department=690d3f818bdc298befa12a0e...`
5. 🔴 **Currently returns 404** ← YOU NEED TO FIX THIS
6. ⏳ Once you implement → Frontend will display data automatically

**No frontend changes needed!** Just implement the backend and it will work immediately.

---

## 💡 Tips for Success

1. **Use the provided code exactly** - Don't modify the response format
2. **Test each endpoint** before moving to the next
3. **Check MongoDB indexes** - Text search won't work without text index
4. **Use MongoDB Compass** to verify data structure
5. **Check console logs** - Frontend logs show exact ObjectIds being used
6. **Restart server** after adding routes
7. **Clear browser cache** if data doesn't appear

---

## 🎯 Final Notes

- All 4 collections are **identical** in structure
- Use the **factory function** to avoid code duplication
- Frontend is **waiting** for these endpoints
- Once implemented, data will **display immediately**
- **No authentication required** for GET requests (optional to add later)
- **Pagination is handled** automatically by the controller
- **Search uses MongoDB text index** - ensure it's created

**This implementation should take approximately 30-45 minutes for an experienced developer.**

---

**Backend Status:** 🔴 REQUIRED - Frontend is blocked waiting for these endpoints
**Frontend Status:** ✅ COMPLETE - Ready to display data once backend is implemented
**Estimated Integration Time:** < 1 hour

Good luck! The frontend team is ready and waiting! 🚀


