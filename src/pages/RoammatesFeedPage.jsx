import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from "@/components/layouts/MainLayout";
import { users, journalEntries, comments, roammates } from "@/utils/mockData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Heart, MessageSquare, Share, UserPlus, Users } from "lucide-react";
import { formatDistance } from 'date-fns';
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import CommentForm from "@/components/social/CommentForm";

// Mock current user data
const currentUser = {
  id: "user1",
  name: "Alex Johnson",
  roammatesData: roammates[0]
};

const RoammatesFeedPage = () => {
  const navigate = useNavigate();
  const [feedPosts, setFeedPosts] = useState([]);
  const [postComments, setPostComments] = useState({});
  const [likedPosts, setLikedPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  
  useEffect(() => {
    // Get roammates IDs for the current user
    const userRoammateIds = currentUser.roammatesData.roammates;
    
    // Filter posts based on active tab
    let posts;
    if (activeTab === "roammates") {
      posts = journalEntries.filter(entry => 
        userRoammateIds.includes(entry.author.id)
      );
    } else {
      // All posts, but prioritize roammates
      posts = [...journalEntries].sort((a, b) => {
        const aIsRoammate = userRoammateIds.includes(a.author.id);
        const bIsRoammate = userRoammateIds.includes(b.author.id);
        
        if (aIsRoammate && !bIsRoammate) return -1;
        if (!aIsRoammate && bIsRoammate) return 1;
        return new Date(b.date) - new Date(a.date); // Most recent first
      });
    }
    
    setFeedPosts(posts);
    
    // Initialize comments for each post
    const commentsMap = {};
    posts.forEach(post => {
      commentsMap[post.id] = comments.filter(comment => comment.entryId === post.id);
    });
    setPostComments(commentsMap);
  }, [activeTab]);
  
  const handleLikePost = (postId) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(likedPosts.filter(id => id !== postId));
    } else {
      setLikedPosts([...likedPosts, postId]);
      toast({
        title: "Post Liked",
        description: "You liked this post",
        duration: 2000,
      });
    }
  };
  
  const handleSharePost = (postId) => {
    toast({
      title: "Post Shared",
      description: "Post has been shared to your profile",
    });
  };
  
  const handleCommentAdded = (postId, newComment) => {
    setPostComments({
      ...postComments,
      [postId]: [...(postComments[postId] || []), newComment]
    });
  };
  
  const handleConnect = (userId, userName) => {
    toast({
      title: "Connection Request Sent",
      description: `You've sent a connection request to ${userName}`,
    });
  };
  
  const isRoammate = (userId) => {
    return currentUser.roammatesData.roammates.includes(userId);
  };
  
  const handleViewProfile = (userId) => {
    navigate(`/roammate-profile/${userId}`);
  };
  
  return (
    <MainLayout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container py-6"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Roammates Feed</h1>
            <p className="text-muted-foreground">
              Discover travel experiences from your network
            </p>
          </div>
          <Button onClick={() => navigate('/roammates')} className="flex items-center gap-2">
            <Users size={18} />
            <span>Manage Roammates</span>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">My Network</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Roammates</span>
                  <span className="font-medium">{currentUser.roammatesData.roammates.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pending Requests</span>
                  <span className="font-medium">{currentUser.roammatesData.pending.length}</span>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate('/roammates')}
                >
                  View All
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Suggested Roammates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {users
                  .filter(user => 
                    user.id !== currentUser.id && 
                    !currentUser.roammatesData.roammates.includes(user.id) &&
                    !currentUser.roammatesData.pending.includes(user.id)
                  )
                  .slice(0, 3)
                  .map((user) => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 bg-white">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium cursor-pointer hover:text-primary" onClick={() => handleViewProfile(user.id)}>
                            {user.name}
                          </p>
                          <p className="text-xs text-muted-foreground">{user.location}</p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleConnect(user.id, user.name)}
                      >
                        <UserPlus size={16} />
                      </Button>
                    </div>
                  ))}
                <Button 
                  variant="link" 
                  className="w-full"
                  onClick={() => navigate('/roammates?tab=suggested')}
                >
                  View More
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList>
                <TabsTrigger value="all">All Posts</TabsTrigger>
                <TabsTrigger value="roammates">Roammates Only</TabsTrigger>
              </TabsList>
            </Tabs>
            
            {feedPosts.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <MessageSquare size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Posts Yet</h3>
                  <p className="text-muted-foreground mb-4">
                    {activeTab === "roammates" 
                      ? "Connect with more travelers to see their posts here." 
                      : "There are no travel stories to show right now."}
                  </p>
                  <Button onClick={() => navigate('/roammates')}>Find Roammates</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {feedPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="animate-enter"
                  >
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar 
                              className="h-10 w-10 bg-white cursor-pointer" 
                              onClick={() => handleViewProfile(post.author.id)}
                            >
                              <AvatarImage src={post.author.avatar} alt={post.author.name} />
                              <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center">
                                <CardTitle 
                                  className="text-lg cursor-pointer hover:text-primary"
                                  onClick={() => handleViewProfile(post.author.id)}
                                >
                                  {post.author.name}
                                </CardTitle>
                                {isRoammate(post.author.id) && (
                                  <Badge variant="outline" className="ml-2 text-xs bg-primary/10 text-primary">
                                    Roammate
                                  </Badge>
                                )}
                              </div>
                              <CardDescription>
                                {formatDistance(post.date, new Date(), { addSuffix: true })}
                              </CardDescription>
                            </div>
                          </div>
                          {!isRoammate(post.author.id) && post.author.id !== currentUser.id && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleConnect(post.author.id, post.author.name)}
                            >
                              <UserPlus size={16} className="mr-1" />
                              Connect
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-3">
                        <div 
                          className="font-medium text-lg cursor-pointer hover:text-primary"
                          onClick={() => navigate(`/journal/${post.id}`)}
                        >
                          {post.title}
                        </div>
                        
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin size={14} className="mr-1" />
                          {post.location}
                        </div>
                        
                        <p>{post.excerpt}</p>
                        
                        {post.imageUrl && (
                          <div 
                            className="aspect-video rounded-md overflow-hidden cursor-pointer"
                            onClick={() => navigate(`/journal/${post.id}`)}
                          >
                            <img 
                              src={post.imageUrl} 
                              alt={post.title} 
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                            />
                          </div>
                        )}
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      
                      <CardFooter className="flex justify-between border-t pt-4">
                        <div className="flex gap-4">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className={`gap-1 ${likedPosts.includes(post.id) ? 'text-secondary' : ''}`}
                            onClick={() => handleLikePost(post.id)}
                          >
                            <Heart 
                              size={16} 
                              className={likedPosts.includes(post.id) ? 'fill-secondary text-secondary' : ''}
                            />
                            {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="gap-1"
                            onClick={() => document.getElementById(`comments-${post.id}`).focus()}
                          >
                            <MessageSquare size={16} />
                            {(postComments[post.id]?.length || 0) + post.comments}
                          </Button>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="gap-1"
                          onClick={() => handleSharePost(post.id)}
                        >
                          <Share size={16} />
                          Share
                        </Button>
                      </CardFooter>
                      
                      {/* Comments Section */}
                      <div className="px-6 pb-4">
                        <div className="border-t pt-4">
                          {/* Existing Comments */}
                          {postComments[post.id]?.length > 0 && (
                            <div className="mb-4 space-y-3">
                              {postComments[post.id].map((comment) => (
                                <div key={comment.id} className="flex gap-3">
                                  <Avatar 
                                    className="h-8 w-8 bg-white" 
                                    onClick={() => handleViewProfile(comment.userId)}
                                  >
                                    <AvatarImage src={comment.userAvatar} alt={comment.userName} />
                                    <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="bg-muted/50 rounded-md p-2">
                                      <div className="flex justify-between items-center">
                                        <p 
                                          className="font-medium text-sm cursor-pointer hover:text-primary"
                                          onClick={() => handleViewProfile(comment.userId)}
                                        >
                                          {comment.userName}
                                        </p>
                                        <span className="text-xs text-muted-foreground">
                                          {formatDistance(comment.date, new Date(), { addSuffix: true })}
                                        </span>
                                      </div>
                                      <p className="text-sm mt-1">{comment.content}</p>
                                    </div>
                                    <div className="flex gap-3 mt-1">
                                      <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground">
                                        Like
                                      </Button>
                                      <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground">
                                        Reply
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {/* Comment Form */}
                          <CommentForm 
                            entryId={post.id} 
                            onCommentAdded={(newComment) => handleCommentAdded(post.id, newComment)} 
                            id={`comments-${post.id}`}
                          />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default RoammatesFeedPage;
