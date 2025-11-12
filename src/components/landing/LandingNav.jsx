import { useNavigate } from 'react-router-dom';

export const LandingNav = () => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">GDG</span>
            </div>
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
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition font-medium"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
