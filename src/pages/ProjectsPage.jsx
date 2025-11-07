import { Search, Plus, MoreVertical } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { RecentFileCard } from '../components/resources/RecentFileCard';
import projectService from '../services/projectService';
import { departmentService } from '../services/departmentService';
import { FileUploadModal } from '../components/common/FileUploadModal';

export const ProjectsPage = () => {
  const { departmentId } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [departmentData, setDepartmentData] = useState(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  // First, fetch the department to get its MongoDB ID
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const dept = await departmentService.getDepartmentBySlug(departmentId);
        console.log('📋 Department data for projects:', dept);
        setDepartmentData(dept);
      } catch (error) {
        console.error('Failed to fetch department details:', error);
      }
    };

    if (departmentId) {
      fetchDepartment();
    }
  }, [departmentId]);

  // Then fetch projects using the department's MongoDB ID
  useEffect(() => {
    const fetchProjects = async () => {
      if (!departmentData?._id) {
        console.log('⏳ Waiting for department data...');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log('🔍 Fetching projects for department ID:', departmentData._id);
        
        const result = await projectService.getProjectsByDepartment(departmentData._id, {
          search: searchQuery,
          page: page,
          limit: 10,
        });
        
        console.log('📦 Full API response:', result);
        console.log('📋 Projects array:', result.projects);
        
        if (result.projects && result.projects.length > 0) {
          console.log('🔎 First project details:', {
            id: result.projects[0]._id,
            title: result.projects[0].title,
            fileUrl: result.projects[0].fileUrl,
            hasFileUrl: !!result.projects[0].fileUrl,
          });
        }
        
        setProjects(result.projects);
        console.log('✅ Projects loaded:', result.projects);
      } catch (err) {
        console.error('❌ Error fetching projects:', err);
        setError(err.message || 'Failed to load projects');
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [departmentData, searchQuery, page]);

  return (
    <main className="flex-1 bg-white" style={{ padding: '22px 65px' }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: '29px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          onClick={() => navigate(`/department/${departmentId}`)}
          style={{
            fontFamily: 'Poppins',
            fontWeight: 400,
            fontSize: '13px',
            color: '#6B7280',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          Projects Folder
        </button>
        <span style={{ color: '#6B7280', fontSize: '13px' }}>&gt;</span>
        <span
          style={{
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: '13px',
            color: '#000000',
          }}
        >
          Your Files
        </span>
      </div>

      {/* Search and Filter Section */}
      <div style={{ display: 'flex', gap: '108px', marginBottom: '29px', alignItems: 'center' }}>
        {/* Search Input with Icon */}
        <div style={{ position: 'relative', flex: 1, maxWidth: '540px' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9CA3AF',
              pointerEvents: 'none',
            }}
          />
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1); // Reset to first page on search
            }}
            style={{
              width: '100%',
              height: '35px',
              paddingLeft: '45px',
              paddingRight: '16px',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              fontFamily: 'Poppins',
              fontSize: '10px',
              outline: 'none',
            }}
          />
        </div>

        {/* Filter Dropdown */}
        <div style={{ position: 'relative' }}>
          <select
            style={{
              minWidth: '135px',
              height: '35px',
              padding: '0 32px 0 16px',
              border: '1px solid #E5E7EB',
              borderRadius: '8px',
              fontFamily: 'Poppins',
              fontSize: '10px',
              color: '#6B7280',
              backgroundColor: 'white',
              cursor: 'pointer',
              outline: 'none',
              appearance: 'none',
              flexShrink: 0,
            }}
          >
            <option>Filter by: Document Type</option>
            <option>PDF</option>
            <option>Word</option>
            <option>Excel</option>
            <option>PowerPoint</option>
          </select>
          <div
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              color: '#6B7280',
            }}
          >
            ▼
          </div>
        </div>
      </div>

      {/* Your Files Section */}
      <div style={{ marginBottom: '29px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h2
            style={{
              fontFamily: 'Poppins',
              fontWeight: 600,
              fontSize: '13px',
              color: '#000000',
            }}
          >
            Your Files
          </h2>
          <button
            onClick={() => setUploadModalOpen(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '7px',
              padding: '7px 13px',
              backgroundColor: '#4285F4',
              border: 'none',
              borderRadius: '7px',
              cursor: 'pointer',
              fontFamily: 'Poppins',
              fontSize: '9px',
              fontWeight: 500,
              color: '#FFFFFF',
            }}
          >
            <Plus size={13} />
            Create File
          </button>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '40px', color: '#6B7280' }}>
            <p style={{ fontFamily: 'Poppins', fontSize: '13px' }}>Loading projects...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#EF4444',
            backgroundColor: '#FEE2E2',
            borderRadius: '8px',
            fontFamily: 'Poppins',
            fontSize: '13px',
          }}>
            <p>❌ {error}</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && projects.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#6B7280',
            fontFamily: 'Poppins',
            fontSize: '13px',
          }}>
            <p>📁 No projects yet</p>
            <p style={{ fontSize: '11px', marginTop: '8px' }}>Projects will appear here once they're uploaded to this department</p>
          </div>
        )}

        {/* Files Grid */}
        {!loading && projects.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 220px)',
            gap: '15px',
          }}>
            {projects.map((project) => (
              <RecentFileCard
                key={project._id}
                id={project._id}
                title={project.title}
                fileUrl={project.fileUrl}
                collection="projects"
              />
            ))}
          </div>
        )}
      </div>

      {/* File Upload Modal */}
      <FileUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        collection="projects"
        departmentObjectId={departmentData?._id}
        departmentName={departmentData?.name}
      />
    </main>
  );
};
