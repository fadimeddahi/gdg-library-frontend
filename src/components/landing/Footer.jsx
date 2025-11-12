export const Footer = ({ departments }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h5 className="font-semibold text-white mb-4">GDG Resource Hub</h5>
            <p className="text-sm">Empowering the Google Developer Groups Algiers community with organized resources.</p>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-4">Quick Links</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Home</a></li>
              <li><a href="#" className="hover:text-white transition">Departments</a></li>
              <li><a href="#" className="hover:text-white transition">About</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-4">Departments</h5>
            <ul className="space-y-2 text-sm">
              {departments.slice(0, 3).map((dept) => (
                <li key={dept._id}><a href="#" className="hover:text-white transition">{dept.name}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-4">Community</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">GDG Algiers</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
              <li><a href="#" className="hover:text-white transition">Support</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-slate-400">© 2025 GDG Resource Hub. All rights reserved.</p>
          <p className="text-sm text-slate-400">Built with ❤️ for GDG Algiers</p>
        </div>
      </div>
    </footer>
  );
};
