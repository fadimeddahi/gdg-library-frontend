import { Plus } from 'lucide-react';

export const LibraryHeader = () => {
  return (
    <div style={{ paddingLeft: '48px', paddingRight: '48px', paddingTop: '16px', paddingBottom: '16px' }} className="flex items-center justify-between">
      <h2 
        style={{
          fontFamily: 'Poppins',
          fontWeight: 600,
          fontSize: '24px',
          color: '#000000',
        }}
      >
        Your Library
      </h2>
      
      <button
        className="flex items-center transition-all hover:opacity-80"
        style={{
          padding: '10px 20px',
          backgroundColor: '#3B82F6',
          color: '#FFFFFF',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'Poppins',
          fontWeight: 500,
          fontSize: '14px',
        }}
      >
        <Plus size={20} style={{ marginRight: '8px' }} />
        Addition
      </button>
    </div>
  );
};
