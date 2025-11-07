import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect, Suspense } from 'react';
import './App.css'
import { Sidebar } from './components/layout/Sidebar'
import { Header } from './components/layout/Header'
import { LibraryHeader } from './components/layout/LibraryHeader'
import { FolderItem } from './components/resources/FolderItem'
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

function HomePage() {
  const [savedFolders, setSavedFolders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedFolders();
  }, []);

  const fetchSavedFolders = async () => {
    try {
      console.log('📚 HomePage: Fetching saved folders...');
      const folders = await savedFolderService.getAllSavedFolders();
      setSavedFolders(folders);
      console.log('✅ HomePage: Loaded', folders.length, 'saved folders');
    } catch (error) {
      console.error('❌ HomePage Error fetching saved folders:', error);
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
  const showSidebar = location.pathname !== '/login' && location.pathname !== '/signup';

  return (
    <div className="flex h-screen">
      {showSidebar && <Sidebar />}
      <Routes>
        {/* Auth Routes */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Main Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/department/:departmentId" element={<DepartmentPageWrapper />} />
        <Route path="/department/:departmentId/projects" element={<ProjectsPage />} />
        <Route path="/department/:departmentId/events" element={<EventsPage />} />
        <Route path="/department/:departmentId/templates" element={<TemplatesPage />} />
        <Route path="/department/:departmentId/guides" element={<GuidesPage />} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

function App() {
  return <MainLayout />
}

export default App
