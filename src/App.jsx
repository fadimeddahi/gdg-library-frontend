import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import './App.css'
import { Sidebar } from './components/layout/Sidebar'
import { Header } from './components/layout/Header'
import { LibraryHeader } from './components/layout/LibraryHeader'
import { FolderItem } from './components/resources/FolderItem'
import { LandingPage } from './pages/LandingPage';
import { DepartmentPage } from './pages/DepartmentPage';
import { LibraryPage } from './pages/LibraryPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { EventsPage } from './pages/EventsPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { GuidesPage } from './pages/GuidesPage';
import { SignUpPage } from './pages/SignUpPage';
import { LoginPage } from './pages/LoginPage';
import { departmentService } from './services/departmentService';
import { savedFolderService } from './services/savedFolderService';
import { useAuth } from './context/useAuth';

// Protected Route Component - redirects to login if not authenticated
function ProtectedRoute({ element }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{ borderColor: '#4285F4' }}></div>
          <p className="mt-4 text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return element;
}

function HomePage() {
  const [savedFolders, setSavedFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedFolders();
  }, []);

  const fetchSavedFolders = async () => {
    try {
      const folders = await savedFolderService.getAllSavedFolders();
      setSavedFolders(folders);
    } catch (error) {
      console.error('Error fetching saved folders:', error);
      // Don't show toast error, just set empty state
      setSavedFolders([]);
    } finally {
      setLoading(false);
    }
  };

  const getColorFromFolderType = (folderType) => {
    const colorMap = {
      'projects': 'blue',
      'events': 'red',
      'templates': 'green',
      'guides': 'yellow',
    };
    return colorMap[folderType] || 'blue';
  };

  const handleFolderClick = (folder) => {
    window.location.href = `/department/${folder.departmentSlug}/${folder.folderType}`;
  };

  return (
    <div className="flex-1 overflow-auto">
      <Header />
      <div style={{ padding: '0 26px' }}>
        <LibraryHeader />
        
        {/* My Library Section */}
        <div style={{ marginTop: '28px' }}>
          <h2 style={{
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: '16px',
            color: '#000000',
            marginBottom: '20px',
          }}>
            📚 My Library
          </h2>

          {loading ? (
            <div style={{
              padding: '20px',
              fontFamily: 'Poppins',
              fontSize: '14px',
              color: '#6B7280',
            }}>
              ⏳ Loading your library...
            </div>
          ) : savedFolders.length === 0 ? (
            <div style={{
              padding: '40px 20px',
              backgroundColor: '#F9FAFB',
              borderRadius: '12px',
              border: '2px dashed #D1D5DB',
              textAlign: 'center',
            }}>
              <p style={{
                fontFamily: 'Poppins',
                fontWeight: 400,
                fontSize: '14px',
                color: '#6B7280',
              }}>
                No saved folders yet. Go to a department and click "Add to Your Library" to get started!
              </p>
            </div>
          ) : (
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: '28px',
                marginBottom: '40px',
              }}
            >
              {savedFolders.map(folder => (
                <FolderItem
                  key={folder._id}
                  name={`${folder.departmentName} ${folder.folderName}`}
                  department={folder.departmentName}
                  folderType={folder.folderName}
                  color={getColorFromFolderType(folder.folderType)}
                  onClick={() => handleFolderClick(folder)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Wrapper component to fetch department data
function DepartmentPageWrapper() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { departmentId } = useParams();

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await departmentService.getAllDepartments();
        setDepartments(data);
      } catch (error) {
        console.error('Failed to fetch departments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) {
    return <div style={{ padding: '24px', fontFamily: 'Poppins' }}>Loading...</div>;
  }

  // Find department by slug
  const department = departments.find(dept => dept.slug === departmentId);

  if (!department) {
    return <div style={{ padding: '24px', fontFamily: 'Poppins' }}>Department not found</div>;
  }

  return (
    <DepartmentPage 
      departmentId={department.slug} 
      departmentName={department.name}
      departmentObjectId={department._id}
    />
  );
}

// Layout wrapper to show/hide sidebar
function MainLayout() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const isLandingPage = location.pathname === '/';
  const showSidebar = !isAuthPage && !isLandingPage;

  return (
    <div className={isAuthPage || isLandingPage ? 'min-h-screen' : 'flex h-screen'}>
      {showSidebar && <Sidebar />}
      <Routes>
        {/* Landing & Auth Routes - Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes - Requires Authentication */}
        <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
        <Route path="/department/:departmentId" element={<ProtectedRoute element={<DepartmentPageWrapper />} />} />
        <Route path="/department/:departmentId/projects" element={<ProtectedRoute element={<ProjectsPage />} />} />
        <Route path="/department/:departmentId/events" element={<ProtectedRoute element={<EventsPage />} />} />
        <Route path="/department/:departmentId/templates" element={<ProtectedRoute element={<TemplatesPage />} />} />
        <Route path="/department/:departmentId/guides" element={<ProtectedRoute element={<GuidesPage />} />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            fontFamily: 'Poppins',
            fontSize: '14px',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#4285F4',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <MainLayout />
    </>
  );
}

export default App
