
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from "@/components/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Calendar, Map, Tag, User } from 'lucide-react';
import { motion } from 'framer-motion';

// Import components
import SearchForm from '@/components/search/SearchForm';
import SearchFilters from '@/components/search/SearchFilters';
import JournalsTab from '@/components/search/tabs/JournalsTab';
import PeopleTab from '@/components/search/tabs/PeopleTab';
import PlacesTab from '@/components/search/tabs/PlacesTab';
import TagsTab from '@/components/search/tabs/TagsTab';
import LocationSearchInput from '@/components/search/LocationSearchInput';
import useSearchResults from '@/hooks/useSearchResults';

const SearchResultsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const initialTab = searchParams.get('tab') || 'journals';
  const initialLocation = searchParams.get('location') || '';
  const initialTags = searchParams.get('tags') ? searchParams.get('tags').split(',') : [];
  
  const [activeTab, setActiveTab] = useState(initialTab);
  const [filters, setFilters] = useState({
    date: searchParams.get('date') || '',
    location: initialLocation,
    tags: initialTags
  });
  
  // Use our custom hook for search results
  const { entries, users, tags, locations } = useSearchResults(searchQuery, filters);
  
  // Update URL when tab changes
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('tab', activeTab);
    setSearchParams(newParams);
  }, [activeTab, setSearchParams]);
  
  const addTagFilter = (tag) => {
    if (!filters.tags.includes(tag)) {
      const newTags = [...filters.tags, tag];
      setFilters({...filters, tags: newTags});
      
      // Update URL with new tags
      const newParams = new URLSearchParams(searchParams);
      newParams.set('tags', newTags.join(','));
      setSearchParams(newParams);
    }
  };
  
  const handleLocationChange = (location) => {
    setFilters({...filters, location});
    
    // Update URL with new location
    const newParams = new URLSearchParams(searchParams);
    if (location) {
      newParams.set('location', location);
    } else {
      newParams.delete('location');
    }
    setSearchParams(newParams);
  };
  
  return (
    <MainLayout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container py-6 space-y-6"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Search Results</h1>
            <p className="text-muted-foreground">
              {searchQuery ? `Search results for "${searchQuery}"` : 'Enter a search query to get started'}
            </p>
          </div>
        </div>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="bg-card shadow rounded-xl p-6"
        >
          <div className="grid gap-6 md:grid-cols-[1fr_300px]">
            <div>
              <SearchForm initialQuery={searchQuery} initialFilters={filters} />
              <SearchFilters filters={filters} setFilters={setFilters} />
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Filter by Location</h3>
              <LocationSearchInput 
                initialLocation={filters.location}
                onLocationChange={handleLocationChange}
              />
            </div>
          </div>
        </motion.div>
        
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
              <Badge variant="secondary" className="ml-1 rounded-full">{users.length}</Badge>
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
            <JournalsTab entries={entries} addTagFilter={addTagFilter} />
          </TabsContent>
          
          <TabsContent value="people">
            <PeopleTab users={users} />
          </TabsContent>
          
          <TabsContent value="places">
            <PlacesTab locations={locations} />
          </TabsContent>
          
          <TabsContent value="tags">
            <TagsTab tags={tags} entries={entries} addTagFilter={addTagFilter} />
          </TabsContent>
        </Tabs>
      </motion.div>
    </MainLayout>
  );
};

export default SearchResultsPage;
