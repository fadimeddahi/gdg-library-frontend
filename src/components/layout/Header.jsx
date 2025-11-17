/**
 * Main header component displaying the GDG logo and site title
 * Shown on authenticated pages with centered layout
 */
export const Header = () => {
  return (
    <header className="flex items-center justify-center py-4 bg-white border-b border-gray-200">
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
