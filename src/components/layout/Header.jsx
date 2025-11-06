export const Header = () => {
  return (
    <header className="flex items-center justify-center py-4 bg-white">
      <div className="flex items-center">
        <img 
          src="/GDG.png" 
          alt="GDG Logo" 
          style={{ height: '40px', marginRight: '24px' }}
        />
        <h1 
          style={{
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: '32px',
            color: '#000000',
            textTransform: 'capitalize',
          }}
        >
          GDG Resources Hub
        </h1>
      </div>
    </header>
  );
};
