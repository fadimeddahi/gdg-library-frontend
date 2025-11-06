import { Search, Plus } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { RecentFileCard } from '../components/resources/RecentFileCard';

export const EventsPage = () => {
  const { departmentId } = useParams();
  const navigate = useNavigate();

  // Mock files data
  const files = [
    { id: 1, title: 'DevFest 2024 Plan.pdf' },
    { id: 2, title: 'Workshop Schedule.docx' },
    { id: 3, title: 'Event Budget.xlsx' },
    { id: 4, title: 'Speaker List.pdf' },
    { id: 5, title: 'Venue Details.docx' },
    { id: 6, title: 'Marketing Plan.pptx' },
  ];

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
          Events Folder
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

        {/* Files Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 220px)',
          gap: '15px',
        }}>
          {files.map((file) => (
            <RecentFileCard
              key={file.id}
              title={file.title}
              onClick={() => console.log(`Clicked: ${file.title}`)}
            />
          ))}
        </div>
      </div>
    </main>
  );
};
