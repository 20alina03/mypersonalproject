
import { Calendar, MapPin, Tag, User } from 'lucide-react';
import { JournalEntryResult, UserResult, TagResult, LocationResult } from './SearchResultItem';

const SearchResultsSection = ({ 
  activeTab, 
  entries, 
  users, 
  tags, 
  locations,
  onTagClick 
}) => {
  return (
    <div className="max-h-[60vh] overflow-y-auto p-2">
      {entries.length === 0 && users.length === 0 && tags.length === 0 && locations.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No results found</p>
        </div>
      )}
      
      {(activeTab === 'all' || activeTab === 'journals') && entries.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2 text-muted-foreground flex items-center gap-1">
            <Calendar size={14} /> Journal Entries
          </h3>
          <div className="space-y-2">
            {entries.map(entry => (
              <JournalEntryResult key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
      )}
      
      {(activeTab === 'all' || activeTab === 'people') && users.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2 text-muted-foreground flex items-center gap-1">
            <User size={14} /> People
          </h3>
          <div className="space-y-2">
            {users.map(user => (
              <UserResult key={user.id} user={user} />
            ))}
          </div>
        </div>
      )}
      
      {(activeTab === 'all' || activeTab === 'journals') && tags.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2 text-muted-foreground flex items-center gap-1">
            <Tag size={14} /> Tags
          </h3>
          <TagResult tags={tags} onTagClick={onTagClick} />
        </div>
      )}
      
      {(activeTab === 'all' || activeTab === 'places') && locations.length > 0 && (
        <div>
          <h3 className="text-sm font-medium mb-2 text-muted-foreground flex items-center gap-1">
            <MapPin size={14} /> Places
          </h3>
          <div className="space-y-2">
            {locations.map(location => (
              <LocationResult key={location.name} location={location} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResultsSection;
