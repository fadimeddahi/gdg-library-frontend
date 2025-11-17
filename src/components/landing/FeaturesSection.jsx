import { Search, Zap, Users, BookOpen, Target, Globe } from 'lucide-react';

/**
 * Features section highlighting key benefits of the GDG Resource Hub
 * Displays 6 feature cards in a responsive grid layout
 */
export const FeaturesSection = () => {
  const features = [
    {
      icon: Search,
      title: 'Smart Discovery',
      description: 'Find exactly what you need with powerful search and filters across all departments.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Instantly access resources with our optimized platform built for speed and efficiency.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Save and organize resources in your personal library for easy collaboration.'
    },
    {
      icon: BookOpen,
      title: 'Rich Content',
      description: 'Access projects, events, templates, and guides from all GDG departments.'
    },
    {
      icon: Target,
      title: 'Organized Structure',
      description: 'Resources are organized by 7 specialized departments for better navigation.'
    },
    {
      icon: Globe,
      title: 'Community Driven',
      description: 'Built by and for the Google Developer Groups Algiers community.'
    },
  ];

  return (
    <section className="py-28 bg-gradient-to-b from-white to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h3 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
            Why Choose GDG<br />Resource Hub?
          </h3>
          <p className="text-xl text-slate-600 font-light max-w-2xl mx-auto">
            Everything you need to stay organized, connected, and productive with your GDG community
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="group relative p-8 bg-white rounded-2xl border-2 border-slate-100 hover:border-blue-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl" style={{ backgroundColor: '#4285F4' }}></div>
              
              {/* Content */}
              <div className="relative space-y-4">
                {/* Icon */}
                <div className="inline-flex p-3 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors">
                  <feature.icon className="w-6 h-6" style={{ color: '#4285F4', strokeWidth: 1.5 }} />
                </div>
                
                {/* Title */}
                <h4 className="text-2xl font-bold text-slate-900">{feature.title}</h4>
                
                {/* Description */}
                <p className="text-slate-600 leading-relaxed font-light">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
