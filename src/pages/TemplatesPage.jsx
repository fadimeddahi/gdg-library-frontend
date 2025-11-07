import { Search, Plus } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { RecentFileCard } from '../components/resources/RecentFileCard';
import templateService from '../services/templateService';
import { departmentService } from '../services/departmentService';
import { FileUploadModal } from '../components/common/FileUploadModal';

export const TemplatesPage = () => {
  const { departmentId } = useParams();
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [departmentData, setDepartmentData] = useState(null);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [fileTypeFilter, setFileTypeFilter] = useState('');

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const dept = await departmentService.getDepartmentBySlug(departmentId);
        setDepartmentData(dept);
      } catch (error) {
        console.error('Failed to fetch department details:', error);
      }
    };

    if (departmentId) {
      fetchDepartment();
    }
  }, [departmentId]);

  useEffect(() => {
    const fetchTemplates = async () => {
      if (!departmentData?._id) return;

      try {
        setLoading(true);
        setError(null);
        
        const result = await templateService.getTemplatesByDepartment(departmentData._id, {
          search: searchQuery,
          page: page,
          limit: 10,
        });
        
        let filteredTemplates = result.templates || [];
        
        if (searchQuery && searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          filteredTemplates = filteredTemplates.filter(template => 
            template.title?.toLowerCase().includes(query)
          );
        }
        
        if (fileTypeFilter && fileTypeFilter !== 'all') {
          filteredTemplates = filteredTemplates.filter(template => {
            const fileUrl = template.fileUrl?.toLowerCase() || '';
            switch(fileTypeFilter) {
              case 'pdf':
                return fileUrl.endsWith('.pdf');
              case 'word':
                return fileUrl.endsWith('.docx') || fileUrl.endsWith('.doc');
              case 'excel':
                return fileUrl.endsWith('.xlsx') || fileUrl.endsWith('.xls');
              case 'powerpoint':
                return fileUrl.endsWith('.pptx') || fileUrl.endsWith('.ppt');
              case 'image':
                return fileUrl.endsWith('.jpg') || fileUrl.endsWith('.jpeg') || fileUrl.endsWith('.png') || fileUrl.endsWith('.gif');
              default:
                return true;
            }
          });
        }
        
        setTemplates(filteredTemplates);
      } catch (err) {
        console.error('Error fetching templates:', err);
        setError(err.message || 'Failed to load templates');
        setTemplates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [departmentData, searchQuery, page, fileTypeFilter]);

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
          Templates Folder
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
              setPage(1);
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
            value={fileTypeFilter}
            onChange={(e) => setFileTypeFilter(e.target.value)}
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
            <option value="">All Types</option>
            <option value="pdf">PDF</option>
            <option value="word">Word</option>
            <option value="excel">Excel</option>
            <option value="powerpoint">PowerPoint</option>
            <option value="image">Image</option>
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
            <p style={{ fontFamily: 'Poppins', fontSize: '13px' }}>Loading templates...</p>
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
        {!loading && !error && templates.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#6B7280',
            fontFamily: 'Poppins',
            fontSize: '13px',
          }}>
            <p>📁 No templates yet</p>
            <p style={{ fontSize: '11px', marginTop: '8px' }}>Templates will appear here once they're uploaded to this department</p>
          </div>
        )}

        {/* Files Grid */}
        {!loading && templates.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 220px)',
            gap: '15px',
          }}>
            {templates.map((template) => (
              <RecentFileCard
                key={template._id}
                id={template._id}
                title={template.title}
                fileUrl={template.fileUrl}
                collection="templates"
              />
            ))}
          </div>
        )}
      </div>

      {/* File Upload Modal */}
      <FileUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        collection="templates"
        departmentObjectId={departmentData?._id}
        departmentName={departmentData?.name}
      />
    </main>
  );
};
