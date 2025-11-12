import { useNavigate } from 'react-router-dom';
import { ArrowRight, Folder } from 'lucide-react';

export const DepartmentGrid = ({ departments, loading }) => {
  const navigate = useNavigate();

  const getDepartmentColor = (slug) => {
    const colorMap = {
      'design': '#FF6B6B',
      'dev': '#4285F4',
      'comm': '#34A853',
      'hr': '#FBBC04',
      'logistics': '#EA4335',
      'multimedia': '#9C27B0',
      'external': '#00BCD4',
    };
    return colorMap[slug] || '#4285F4';
  };

  const getDepartmentIcon = (slug) => {
    const iconMap = {
      'design': '🎨',
      'dev': '💻',
      'comm': '📢',
      'hr': '👥',
      'logistics': '📦',
      'multimedia': '🎬',
      'external': '🌐',
    };
    return iconMap[slug] || '📁';
  };

  const handleDepartmentClick = (dept) => {
    navigate(`/department/${dept.slug}`);
  };

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </section>
    );
  }

  if (departments.length === 0) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <p className="text-xl text-slate-500">No departments found matching your search.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="departments-section" className="py-28 bg-gradient-to-b from-blue-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <h3 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 tracking-tight">Explore Our Departments</h3>
          <p className="text-xl text-slate-600 font-light">
            Discover {departments.length} specialized department{departments.length !== 1 ? 's' : ''} with curated resources
          </p>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <div
              key={dept._id}
              onClick={() => handleDepartmentClick(dept)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-3xl bg-white border-2 border-slate-100 hover:border-blue-300 transition-all duration-300 h-full hover:shadow-2xl hover:-translate-y-1">
                {/* Glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `linear-gradient(135deg, ${getDepartmentColor(dept.slug)}15 0%, transparent 100%)` }}></div>
                
                {/* Header with gradient */}
                <div
                  className="h-40 relative overflow-hidden"
                  style={{ backgroundColor: getDepartmentColor(dept.slug) + '15' }}
                >
                  <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity" style={{ backgroundColor: getDepartmentColor(dept.slug) }}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-7xl drop-shadow-lg">{getDepartmentIcon(dept.slug)}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3 relative">
                  <h4 className="text-2xl font-bold text-slate-900">{dept.name}</h4>
                  <p className="text-slate-600 line-clamp-2 text-sm leading-relaxed font-light">{dept.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <Folder className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-500 font-light">Resources available</span>
                    </div>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" style={{ color: '#4285F4' }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
