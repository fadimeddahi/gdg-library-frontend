import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
        <h3 className="text-4xl md:text-5xl font-bold">Ready to Get Started?</h3>
        <p className="text-xl text-blue-100">
          Join thousands of GDG members exploring and sharing resources
        </p>
        <button
          onClick={() => navigate('/signup')}
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg hover:shadow-lg transition font-semibold group"
        >
          Sign Up Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
        </button>
      </div>
    </section>
  );
};
