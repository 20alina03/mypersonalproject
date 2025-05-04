
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, X, CalendarIcon, MapPin, Tag } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const SearchForm = ({ initialQuery = '', initialFilters = {} }) => {
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [date, setDate] = useState(initialFilters.date ? new Date(initialFilters.date) : null);
  const [location, setLocation] = useState(initialFilters.location || '');
  const [tags, setTags] = useState(initialFilters.tags || []);
  const [, setSearchParams] = useSearchParams();

  const handleSearch = (e) => {
    e.preventDefault();
    
    const params = { q: searchTerm };
    
    if (date) {
      params.date = format(date, 'yyyy-MM');
    }
    
    if (location) {
      params.location = location;
    }
    
    if (tags.length > 0) {
      params.tags = tags.join(',');
    }
    
    setSearchParams(params);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setDate(null);
    setLocation('');
    setTags([]);
    setSearchParams({});
  };
  
  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSearch} 
      className="space-y-4"
    >
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search journals, places, people..."
          className="pl-10 pr-20 rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <Button 
            type="button" 
            variant="ghost" 
            size="icon"
            onClick={clearSearch}
            className="absolute right-12 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
          >
            <X size={16} />
          </Button>
        )}
        <Button 
          type="submit" 
          className="absolute right-1 top-1/2 -translate-y-1/2 rounded-md h-8"
        >
          Search
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
              <CalendarIcon size={14} />
              {date ? format(date, 'MMM yyyy') : "Filter by Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
              <MapPin size={14} />
              {location || "Filter by Location"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Popular Locations</h4>
              <div className="grid grid-cols-2 gap-1">
                {['Paris, France', 'Tokyo, Japan', 'New York, USA', 'Bali, Indonesia'].map(loc => (
                  <Badge 
                    key={loc}
                    variant="outline" 
                    className="cursor-pointer justify-center"
                    onClick={() => setLocation(loc)}
                  >
                    {loc}
                  </Badge>
                ))}
              </div>
              <Input 
                placeholder="Enter location..." 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
                className="mt-2"
              />
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <Badge key={tag} className="bg-primary/10 text-primary">
            {tag}
            <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-1" onClick={() => removeTag(tag)}>
              <X size={10} />
            </Button>
          </Badge>
        ))}
      </div>
    </motion.form>
  );
};

export default SearchForm;
