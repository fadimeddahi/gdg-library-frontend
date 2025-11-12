import { Search, Zap, Users, BookOpen, Target, Globe } from 'lucide-react';

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
    <section className="py-20 bg-white/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-slate-900 mb-4">Why Choose GDG Resource Hub?</h3>
          <p className="text-xl text-slate-600">Everything you need to stay organized and connected</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="p-6 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition">
              <feature.icon className="w-12 h-12 text-blue-500 mb-4" />
              <h4 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h4>
              <p className="text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
