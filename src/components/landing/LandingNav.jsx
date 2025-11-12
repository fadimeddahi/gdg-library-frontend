import { useNavigate } from 'react-router-dom';

export const LandingNav = () => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/GDG.png" 
              alt="GDG Logo" 
              style={{ height: '40px' }}
            />
            <h1 className="text-2xl font-bold text-slate-900">Resource Hub</h1>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-6 py-2 text-white rounded-lg hover:shadow-lg transition font-medium"
              style={{ backgroundColor: '#4285F4' }}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
