
import { useState } from 'react';
import { formatDistance } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Heart, MessageSquare, Flag } from 'lucide-react';
import { comments } from '@/utils/mockData';
import { toast } from '@/hooks/use-toast';

const CommentSection = ({ entryId }) => {
  const [newComment, setNewComment] = useState('');
  const [entryComments, setEntryComments] = useState(
    comments.filter(comment => comment.entryId === entryId)
  );
  const [likedComments, setLikedComments] = useState([]);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    // Create a mock new comment
    const newCommentObj = {
      id: `comment${Date.now()}`,
      entryId,
      userId: 'user1', // Current user
      userName: 'Alex Johnson',
      userAvatar: '/placeholder.svg',
      content: newComment,
      date: new Date(),
      likes: 0
    };
    
    // Add the new comment to the list
    setEntryComments([newCommentObj, ...entryComments]);
    setNewComment('');
    
    toast({
      title: "Comment Added",
      description: "Your comment has been posted successfully!",
    });
  };
  
  const handleLikeComment = (commentId) => {
    // Toggle like status
    if (likedComments.includes(commentId)) {
      setLikedComments(likedComments.filter(id => id !== commentId));
      
      // Update comment likes count
      setEntryComments(entryComments.map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: comment.likes - 1 } 
          : comment
      ));
    } else {
      setLikedComments([...likedComments, commentId]);
      
      // Update comment likes count
      setEntryComments(entryComments.map(comment => 
        comment.id === commentId 
          ? { ...comment, likes: comment.likes + 1 } 
          : comment
      ));
      
      toast({
        title: "Comment Liked",
        description: "You liked this comment",
        duration: 2000,
      });
    }
  };
  
  const handleReportComment = (commentId) => {
    toast({
      title: "Comment Reported",
      description: "Thanks for your report. We'll review this comment.",
      variant: "destructive",
    });
  };

  return (
    <div className="mt-8 space-y-6">
      <h3 className="text-xl font-semibold flex items-center">
        <MessageSquare className="mr-2 h-5 w-5" />
        Comments ({entryComments.length})
      </h3>
      
      {/* Comment form */}
      <div className="border rounded-lg p-4">
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <div className="flex items-start gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/placeholder.svg" alt="Your profile" />
              <AvatarFallback>AJ</AvatarFallback>
            </Avatar>
            <Textarea
              placeholder="Share your thoughts or ask a question..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 resize-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={!newComment.trim()}>
              Post Comment
            </Button>
          </div>
        </form>
      </div>
      
      {/* Comments list */}
      <div className="space-y-6">
        {entryComments.map((comment) => (
          <div key={comment.id} className="flex gap-4 animate-enter">
            <Avatar className="h-9 w-9">
              <AvatarImage src={comment.userAvatar} alt={comment.userName} />
              <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="bg-card/30 p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{comment.userName}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDistance(comment.date, new Date(), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm">{comment.content}</p>
              </div>
              
              <div className="flex items-center gap-4 px-1">
                <button 
                  className={`flex items-center gap-1 text-xs ${likedComments.includes(comment.id) ? 'text-secondary' : 'text-muted-foreground'} hover:text-secondary`}
                  onClick={() => handleLikeComment(comment.id)}
                >
                  <Heart className="h-4 w-4" fill={likedComments.includes(comment.id) ? 'currentColor' : 'none'} />
                  <span>{comment.likes} {comment.likes === 1 ? 'Like' : 'Likes'}</span>
                </button>
                
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-secondary">
                  <MessageSquare className="h-4 w-4" />
                  <span>Reply</span>
                </button>
                
                <button 
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive"
                  onClick={() => handleReportComment(comment.id)}
                >
                  <Flag className="h-4 w-4" />
                  <span>Report</span>
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {entryComments.length === 0 && (
          <div className="text-center py-8">
            <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-25 mb-3" />
            <p className="text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
