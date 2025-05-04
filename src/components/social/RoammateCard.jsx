
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserCheck, UserPlus, MessageSquare, MapPin, Star } from "lucide-react";
import { formatDistance } from "date-fns";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { toast } from "@/hooks/use-toast";

const RoammateCard = ({ user, connectionStatus, onConnect, onAccept, onViewProfile, onMessage }) => {
  // Determine shared interests to display (limit to 3)
  const displayInterests = user.travelInterests?.slice(0, 3) || [];

  const handleIgnore = () => {
    toast({
      title: "Request ignored",
      description: `You've ignored the connection request from ${user.name}`,
    });
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 border-muted/60">
      <CardContent className="p-0">
        <div className="h-16 bg-gradient-to-r from-primary/20 to-secondary/20"></div>
        <div className="px-4 pt-0 pb-4 relative">
          <div className="pt-2 pb-2">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg cursor-pointer hover:text-primary" onClick={onViewProfile}>{user.name}</h3>
              {user.isVerified && (
                <Badge variant="outline" className="bg-primary/10 text-primary ml-2">
                  <Star size={12} className="mr-1" /> Pro
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">@{user.username}</p>
            
            {user.location && (
              <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                <MapPin size={14} />
                <span>{user.location}</span>
              </div>
            )}
            
            <div className="mt-3 flex flex-wrap gap-1">
              {displayInterests.map((interest) => (
                <HoverCard key={interest}>
                  <HoverCardTrigger asChild>
                    <Badge variant="outline" className="bg-muted/50 cursor-pointer">
                      {interest}
                    </Badge>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-60">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">{interest}</h4>
                      <p className="text-xs text-muted-foreground">
                        Connect with others who share your passion for {interest.toLowerCase()}
                      </p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
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
                  <Button variant="outline" className="flex-1 rounded-full h-9" size="sm" onClick={onMessage}>
                    <MessageSquare size={16} className="mr-1" />
                    Message
                  </Button>
                  <Button 
                    className="flex-1 rounded-full h-9 bg-primary" 
                    size="sm"
                    onClick={onViewProfile}
                  >
                    <UserCheck size={16} className="mr-1" />
                    View Profile
                  </Button>
                </>
              )}
              
              {connectionStatus === 'pending' && (
                <>
                  <Button variant="outline" className="flex-1 rounded-full h-9" size="sm" onClick={onAccept}>
                    <UserCheck size={16} className="mr-1" />
                    Accept
                  </Button>
                  <Button variant="secondary" className="flex-1 rounded-full h-9" size="sm" onClick={handleIgnore}>
                    Ignore
                  </Button>
                </>
              )}
              
              {connectionStatus === 'suggested' && (
                <>
                  <Button variant="outline" className="flex-1 rounded-full h-9" size="sm" onClick={onViewProfile}>
                    View Profile
                  </Button>
                  <Button className="flex-1 rounded-full h-9" size="sm" onClick={onConnect}>
                    <UserPlus size={16} className="mr-1" />
                    Connect
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoammateCard;
