export const RecentFileCard = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="transition-all hover:shadow-lg"
      style={{
        background: '#FFFFFF',
        borderRadius: '10px',
        padding: '12px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        width: '220px',
        height: '120px',
        border: 'none',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
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
        {title}
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
