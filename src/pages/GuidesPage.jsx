import { Search, Plus } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { RecentFileCard } from '../components/resources/RecentFileCard';
import guideService from '../services/guideService';
import { departmentService } from '../services/departmentService';

export const GuidesPage = () => {
  const { departmentId } = useParams();
  const navigate = useNavigate();
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [departmentData, setDepartmentData] = useState(null);

  // First, fetch the department to get its MongoDB ID
  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const dept = await departmentService.getDepartmentBySlug(departmentId);
        console.log('📋 Department data for guides:', dept);
        setDepartmentData(dept);
      } catch (error) {
        console.error('Failed to fetch department details:', error);
      }
    };

    if (departmentId) {
      fetchDepartment();
    }
  }, [departmentId]);

  // Then fetch guides using the department's MongoDB ID
  useEffect(() => {
    const fetchGuides = async () => {
      if (!departmentData?._id) {
        console.log('⏳ Waiting for department data...');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log('🔍 Fetching guides for department ID:', departmentData._id);
        
        const result = await guideService.getGuidesByDepartment(departmentData._id, {
          search: searchQuery,
          page: page,
          limit: 10,
        });
        
        console.log('📦 Full API response:', result);
        console.log('📋 Guides array:', result.guides);
        
        if (result.guides && result.guides.length > 0) {
          console.log('🔎 First guide details:', {
            id: result.guides[0]._id,
            title: result.guides[0].title,
            fileUrl: result.guides[0].fileUrl,
            hasFileUrl: !!result.guides[0].fileUrl,
          });
        }
        
        setGuides(result.guides);
        console.log('✅ Guides loaded:', result.guides);
      } catch (err) {
        console.error('❌ Error fetching guides:', err);
        setError(err.message || 'Failed to load guides');
        setGuides([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGuides();
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
          Guides Folder
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
            <p style={{ fontFamily: 'Poppins', fontSize: '13px' }}>Loading guides...</p>
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
        {!loading && !error && guides.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            color: '#6B7280',
            fontFamily: 'Poppins',
            fontSize: '13px',
          }}>
            <p>📁 No guides yet</p>
            <p style={{ fontSize: '11px', marginTop: '8px' }}>Guides will appear here once they're uploaded to this department</p>
          </div>
        )}

        {/* Files Grid */}
        {!loading && guides.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 220px)',
            gap: '15px',
          }}>
            {guides.map((guide) => (
              <RecentFileCard
                key={guide._id}
                id={guide._id}
                title={guide.title}
                fileUrl={guide.fileUrl}
                collection="guides"
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
};
