import { Search } from 'lucide-react';

/**
 * Search Section Component
 * Provides a search input for filtering departments
 * 
 * @param {Object} props
 * @param {string} props.searchQuery - Current search query value
 * @param {Function} props.onSearchChange - Callback function when search input changes
 */
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
              className="w-full pl-12 pr-6 py-4 bg-white border-2 border-slate-200 rounded-xl text-lg focus:outline-none transition"
              style={{ focusBorderColor: '#4285F4' }}
              onFocus={(e) => e.target.style.borderColor = '#4285F4'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
