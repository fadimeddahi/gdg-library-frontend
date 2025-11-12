import { useNavigate } from 'react-router-dom';
import { ArrowRight, Folder } from 'lucide-react';

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Text */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                ✨ Welcome to GDG Resource Hub
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
              Organize Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Resources</span> Effortlessly
            </h2>
            <p className="text-xl text-slate-600 leading-relaxed">
              Discover, organize, and manage all GDG resources in one unified platform. From projects to guides, find everything you need to collaborate and grow.
            </p>
            <div className="flex gap-4 pt-4">
              <button
                onClick={() => navigate('/signup')}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition font-semibold group"
              >
                Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </button>
              <button
                className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition font-semibold"
              >
                Explore Now
              </button>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative h-96 lg:h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white h-full flex items-center justify-center">
              <div className="text-center space-y-4">
                <Folder className="w-24 h-24 mx-auto opacity-50" />
                <p className="text-2xl font-semibold">Your Resource Library</p>
                <p className="text-blue-100">7 departments × unlimited resources</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
