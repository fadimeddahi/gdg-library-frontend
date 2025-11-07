import { Routes, Route, Navigate, useParams, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css'
import { Sidebar } from './components/layout/Sidebar'
import { Header } from './components/layout/Header'
import { LibraryHeader } from './components/layout/LibraryHeader'
import { FolderItem } from './components/resources/FolderItem'
import { DepartmentPage } from './pages/DepartmentPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { EventsPage } from './pages/EventsPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { GuidesPage } from './pages/GuidesPage';
import { SignUpPage } from './pages/SignUpPage';
import { LoginPage } from './pages/LoginPage';
import { departmentService } from './services/departmentService';

function HomePage() {
  const folders = [
    { id: 1, name: 'Design Assets', color: 'blue' },
    { id: 2, name: 'Event Fiches', color: 'yellow' },
    { id: 3, name: 'Templates', color: 'green' },
    { id: 4, name: 'Guidelines', color: 'red' },
    { id: 5, name: 'Resources', color: 'blue' },
  ];

  return (
    <div className="flex-1 overflow-auto">
      <Header />
      <div style={{ padding: '0 26px' }}>
        <LibraryHeader />
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 180px)',
            gap: '28px',
            marginTop: '28px',
          }}
        >
          {folders.map((folder) => (
            <FolderItem
              key={folder.id}
              folder={folder}
            />
          ))}
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

  return <DepartmentPage departmentId={department.slug} departmentName={department.name} />;
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
