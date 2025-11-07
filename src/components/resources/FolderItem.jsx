const FOLDER_IMAGES = {
  blue: '/Folderblue.png',
  yellow: '/Folderyellow.png',
  green: '/Foldergreen.png',
  red: '/folderred.png',
};

export const FolderItem = ({ name, color = 'blue', onClick, department, folderType }) => {
  const folderImage = FOLDER_IMAGES[color] || FOLDER_IMAGES.blue;

  return (
    <button
      onClick={onClick}
      className="transition-all hover:scale-105"
      style={{
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        padding: 0,
        position: 'relative',
        width: '180px',
        height: '140px',
        overflow: 'hidden',
        borderRadius: '8px',
      }}
    >
      <img
        src={folderImage}
        alt={`${name}`}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          objectFit: 'cover',
        }}
      />
      
      {/* Semi-transparent overlay at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))',
          padding: '16px 12px 12px 12px',
          height: '60%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          pointerEvents: 'none',
        }}
      >
        <div style={{
          fontFamily: 'Poppins',
          fontWeight: 500,
          fontSize: '11px',
          color: '#E5E7EB',
          lineHeight: '1.3',
          marginBottom: '4px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: '1',
          WebkitBoxOrient: 'vertical',
        }}>
          {department}
        </div>
        <div style={{
          fontFamily: 'Poppins',
          fontWeight: 600,
          fontSize: '13px',
          color: '#FFFFFF',
          lineHeight: '1.2',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: '2',
          WebkitBoxOrient: 'vertical',
        }}>
          {folderType}
        </div>
      </div>
    </button>
  );
};
