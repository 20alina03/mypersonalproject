
import { Filter, X } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const SearchFilters = ({ filters, setFilters }) => {
  const removeTagFilter = (tag) => {
    setFilters({...filters, tags: filters.tags.filter(t => t !== tag)});
  };
  
  const clearFilters = () => {
    setFilters({ date: '', tags: [] });
  };

  return (
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
  );
};

export default SearchFilters;
