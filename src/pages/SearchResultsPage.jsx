
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from "@/components/layouts/MainLayout";
import { journalEntries, users, popularTags, popularLocations } from '@/utils/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import JournalCard from '@/components/journal/JournalCard';
import RoammateCard from '@/components/social/RoammateCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search as SearchIcon, Filter, MapPin, Calendar, Tag, User, X, Map } from 'lucide-react';
import { format } from 'date-fns';

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [activeTab, setActiveTab] = useState('journals');
  const [filters, setFilters] = useState({
    date: '',
    tags: []
  });
  
  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      setSearchParams({ q: searchTerm });
    }
  };
  
  // Filter results based on search term and filters
  const getFilteredResults = () => {
    if (!searchQuery) return { entries: [], users: [], tags: [], locations: [] };
    
    const lowercaseQuery = searchQuery.toLowerCase();
    
    // Filter journal entries
    let filteredEntries = journalEntries.filter(entry => 
      entry.title.toLowerCase().includes(lowercaseQuery) || 
      entry.location.toLowerCase().includes(lowercaseQuery) ||
      entry.content.toLowerCase().includes(lowercaseQuery) ||
      entry.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
    
    // Apply additional filters if any
    if (filters.date) {
      // This is a simplified example - in a real app, you'd have more sophisticated date filtering
      filteredEntries = filteredEntries.filter(entry => 
        format(entry.date, 'yyyy-MM') === filters.date
      );
    }
    
    if (filters.tags.length > 0) {
      filteredEntries = filteredEntries.filter(entry => 
        filters.tags.some(tag => entry.tags.includes(tag))
      );
    }
    
    // Filter users
    const filteredUsers = users.filter(user => 
      user.name.toLowerCase().includes(lowercaseQuery) || 
      user.username.toLowerCase().includes(lowercaseQuery) ||
      user.bio?.toLowerCase().includes(lowercaseQuery)
    );
    
    // Filter tags
    const filteredTags = popularTags.filter(tag => 
      tag.name.toLowerCase().includes(lowercaseQuery)
    );
    
    // Filter locations
    const filteredLocations = popularLocations.filter(location => 
      location.name.toLowerCase().includes(lowercaseQuery)
    );
    
    return { entries: filteredEntries, users: filteredUsers, tags: filteredTags, locations: filteredLocations };
  };
  
  const { entries, users: filteredUsers, tags, locations } = getFilteredResults();
  
  const addTagFilter = (tag) => {
    if (!filters.tags.includes(tag)) {
      setFilters({...filters, tags: [...filters.tags, tag]});
    }
  };
  
  const removeTagFilter = (tag) => {
    setFilters({...filters, tags: filters.tags.filter(t => t !== tag)});
  };
  
  const clearFilters = () => {
    setFilters({ date: '', tags: [] });
  };
  
  return (
    <MainLayout>
      <div className="container py-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Search Results</h1>
            <p className="text-muted-foreground">
              {searchQuery ? `Search results for "${searchQuery}"` : 'Enter a search query to get started'}
            </p>
          </div>
        </div>
        
        <div className="bg-card shadow rounded-xl p-6">
          <form onSubmit={handleSearch} className="relative mb-4">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search journals, places, people..."
              className="pl-10 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button 
              type="submit" 
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-md h-8"
            >
              Search
            </Button>
          </form>
          
          <div className="flex flex-wrap gap-2 items-center mt-4">
            <Filter size={18} className="text-muted-foreground mr-1" />
            <span className="text-sm font-medium">Filters:</span>
            
            <div className="flex flex-wrap gap-2 items-center">
              <select 
                value={filters.date} 
                onChange={(e) => setFilters({...filters, date: e.target.value})}
                className="h-8 rounded-md border border-input bg-transparent px-3 py-1 text-sm text-muted-foreground"
              >
                <option value="">Any Date</option>
                <option value="2023-01">January 2023</option>
                <option value="2023-02">February 2023</option>
                <option value="2023-03">March 2023</option>
                <option value="2023-04">April 2023</option>
                <option value="2023-05">May 2023</option>
                <option value="2023-06">June 2023</option>
              </select>
              
              {filters.tags.map(tag => (
                <Badge key={tag} className="flex items-center gap-1 bg-primary/20 text-primary hover:bg-primary/30">
                  {tag}
                  <X size={14} className="cursor-pointer" onClick={() => removeTagFilter(tag)} />
                </Badge>
              ))}
              
              {(filters.date || filters.tags.length > 0) && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8">
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="journals" className="flex items-center gap-1">
              <Calendar size={16} />
              <span>Journals</span>
              <Badge variant="secondary" className="ml-1 rounded-full">{entries.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="people" className="flex items-center gap-1">
              <User size={16} />
              <span>People</span>
              <Badge variant="secondary" className="ml-1 rounded-full">{filteredUsers.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="places" className="flex items-center gap-1">
              <Map size={16} />
              <span>Places</span>
              <Badge variant="secondary" className="ml-1 rounded-full">{locations.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="tags" className="flex items-center gap-1">
              <Tag size={16} />
              <span>Tags</span>
              <Badge variant="secondary" className="ml-1 rounded-full">{tags.length}</Badge>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="journals">
            {entries.length === 0 ? (
              <div className="text-center py-12">
                <Calendar size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Journal Entries Found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search terms or filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {entries.map(entry => (
                  <JournalCard
                    key={entry.id}
                    id={entry.id}
                    title={entry.title}
                    excerpt={entry.excerpt}
                    location={entry.location}
                    date={entry.date}
                    imageUrl={entry.imageUrl}
                    author={entry.author}
                    likes={entry.likes}
                    comments={entry.comments}
                    tags={entry.tags}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="people">
            {filteredUsers.length === 0 ? (
              <div className="text-center py-12">
                <User size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Users Found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUsers.map(user => (
                  <RoammateCard
                    key={user.id}
                    user={user}
                    connectionStatus="suggested"
                    onConnect={() => console.log(`Connect with ${user.name}`)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="places">
            {locations.length === 0 ? (
              <div className="text-center py-12">
                <MapPin size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Locations Found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search terms</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {locations.map(location => (
                  <div key={location.name} className="bg-card border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start">
                      <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center mr-4">
                        <MapPin size={24} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{location.name}</h3>
                        <p className="text-sm text-muted-foreground">{location.count} journal entries</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          View on Map
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="tags">
            {tags.length === 0 ? (
              <div className="text-center py-12">
                <Tag size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Tags Found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search terms</p>
              </div>
            ) : (
              <div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {tags.map(tag => (
                    <Badge 
                      key={tag.name} 
                      className="px-3 py-2 text-base cursor-pointer bg-muted/70 hover:bg-primary/10 hover:text-primary"
                      onClick={() => addTagFilter(tag.name)}
                    >
                      {tag.name}
                      <span className="ml-2 text-muted-foreground">({tag.count})</span>
                    </Badge>
                  ))}
                </div>
                
                <h3 className="font-semibold mb-4">Related Journal Entries</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {entries.slice(0, 3).map(entry => (
                    <JournalCard
                      key={entry.id}
                      id={entry.id}
                      title={entry.title}
                      excerpt={entry.excerpt}
                      location={entry.location}
                      date={entry.date}
                      imageUrl={entry.imageUrl}
                      author={entry.author}
                      likes={entry.likes}
                      comments={entry.comments}
                      tags={entry.tags}
                    />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default SearchResultsPage;
