
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, X } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchForm = ({ initialQuery = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [, setSearchParams] = useSearchParams();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      setSearchParams({ q: searchTerm });
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    setSearchParams({});
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSearch} 
      className="relative mb-4"
    >
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
    </motion.form>
  );
};

export default SearchForm;
