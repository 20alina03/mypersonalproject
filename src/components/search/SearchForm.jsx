
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon } from 'lucide-react';

const SearchForm = ({ initialQuery = '' }) => {
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [, setSearchParams] = useSearchParams();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      setSearchParams({ q: searchTerm });
    }
  };

  return (
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
  );
};

export default SearchForm;
