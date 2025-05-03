
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MainLayout from "@/components/layouts/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';
import { Calendar, Map, Tag, User } from 'lucide-react';

// Import our new components
import SearchForm from '@/components/search/SearchForm';
import SearchFilters from '@/components/search/SearchFilters';
import JournalsTab from '@/components/search/tabs/JournalsTab';
import PeopleTab from '@/components/search/tabs/PeopleTab';
import PlacesTab from '@/components/search/tabs/PlacesTab';
import TagsTab from '@/components/search/tabs/TagsTab';
import useSearchResults from '@/hooks/useSearchResults';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [activeTab, setActiveTab] = useState('journals');
  const [filters, setFilters] = useState({
    date: '',
    tags: []
  });
  
  // Use our custom hook for search results
  const { entries, users, tags, locations } = useSearchResults(searchQuery, filters);
  
  const addTagFilter = (tag) => {
    if (!filters.tags.includes(tag)) {
      setFilters({...filters, tags: [...filters.tags, tag]});
    }
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
          <SearchForm initialQuery={searchQuery} />
          <SearchFilters filters={filters} setFilters={setFilters} />
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
            <JournalsTab entries={entries} />
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
      </div>
    </MainLayout>
  );
};

export default SearchResultsPage;
