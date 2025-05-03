
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserCheck, UserPlus, MessageSquare, MapPin } from "lucide-react";
import { formatDistance } from "date-fns";

const RoammateCard = ({ user, connectionStatus, onConnect, onAccept }) => {
  // Helper to generate avatar fallback from name
  const generateInitials = (name) => {
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  };

  // Determine shared interests to display (limit to 3)
  const displayInterests = user.travelInterests?.slice(0, 3) || [];

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="h-16 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
        <div className="px-4 pt-0 pb-4 relative">
          <Avatar className="h-20 w-20 border-4 border-card absolute -top-10">
            <AvatarImage src={user.avatar || '/placeholder.svg'} />
            <AvatarFallback className="text-lg bg-primary/10 text-primary">
              {generateInitials(user.name)}
            </AvatarFallback>
          </Avatar>
          
          <div className="pt-12 pb-2">
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <p className="text-sm text-muted-foreground">@{user.username}</p>
            
            {user.location && (
              <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                <MapPin size={14} />
                <span>{user.location}</span>
              </div>
            )}
            
            <div className="mt-3 flex flex-wrap gap-1">
              {displayInterests.map((interest) => (
                <Badge key={interest} variant="outline" className="bg-muted/50">
                  {interest}
                </Badge>
              ))}
              {user.travelInterests?.length > 3 && (
                <Badge variant="outline" className="bg-muted/50">
                  +{user.travelInterests.length - 3} more
                </Badge>
              )}
            </div>
            
            <div className="flex text-sm mt-3">
              <div className="flex-1">
                <p className="font-semibold">{user.placesVisited}</p>
                <p className="text-xs text-muted-foreground">Places</p>
              </div>
              <div className="flex-1">
                <p className="font-semibold">{user.followers}</p>
                <p className="text-xs text-muted-foreground">Followers</p>
              </div>
              <div className="flex-1">
                <p className="font-semibold">
                  {formatDistance(user.joinedDate, new Date(), { addSuffix: false })}
                </p>
                <p className="text-xs text-muted-foreground">Member</p>
              </div>
            </div>
            
            <div className="mt-4 flex gap-2">
              {connectionStatus === 'connected' && (
                <>
                  <Button variant="outline" className="flex-1 rounded-full h-9" size="sm">
                    <MessageSquare size={16} className="mr-1" />
                    Message
                  </Button>
                  <Button className="flex-1 rounded-full h-9 bg-primary" size="sm">
                    <UserCheck size={16} className="mr-1" />
                    Connected
                  </Button>
                </>
              )}
              
              {connectionStatus === 'pending' && (
                <>
                  <Button variant="outline" className="flex-1 rounded-full h-9" size="sm" onClick={onAccept}>
                    Accept
                  </Button>
                  <Button variant="secondary" className="flex-1 rounded-full h-9" size="sm">
                    Ignore
                  </Button>
                </>
              )}
              
              {connectionStatus === 'suggested' && (
                <Button className="w-full rounded-full h-9" size="sm" onClick={onConnect}>
                  <UserPlus size={16} className="mr-1" />
                  Connect
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoammateCard;
