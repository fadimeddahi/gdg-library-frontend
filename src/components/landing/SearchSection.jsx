import { Search } from 'lucide-react';

export const SearchSection = ({ searchQuery, onSearchChange }) => {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search departments..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white border-2 border-slate-200 rounded-xl text-lg focus:outline-none focus:border-blue-500 transition"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
