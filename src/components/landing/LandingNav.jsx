import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

export const LandingNav = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => navigate('/')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
            aria-label="Go to home page"
          >
            <img 
              src="/GDG.png" 
              alt="GDG Logo" 
              style={{ height: '40px' }}
            />
            <h1 className="text-2xl font-bold text-slate-900">Resource Hub</h1>
          </div>
          <div className="flex gap-4 items-center">
            {isAuthenticated ? (
              <>
                <div className="text-sm text-slate-600">
                  Welcome, <span className="font-semibold text-slate-900">{user?.name || user?.email || 'User'}</span>
                </div>
                <button
                  onClick={() => navigate('/home')}
                  className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium transition"
                  aria-label="Go to library"
                >
                  Library
                </button>
                <button
                  onClick={handleLogout}
                  className="px-6 py-2 border-2 text-slate-700 rounded-lg hover:bg-slate-50 transition font-medium"
                  style={{ borderColor: '#4285F4', color: '#4285F4' }}
                  aria-label="Logout"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium transition hidden sm:block"
                  aria-label="Go to login page"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="px-6 py-2 text-white rounded-lg hover:shadow-lg transition font-medium"
                  style={{ backgroundColor: '#4285F4' }}
                  aria-label="Sign up for an account"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
