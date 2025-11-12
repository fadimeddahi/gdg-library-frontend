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
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h3 className="text-4xl font-bold text-slate-900 mb-2">Explore Our Departments</h3>
          <p className="text-slate-600">
            {departments.length} department{departments.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dept) => (
            <div
              key={dept._id}
              onClick={() => handleDepartmentClick(dept)}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white border-2 border-slate-200 hover:border-blue-400 transition-all duration-300 h-full">
                {/* Header with gradient */}
                <div
                  className="h-32 relative overflow-hidden"
                  style={{ backgroundColor: getDepartmentColor(dept.slug) + '20' }}
                >
                  <div className="absolute inset-0 opacity-20" style={{ backgroundColor: getDepartmentColor(dept.slug) }}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl">{getDepartmentIcon(dept.slug)}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h4 className="text-2xl font-bold text-slate-900">{dept.name}</h4>
                  <p className="text-slate-600 line-clamp-2 text-sm">{dept.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <Folder className="w-4 h-4 text-slate-400" />
                      <span className="text-sm text-slate-500">Resources available</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition" />
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
