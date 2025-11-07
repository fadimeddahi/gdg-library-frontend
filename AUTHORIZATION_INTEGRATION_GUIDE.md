# 🔐 Authorization Integration Guide

## Quick Copy-Paste Examples

Here are quick examples to add authorization to different actions in your app.

---

## Example 1: Delete Button (Admin Only)

```jsx
import { useAuthorization } from '../hooks/useAuthorization';
import { AuthRequiredModal } from '../components/common/AuthRequiredModal';

export const DeleteResourceButton = ({ resourceId }) => {
  const { checkAuthorization, authModal, closeAuthModal } = useAuthorization();

  const handleDelete = async () => {
    // Check if user is admin
    if (!checkAuthorization('admin', 'delete resources')) {
      return; // Modal shows automatically
    }

    try {
      await deleteResource(resourceId);
      alert('✅ Resource deleted');
    } catch (error) {
      alert(`❌ ${error.message}`);
    }
  };

  return (
    <>
      <button 
        onClick={handleDelete}
        style={{ background: '#EF4444', color: 'white' }}
      >
        🗑️ Delete
      </button>
      
      <AuthRequiredModal 
        isOpen={authModal.isOpen}
        onClose={closeAuthModal}
        requiredRole={authModal.requiredRole}
        actionName={authModal.actionName}
      />
    </>
  );
};
```

---

## Example 2: Upload File (Member or Higher)

```jsx
import { useAuthorization } from '../hooks/useAuthorization';
import { AuthRequiredModal } from '../components/common/AuthRequiredModal';

export const UploadFileForm = () => {
  const [file, setFile] = useState(null);
  const { checkAuthorization, authModal, closeAuthModal } = useAuthorization();

  const handleUpload = async () => {
    // Check if user is at least a member
    if (!checkAuthorization('member', 'upload files')) {
      return; // Modal shows automatically
    }

    if (!file) {
      alert('Please select a file');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);
      
      await uploadFile(formData);
      alert('✅ File uploaded successfully');
    } catch (error) {
      alert(`❌ Upload failed: ${error.message}`);
    }
  };

  return (
    <>
      <input 
        type="file" 
        onChange={(e) => setFile(e.target.files?.[0])} 
      />
      <button onClick={handleUpload}>📤 Upload</button>
      
      <AuthRequiredModal 
        isOpen={authModal.isOpen}
        onClose={closeAuthModal}
        requiredRole={authModal.requiredRole}
        actionName={authModal.actionName}
      />
    </>
  );
};
```

---

## Example 3: Edit Department (Moderator or Higher)

```jsx
import { useAuthorization } from '../hooks/useAuthorization';
import { AuthRequiredModal } from '../components/common/AuthRequiredModal';

export const EditDepartmentForm = ({ departmentId, departmentData }) => {
  const [formData, setFormData] = useState(departmentData);
  const { checkAuthorization, authModal, closeAuthModal } = useAuthorization();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is at least a moderator
    if (!checkAuthorization('moderator', 'edit departments')) {
      return; // Modal shows automatically
    }

    try {
      await updateDepartment(departmentId, formData);
      alert('✅ Department updated');
    } catch (error) {
      alert(`❌ Update failed: ${error.message}`);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <button type="submit">💾 Save Changes</button>
      </form>
      
      <AuthRequiredModal 
        isOpen={authModal.isOpen}
        onClose={closeAuthModal}
        requiredRole={authModal.requiredRole}
        actionName={authModal.actionName}
      />
    </>
  );
};
```

---

## Example 4: Context Menu with Multiple Protected Actions

```jsx
import { useAuthorization } from '../hooks/useAuthorization';
import { AuthRequiredModal } from '../components/common/AuthRequiredModal';

export const ResourceContextMenu = ({ resource }) => {
  const { checkAuthorization, authModal, closeAuthModal } = useAuthorization();

  const handleEdit = () => {
    if (!checkAuthorization('moderator', 'edit resources')) return;
    editResource(resource.id);
  };

  const handleDelete = () => {
    if (!checkAuthorization('admin', 'delete resources')) return;
    deleteResource(resource.id);
  };

  const handleMove = () => {
    if (!checkAuthorization('moderator', 'move resources')) return;
    moveResource(resource.id);
  };

  return (
    <>
      <div className="context-menu">
        <button onClick={handleEdit}>✏️ Edit</button>
        <button onClick={handleMove}>📁 Move</button>
        <button onClick={handleDelete} style={{ color: 'red' }}>
          🗑️ Delete
        </button>
      </div>
      
      <AuthRequiredModal 
        isOpen={authModal.isOpen}
        onClose={closeAuthModal}
        requiredRole={authModal.requiredRole}
        actionName={authModal.actionName}
      />
    </>
  );
};
```

---

## Example 5: Conditional Rendering (Hide Buttons)

Instead of showing auth modal, you can hide buttons based on role:

```jsx
import { useAuth } from '../context/useAuth';
import { canPerformAction } from '../constants/roles';

export const ResourceCard = ({ resource }) => {
  const { user } = useAuth();
  
  const userRole = user?.role || 'visitor';
  const canEdit = canPerformAction(userRole, 'co_manager');
  const canDelete = canPerformAction(userRole, 'admin');

  return (
    <div className="card">
      <h3>{resource.title}</h3>
      
      {canEdit && (
        <button onClick={() => editResource(resource.id)}>
          ✏️ Edit
        </button>
      )}
      
      {canDelete && (
        <button onClick={() => deleteResource(resource.id)}>
          🗑️ Delete
        </button>
      )}
    </div>
  );
};
```

---

## Role Levels Reference

```javascript
VISITOR     = Level 1  (View only)
MEMBER      = Level 2  (Upload, download)
MODERATOR   = Level 3  (Edit, delete) also called 'co_manager' in code
ADMIN       = Level 4  (Full access)
```

**When to use each:**
- `checkAuthorization('member', '...')` - For upload/download actions
- `checkAuthorization('co_manager', '...')` - For edit/manage actions
- `checkAuthorization('admin', '...')` - For delete/system actions

---

## Authentication vs Authorization

### Authentication (Is the user logged in?)
```jsx
const { isAuthenticated, user } = useAuth();

if (!isAuthenticated) {
  return <LoginRequired />;
}
```

### Authorization (Does the user have permission?)
```jsx
const { checkAuthorization } = useAuthorization();

if (!checkAuthorization('admin', 'action')) {
  return; // Modal shows
}
```

---

## Error Handling Patterns

### Pattern 1: Show Error in Modal
```jsx
const handleAction = async () => {
  if (!checkAuthorization('member', 'perform action')) {
    return; // Modal shows
  }
  
  try {
    await someAction();
  } catch (error) {
    alert(`❌ ${error.message}`);
  }
};
```

### Pattern 2: Use Toast Notifications
```jsx
import { toast } from 'react-toastify'; // or your toast lib

const handleAction = async () => {
  if (!checkAuthorization('admin', 'delete')) {
    return;
  }
  
  try {
    await deleteItem();
    toast.success('✅ Deleted successfully');
  } catch (error) {
    toast.error(`❌ ${error.message}`);
  }
};
```

---

## Testing Authorization

### Test Unauthenticated User
1. Open DevTools Console
2. Run: `localStorage.removeItem('token')`
3. Refresh page
4. Try protected action → Modal should appear

### Test Different Roles
1. Login with different user accounts
2. Check their role: `localStorage.getItem('user') | jq .role`
3. Try actions → Verify correct modal/blocking

### Debug Authorization
```javascript
// In browser console
const user = JSON.parse(localStorage.getItem('user'));
console.log('User:', user);
console.log('Role:', user?.role);
```

---

## Best Practices

✅ **DO:**
- Check authorization BEFORE making API calls
- Show clear error messages
- Use consistent role names
- Log authorization checks in console
- Provide login/signup options in modal

❌ **DON'T:**
- Trust frontend auth alone (always verify on backend)
- Use authorization for UI-only (always secure backend)
- Show sensitive errors to users
- Cache user roles (refresh on each check)
- Hardcode role names (use constants)

---

## Troubleshooting

### Modal not appearing?
```javascript
// Check if hook is in component
const { checkAuthorization, authModal } = useAuthorization();
console.log('Auth modal state:', authModal);

// Check if condition is correct
console.log('Check result:', checkAuthorization('member', 'test'));
```

### Modal appearing but can't login?
```javascript
// Check backend is running on port 5000
// Check token is stored: localStorage.getItem('token')
// Check browser console for error details
```

### Role check not working?
```javascript
// Verify role name matches
// Available roles: 'visitor', 'member', 'co_manager', 'admin'

// Check user object
const user = JSON.parse(localStorage.getItem('user'));
console.log('User role:', user?.role);
```

---

**Need help?** Check the main `AUTHORIZATION_SYSTEM.md` file for detailed documentation.
