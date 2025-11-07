import { useState } from 'react';

export const RecentFileCard = ({ id, title, fileUrl, collection, onClick }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    console.log('🔍 Card clicked:', { id, title, fileUrl, collection });
    
    // If there's a custom onClick handler, use it
    if (onClick) {
      onClick();
      return;
    }

    // If no fileUrl, do nothing
    if (!fileUrl) {
      console.log('⚠️ No file attached to this item');
      alert('No file attached to this item yet. Please ask the backend team to add file URLs.');
      return;
    }

    setIsLoading(true);
    console.log(`📂 Opening file from: ${fileUrl}`);
    
    try {
      // Increment view count
      console.log(`📊 Incrementing views for ${collection}/${id}`);
      const response = await fetch(`http://localhost:5000/api/v1/${collection}/${id}/views`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        console.warn(`⚠️ View increment failed with status ${response.status}`);
      } else {
        console.log('✅ View count incremented');
      }

      // Open file in new tab
      console.log(`🌐 Opening file in new tab`);
      window.open(fileUrl, '_blank');
    } catch (error) {
      console.error('❌ Error opening file:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="transition-all hover:shadow-lg"
      style={{
        background: '#FFFFFF',
        borderRadius: '10px',
        padding: '12px',
        cursor: fileUrl || onClick ? 'pointer' : 'default',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        width: '220px',
        height: '120px',
        border: 'none',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
        opacity: isLoading ? 0.7 : 1,
      }}
    >
      {/* Title on the left */}
      <h4
        style={{
          fontFamily: 'Poppins',
          fontWeight: 500,
          fontSize: '11px',
          color: '#000000',
          textAlign: 'left',
          flex: 1,
          marginRight: '10px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {isLoading ? 'Opening...' : title}
      </h4>

      {/* File preview on the right */}
      <div 
        style={{ 
          width: '85px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img 
          src="/paper.svg" 
          alt="Document" 
          style={{ 
            width: '100%', 
            height: '100%',
            objectFit: 'contain',
          }}
        />
      </div>
    </button>
  );
};
