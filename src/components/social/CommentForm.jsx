
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { SendHorizontal } from "lucide-react";

const CommentForm = ({ entryId, onCommentAdded, id }) => {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock current user data - in a real app this would come from authentication
  const currentUser = {
    id: "user1",
    name: "Alex Johnson",
    avatar: "/placeholder.svg"
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!comment.trim()) return;
    
    setIsSubmitting(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      const newComment = {
        id: `comment-${Date.now()}`,
        entryId,
        userId: currentUser.id,
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
        content: comment,
        date: new Date(),
        likes: 0
      };
      
      onCommentAdded(newComment);
      setComment('');
      setIsSubmitting(false);
      
      toast({
        title: "Comment Added",
        description: "Your comment has been posted successfully"
      });
    }, 500); // Simulate API delay
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex gap-3">
      <Avatar className="h-8 w-8">
        <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
        <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-2">
        <Textarea
          id={id}
          placeholder="Share your thoughts..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="min-h-[80px] resize-none focus-visible:ring-primary"
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isSubmitting || !comment.trim()}
            size="sm"
            className="gap-1"
          >
            {isSubmitting ? "Posting..." : (
              <>
                <SendHorizontal size={16} />
                Post Comment
              </>
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
