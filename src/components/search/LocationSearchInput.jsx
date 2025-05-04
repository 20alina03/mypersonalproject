
import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { popularLocations } from '@/utils/mockData';

const LocationSearchInput = ({ initialLocation = '', onLocationChange }) => {
  const [location, setLocation] = useState(initialLocation);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  useEffect(() => {
    if (location.length > 1) {
      // Filter locations based on input
      const filteredLocations = popularLocations.filter(loc => 
        loc.name.toLowerCase().includes(location.toLowerCase())
      );
      setSuggestions(filteredLocations);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [location]);
  
  const handleSelectLocation = (selectedLocation) => {
    setLocation(selectedLocation);
    onLocationChange(selectedLocation);
    setShowSuggestions(false);
  };
  
  const clearLocation = () => {
    setLocation('');
    onLocationChange('');
  };
  
  return (
    <div className="relative">
      <div className="flex items-center">
        <div className="relative flex-grow">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by location..."
            className="pl-9 pr-10"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={() => setShowSuggestions(location.length > 1)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          />
          {location && (
            <Button 
              type="button" 
              variant="ghost" 
              size="icon"
              onClick={clearLocation}
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
            >
              <X size={14} />
            </Button>
          )}
        </div>
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute w-full mt-1 bg-background border rounded-md shadow-md z-10">
          <div className="p-2">
            <p className="text-xs text-muted-foreground mb-2">Suggestions</p>
            <div className="space-y-1">
              {suggestions.map(suggestion => (
                <div
                  key={suggestion.name}
                  className="flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer"
                  onClick={() => handleSelectLocation(suggestion.name)}
                >
                  <MapPin size={14} className="text-muted-foreground" />
                  <span>{suggestion.name}</span>
                  <Badge variant="outline" className="ml-auto text-xs">
                    {suggestion.count}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-2 flex flex-wrap gap-1">
        {popularLocations.slice(0, 4).map(location => (
          <Badge
            key={location.name}
            variant="outline"
            className="cursor-pointer bg-muted/50"
            onClick={() => handleSelectLocation(location.name)}
          >
            <MapPin size={10} className="mr-1" />
            {location.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default LocationSearchInput;
