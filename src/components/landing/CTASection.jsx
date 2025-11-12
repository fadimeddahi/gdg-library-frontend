import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: '#4285F4' }}>
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: 'white' }}></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full opacity-10 blur-3xl" style={{ backgroundColor: 'white' }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 text-center space-y-8 relative">
        <h3 className="text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight">
          Ready to Get Started?
        </h3>
        <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
          Join thousands of GDG members exploring and sharing resources to grow together
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button
            onClick={() => navigate('/signup')}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white rounded-xl hover:shadow-2xl transition-all duration-300 font-semibold hover:scale-105"
            style={{ color: '#4285F4' }}
          >
            Sign Up Now <ArrowRight className="w-5 h-5" />
          </button>
          <button
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white/10 transition-all duration-300 font-semibold"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};
