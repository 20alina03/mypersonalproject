
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SearchTabs from './SearchTabs';
import SearchResultsSection from './SearchResultsSection';
import useSearchFilter from '@/hooks/useSearchFilter';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const searchRef = useRef(null);
  const navigate = useNavigate();
  
  // Get filtered results based on query
  const { entries, users, tags, locations } = useSearchFilter(query);
  
  const hasResults = entries.length > 0 || users.length > 0 || tags.length > 0 || locations.length > 0;
  
  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      console.log(`Searching for: ${query}`);
      setIsOpen(false);
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="relative w-full max-w-md" ref={searchRef}>
      <form onSubmit={handleSearch} className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        
        <Input
          type="search"
          placeholder="Search journals, places, users..."
          className="pl-9 pr-10 rounded-full h-10 border-muted bg-background/50 focus-visible:bg-background"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(e.target.value.trim().length > 0);
          }}
          onFocus={() => {
            if (query.trim().length > 0) setIsOpen(true);
          }}
        />
        
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0 rounded-full"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
          >
            <X size={14} />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </form>
      
      {isOpen && (
        <div className="absolute top-full mt-1 w-full bg-background border rounded-lg shadow-lg z-50 overflow-hidden">
          <SearchTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <SearchResultsSection 
            activeTab={activeTab}
            entries={entries}
            users={users}
            tags={tags}
            locations={locations}
          />
          
          <div className="p-2 bg-muted/30 border-t">
            <Button variant="ghost" size="sm" className="w-full text-primary" onClick={handleSearch}>
              <SearchIcon size={14} className="mr-2" />
              View all results for "{query}"
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
