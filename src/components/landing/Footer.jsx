/**
 * Footer component with navigation links and department list
 * @param {Object} props - Component props
 * @param {Array} props.departments - Array of department objects for footer links
 */
export const Footer = ({ departments }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/GDG.png" 
                alt="GDG Logo" 
                style={{ height: '32px' }}
              />
              <h5 className="font-bold text-white text-lg">Resource Hub</h5>
            </div>
            <p className="text-sm leading-relaxed font-light text-slate-400">
              Empowering the Google Developer Groups Algiers community with organized, accessible resources.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-semibold text-white mb-6 tracking-tight">Quick Links</h5>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-white transition font-light">Home</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition font-light">Departments</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition font-light">About</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition font-light">Privacy</a></li>
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h5 className="font-semibold text-white mb-6 tracking-tight">Departments</h5>
            <ul className="space-y-3 text-sm">
              {departments.slice(0, 4).map((dept) => (
                <li key={dept._id}>
                  <a href="#" className="text-slate-400 hover:text-white transition font-light">
                    {dept.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h5 className="font-semibold text-white mb-6 tracking-tight">Community</h5>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-slate-400 hover:text-white transition font-light">GDG Algiers</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition font-light">Contact Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition font-light">Support</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition font-light">Feedback</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 font-light">© 2025 GDG Resource Hub. All rights reserved.</p>
            <p className="text-sm text-slate-500 font-light">Built with <span className="text-red-500">❤️</span> for GDG Algiers</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
