const FOLDER_IMAGES = {
  blue: '/Folderblue.png',
  yellow: '/Folderyellow.png',
  green: '/Foldergreen.png',
  red: '/folderred.png',
};

export const FolderItem = ({ name, color = 'blue', onClick }) => {
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
        width: '131px',
        height: '87px',
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
      <span
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'Poppins',
          fontWeight: 600,
          fontSize: '7px',
          color: '#FFFFFF',
          textAlign: 'center',
          width: '80%',
          pointerEvents: 'none',
        }}
      >
        {name}
      </span>
    </button>
  );
};
