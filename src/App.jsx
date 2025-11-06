import { Routes, Route, useNavigate, useParams } from 'react-router-dom'
import { Sidebar } from './components/layout/Sidebar'
import { Header } from './components/layout/Header'
import { LibraryHeader } from './components/layout/LibraryHeader'
import { FolderItem } from './components/resources/FolderItem'
import { RecentFileCard } from './components/resources/RecentFileCard'
import { DepartmentPage } from './pages/DepartmentPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { EventsPage } from './pages/EventsPage'
import { TemplatesPage } from './pages/TemplatesPage'
import { GuidesPage } from './pages/GuidesPage'
import { SignUpPage } from './pages/SignUpPage'
import { LoginPage } from './pages/LoginPage'
import { DEPARTMENTS } from './constants'
import './App.css'

function HomePage() {
  // Mock folders data
  const folders = [
    { id: 1, name: 'Design Assets', color: 'blue' },
    { id: 2, name: 'Event Fiches', color: 'yellow' },
    { id: 3, name: 'Templates', color: 'green' },
    { id: 4, name: 'Guidelines', color: 'red' },
    { id: 5, name: 'Resources', color: 'blue' },
  ];

  return (
    <main className="flex-1 bg-white">
      <Header />
      <LibraryHeader />
        
        {/* Folders Grid */}
        <div 
          style={{
            marginLeft: '26px',
            marginRight: '26px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 180px)',
            gap: '28px',
            marginBottom: '26px',
          }}
        >
          {folders.map((folder) => (
            <FolderItem
              key={folder.id}
              name={folder.name}
              color={folder.color}
              onClick={() => console.log(`Clicked: ${folder.name}`)}
            />
          ))}
        </div>
    </main>
  );
}

function DepartmentPageWrapper() {
  const { departmentId } = useParams();
  console.log('Raw departmentId from URL:', departmentId);
  console.log('DEPARTMENTS:', DEPARTMENTS);
  
  const department = DEPARTMENTS.find(d => d.id === departmentId);
  
  console.log('Found department:', department);
  
  return (
    <DepartmentPage 
      departmentId={departmentId}
      departmentName={department?.name}
    />
  );
}

function App() {
  const navigate = useNavigate();

  const handleDepartmentClick = (departmentId) => {
    navigate(`/department/${departmentId}`);
  };

  return (
    <div className="flex min-h-screen">
      <Routes>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={
          <>
            <Sidebar onDepartmentClick={handleDepartmentClick} />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/department/:departmentId" element={<DepartmentPageWrapper />} />
              <Route path="/department/:departmentId/projects" element={<ProjectsPage />} />
              <Route path="/department/:departmentId/events" element={<EventsPage />} />
              <Route path="/department/:departmentId/templates" element={<TemplatesPage />} />
              <Route path="/department/:departmentId/guides" element={<GuidesPage />} />
            </Routes>
          </>
        } />
      </Routes>
    </div>
  );
}

export default App
