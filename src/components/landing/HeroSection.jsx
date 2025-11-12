import { useNavigate } from 'react-router-dom';
import { ArrowRight, Folder } from 'lucide-react';

export const HeroSection = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    // Scroll to departments section
    const departmentsSection = document.getElementById('departments-section');
    if (departmentsSection) {
      departmentsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-white to-blue-50/30 pt-20 pb-32 md:pt-32 md:pb-40">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-0 w-72 h-72 rounded-full blur-3xl opacity-10" style={{ backgroundColor: '#4285F4' }}></div>
      <div className="absolute bottom-0 left-20 w-96 h-96 rounded-full blur-3xl opacity-5" style={{ backgroundColor: '#4285F4' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Hero Text */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-blue-200 bg-blue-50">
              <span className="text-lg">✨</span>
              <span className="text-sm font-medium text-slate-700">Welcome to GDG Resource Hub</span>
            </div>
            
            {/* Main Heading */}
            <div>
              <h2 
                className="text-6xl md:text-7xl font-bold leading-tight tracking-tight"
                style={{ color: '#1a202c' }}
              >
                Organize Your 
                <br />
                <span style={{ color: '#4285F4' }}>Resources</span>
                <br />
                Effortlessly
              </h2>
            </div>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl font-light">
              Discover, organize, and manage all GDG resources in one unified platform. From projects to guides, find everything you need to collaborate and grow.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                onClick={() => navigate('/signup')}
                className="flex items-center justify-center gap-3 px-8 py-4 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: '#4285F4' }}
              >
                Get Started <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={handleExplore}
                className="flex items-center justify-center gap-3 px-8 py-4 border-2 text-slate-700 rounded-xl font-semibold transition-all duration-300 hover:bg-slate-50 hover:border-slate-400"
                style={{ borderColor: '#4285F4', color: '#4285F4' }}
              >
                <Folder className="w-5 h-5" />
                Explore Departments
              </button>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative h-96 lg:h-[500px]">
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-3xl blur-3xl opacity-20" style={{ backgroundColor: '#4285F4' }}></div>
            
            {/* Main card */}
            <div 
              className="relative rounded-3xl overflow-hidden h-full shadow-2xl backdrop-blur-sm border border-blue-200/50"
              style={{ backgroundColor: 'rgba(66, 133, 244, 0.95)' }}
            >
              {/* Animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-transparent"></div>
              
              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-center text-white text-center p-8 space-y-6">
                <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <Folder className="w-20 h-20 mx-auto opacity-90" strokeWidth={1.5} />
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-bold tracking-tight">Your Resource Library</p>
                  <p className="text-lg opacity-90 font-light">7 departments</p>
                  <p className="text-lg opacity-90 font-light">Unlimited resources</p>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-6 w-full max-w-xs">
                  <div className="p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                    <p className="text-2xl font-bold">7</p>
                    <p className="text-xs opacity-80">Departments</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                    <p className="text-2xl font-bold">∞</p>
                    <p className="text-xs opacity-80">Resources</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                    <p className="text-2xl font-bold">100%</p>
                    <p className="text-xs opacity-80">Free</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
