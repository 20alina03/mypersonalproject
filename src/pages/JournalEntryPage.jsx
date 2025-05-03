
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from "@/components/layouts/MainLayout";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Heart, MessageSquare, Share2, MapPin, Calendar, Eye, 
  Lock, Globe, Users, Bookmark, BookmarkCheck, ThumbsUp 
} from 'lucide-react';
import { format } from 'date-fns';
import { journalEntries } from '@/utils/mockData';
import CommentSection from '@/components/journal/CommentSection';
import { toast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const JournalEntryPage = () => {
  const { id } = useParams();
  const entry = journalEntries.find(entry => entry.id === id) || journalEntries[0]; // Fallback for demo
  
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likeCount, setLikeCount] = useState(entry.likes);
  const [privacyStatus, setPrivacyStatus] = useState(entry.isPrivate ? 'private' : 'public');
  
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    
    if (!isLiked) {
      toast({
        title: "Journal Entry Liked",
        description: "You liked this journal entry",
      });
    }
  };
  
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    
    toast({
      title: isBookmarked ? "Removed from Bookmarks" : "Added to Bookmarks",
      description: isBookmarked 
        ? "Journal entry removed from your bookmarks" 
        : "Journal entry added to your bookmarks for later",
    });
  };
  
  const handleShare = () => {
    // In a real app, this would open a share dialog or copy link to clipboard
    navigator.clipboard.writeText(window.location.href);
    
    toast({
      title: "Link Copied",
      description: "Journal entry link copied to clipboard",
    });
  };
  
  const updatePrivacy = (status) => {
    setPrivacyStatus(status);
    
    toast({
      title: "Privacy Setting Updated",
      description: `Journal entry is now ${status}`,
    });
  };

  return (
    <MainLayout>
      <div className="container py-6 max-w-4xl">
        <div className="flex items-center mb-6">
          <Link to="/journal" className="text-muted-foreground hover:text-primary">
            ← Back to Journal
          </Link>
        </div>
        
        {entry.imageUrl && (
          <div className="relative w-full h-80 mb-8 overflow-hidden rounded-lg">
            <img 
              src={entry.imageUrl} 
              alt={entry.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4">
              <div className="flex items-center gap-2">
                <Badge className="bg-primary text-white">
                  {entry.tags[0]}
                </Badge>
                <span className="text-sm">•</span>
                <span className="text-sm flex items-center">
                  <MapPin size={14} className="mr-1" />
                  {entry.location}
                </span>
              </div>
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={entry.author.avatar} />
              <AvatarFallback>{entry.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{entry.author.name}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar size={12} />
                {format(entry.date, 'MMMM d, yyyy')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <Eye size={16} className="mr-1" />
              <span>254 views</span>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-1 rounded-full">
                  {privacyStatus === 'private' ? (
                    <><Lock size={14} /> Private</>
                  ) : privacyStatus === 'friends' ? (
                    <><Users size={14} /> Friends</>
                  ) : (
                    <><Globe size={14} /> Public</>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => updatePrivacy('public')}>
                  <Globe className="mr-2 h-4 w-4" />
                  <span>Public</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => updatePrivacy('friends')}>
                  <Users className="mr-2 h-4 w-4" />
                  <span>Friends Only</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => updatePrivacy('private')}>
                  <Lock className="mr-2 h-4 w-4" />
                  <span>Private</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">{entry.title}</h1>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {entry.tags.map(tag => (
            <Badge key={tag} variant="outline" className="bg-muted/60 hover:bg-muted cursor-pointer">
              {tag}
            </Badge>
          ))}
          <div className="flex items-center text-muted-foreground text-sm gap-2 ml-2">
            <MapPin size={14} />
            <Link to={`/map?location=${encodeURIComponent(entry.location)}`} className="hover:text-primary">
              {entry.location}
            </Link>
          </div>
        </div>
        
        <div className="prose prose-neutral dark:prose-invert max-w-none mb-10">
          {entry.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
        
        <div className="flex items-center justify-between py-4 border-t border-b">
          <div className="flex items-center gap-4">
            <Button 
              variant={isLiked ? "default" : "outline"} 
              size="sm" 
              className={`flex items-center gap-2 rounded-full ${isLiked ? 'bg-secondary text-secondary-foreground' : ''}`}
              onClick={handleLike}
            >
              {isLiked ? (
                <ThumbsUp size={16} className="fill-current" />
              ) : (
                <Heart size={16} />
              )}
              {likeCount} {likeCount === 1 ? 'Like' : 'Likes'}
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2 rounded-full"
              onClick={() => document.getElementById('comments-section').scrollIntoView({ behavior: 'smooth' })}
            >
              <MessageSquare size={16} />
              {entry.comments} Comments
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant={isBookmarked ? "default" : "outline"}
              size="sm" 
              className={`rounded-full ${isBookmarked ? 'bg-primary text-primary-foreground' : ''}`}
              onClick={handleBookmark}
            >
              {isBookmarked ? (
                <BookmarkCheck size={16} className="fill-current" />
              ) : (
                <Bookmark size={16} />
              )}
              <span className="ml-1">Save</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-full"
              onClick={handleShare}
            >
              <Share2 size={16} className="mr-1" />
              Share
            </Button>
          </div>
        </div>
        
        <div id="comments-section" className="pt-4">
          <CommentSection entryId={entry.id} />
        </div>
        
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-xl font-semibold mb-6">More from {entry.author.name}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {journalEntries
              .filter(e => e.author.id === entry.author.id && e.id !== entry.id)
              .slice(0, 2)
              .map(relatedEntry => (
                <div key={relatedEntry.id} className="flex border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  {relatedEntry.imageUrl && (
                    <div className="w-1/3">
                      <img 
                        src={relatedEntry.imageUrl} 
                        alt={relatedEntry.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4 flex-1">
                    <Link to={`/journal/${relatedEntry.id}`}>
                      <h4 className="font-semibold hover:text-primary">{relatedEntry.title}</h4>
                    </Link>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{relatedEntry.excerpt}</p>
                    <div className="flex items-center mt-2 text-xs text-muted-foreground">
                      <MapPin size={12} className="mr-1" />
                      {relatedEntry.location}
                      <span className="mx-1">•</span>
                      {format(relatedEntry.date, 'MMM d, yyyy')}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default JournalEntryPage;
