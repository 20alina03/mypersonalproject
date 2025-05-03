
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, X, Calendar, MapPin, Tag, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { journalEntries, users, popularTags, popularLocations } from '@/utils/mockData';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const searchRef = useRef(null);
  const navigate = useNavigate();
  
  // Filter results based on query and active tab
  const getFilteredResults = () => {
    if (!query.trim()) return { entries: [], users: [], tags: [], locations: [] };
    
    const lowercaseQuery = query.toLowerCase();
    
    const filteredEntries = journalEntries.filter(entry => 
      entry.title.toLowerCase().includes(lowercaseQuery) || 
      entry.location.toLowerCase().includes(lowercaseQuery) ||
      entry.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    ).slice(0, 3);
    
    const filteredUsers = users.filter(user => 
      user.name.toLowerCase().includes(lowercaseQuery) || 
      user.username.toLowerCase().includes(lowercaseQuery)
    ).slice(0, 3);
    
    const filteredTags = popularTags.filter(tag => 
      tag.name.toLowerCase().includes(lowercaseQuery)
    ).slice(0, 3);
    
    const filteredLocations = popularLocations.filter(location => 
      location.name.toLowerCase().includes(lowercaseQuery)
    ).slice(0, 3);
    
    return { entries: filteredEntries, users: filteredUsers, tags: filteredTags, locations: filteredLocations };
  };
  
  const { entries, users: filteredUsers, tags, locations } = getFilteredResults();
  
  const hasResults = entries.length > 0 || filteredUsers.length > 0 || tags.length > 0 || locations.length > 0;
  
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
      // In a real app, this would navigate to search results page
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
          <div className="flex border-b">
            <button
              className={`flex-1 p-2 text-sm font-medium text-center ${activeTab === 'all' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            <button
              className={`flex-1 p-2 text-sm font-medium text-center ${activeTab === 'journals' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setActiveTab('journals')}
            >
              Journals
            </button>
            <button
              className={`flex-1 p-2 text-sm font-medium text-center ${activeTab === 'people' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setActiveTab('people')}
            >
              People
            </button>
            <button
              className={`flex-1 p-2 text-sm font-medium text-center ${activeTab === 'places' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setActiveTab('places')}
            >
              Places
            </button>
          </div>
          
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {!hasResults && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No results found for "{query}"</p>
              </div>
            )}
            
            {(activeTab === 'all' || activeTab === 'journals') && entries.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2 text-muted-foreground flex items-center gap-1">
                  <Calendar size={14} /> Journal Entries
                </h3>
                <div className="space-y-2">
                  {entries.map(entry => (
                    <div key={entry.id} className="flex items-start p-2 hover:bg-muted/50 rounded-md cursor-pointer">
                      {entry.imageUrl ? (
                        <div className="h-10 w-12 rounded overflow-hidden mr-3 shrink-0">
                          <img
                            src={entry.imageUrl}
                            alt={entry.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-10 w-12 bg-muted rounded flex items-center justify-center mr-3 shrink-0">
                          <Calendar size={16} className="text-muted-foreground" />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-medium truncate">{entry.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-muted-foreground flex items-center">
                            <MapPin size={10} className="mr-1" />{entry.location}
                          </p>
                          <span className="text-xs text-muted-foreground">•</span>
                          <p className="text-xs text-muted-foreground">
                            {format(entry.date, 'MMM d, yyyy')}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {(activeTab === 'all' || activeTab === 'people') && filteredUsers.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2 text-muted-foreground flex items-center gap-1">
                  <User size={14} /> People
                </h3>
                <div className="space-y-2">
                  {filteredUsers.map(user => (
                    <div key={user.id} className="flex items-center p-2 hover:bg-muted/50 rounded-md cursor-pointer">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={user.avatar || '/placeholder.svg'} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-sm font-medium">{user.name}</h4>
                        <p className="text-xs text-muted-foreground">@{user.username}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {(activeTab === 'all' || activeTab === 'journals') && tags.length > 0 && (
              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2 text-muted-foreground flex items-center gap-1">
                  <Tag size={14} /> Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <Badge key={tag.name} variant="secondary" className="cursor-pointer">
                      {tag.name} <span className="ml-1 text-muted-foreground">({tag.count})</span>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            {(activeTab === 'all' || activeTab === 'places') && locations.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2 text-muted-foreground flex items-center gap-1">
                  <MapPin size={14} /> Places
                </h3>
                <div className="space-y-2">
                  {locations.map(location => (
                    <div key={location.name} className="flex items-center p-2 hover:bg-muted/50 rounded-md cursor-pointer">
                      <div className="h-8 w-8 rounded-full bg-muted/50 flex items-center justify-center mr-3">
                        <MapPin size={16} className="text-muted-foreground" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{location.name}</h4>
                        <p className="text-xs text-muted-foreground">{location.count} journal entries</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
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
