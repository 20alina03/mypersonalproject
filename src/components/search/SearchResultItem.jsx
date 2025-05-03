
import { Calendar, MapPin, Tag, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';

export const JournalEntryResult = ({ entry }) => (
  <div className="flex items-start p-2 hover:bg-muted/50 rounded-md cursor-pointer">
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
);

export const UserResult = ({ user }) => (
  <div className="flex items-center p-2 hover:bg-muted/50 rounded-md cursor-pointer">
    <Avatar className="h-10 w-10 mr-3">
      <AvatarImage src={user.avatar || '/placeholder.svg'} />
      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
    </Avatar>
    <div>
      <h4 className="text-sm font-medium">{user.name}</h4>
      <p className="text-xs text-muted-foreground">@{user.username}</p>
    </div>
  </div>
);

export const TagResult = ({ tags, onTagClick }) => (
  <div className="flex flex-wrap gap-2">
    {tags.map(tag => (
      <Badge 
        key={tag.name} 
        variant="secondary" 
        className="cursor-pointer"
        onClick={() => onTagClick && onTagClick(tag)}
      >
        {tag.name} <span className="ml-1 text-muted-foreground">({tag.count})</span>
      </Badge>
    ))}
  </div>
);

export const LocationResult = ({ location }) => (
  <div className="flex items-center p-2 hover:bg-muted/50 rounded-md cursor-pointer">
    <div className="h-8 w-8 rounded-full bg-muted/50 flex items-center justify-center mr-3">
      <MapPin size={16} className="text-muted-foreground" />
    </div>
    <div>
      <h4 className="text-sm font-medium">{location.name}</h4>
      <p className="text-xs text-muted-foreground">{location.count} journal entries</p>
    </div>
  </div>
);
