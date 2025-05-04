
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from "@/components/layouts/MainLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { users, journalEntries, comments } from "@/utils/mockData";
import { MapPin, Calendar, User, Mail, UserPlus, MessageSquare, Heart, Share, Flag } from "lucide-react";
import { formatDistance } from 'date-fns';
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import CommentForm from "@/components/social/CommentForm";

const RoammateProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [entryComments, setEntryComments] = useState({});
  const [likedPosts, setLikedPosts] = useState([]);
  
  useEffect(() => {
    // Fetch user data
    const foundUser = users.find(u => u.id === userId);
    if (foundUser) {
      setUser(foundUser);
      
      // Fetch user's journal entries
      const userEntries = journalEntries.filter(entry => entry.author.id === userId);
      setUserPosts(userEntries);
      
      // Initialize comments for each entry
      const commentsMap = {};
      userEntries.forEach(entry => {
        commentsMap[entry.id] = comments.filter(comment => comment.entryId === entry.id);
      });
      setEntryComments(commentsMap);
    } else {
      // Redirect if user not found
      navigate('/roammates');
      toast({
        title: "User not found",
        description: "The requested user profile could not be found.",
        variant: "destructive"
      });
    }
  }, [userId, navigate]);
  
  const handleConnect = () => {
    if (!user) return;
    
    toast({
      title: "Connection Request Sent",
      description: `You've sent a connection request to ${user.name}`,
    });
  };
  
  const handleMessage = () => {
    if (!user) return;
    
    toast({
      title: "Message Started",
      description: `You've started a conversation with ${user.name}`,
    });
    // Navigate to messages in a real app
    navigate(`/messages/${userId}`);
  };
  
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
    setEntryComments({
      ...entryComments,
      [postId]: [...(entryComments[postId] || []), newComment]
    });
  };
  
  if (!user) {
    return (
      <MainLayout>
        <div className="container py-20 text-center">
          <User size={64} className="mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Loading Profile...</h2>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container py-6 space-y-6"
      >
        {/* Profile Header */}
        <div className="relative">
          <div className="h-48 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-xl"></div>
          <div className="absolute -bottom-16 left-8 border-4 border-background rounded-full">
            <Avatar className="h-32 w-32 bg-white">
              <AvatarImage src={user.avatar || '/placeholder.svg'} alt={user.name} />
              <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <div className="absolute bottom-4 right-4 space-x-2">
            <Button variant="secondary" onClick={handleMessage}>
              <Mail size={16} className="mr-2" />
              Message
            </Button>
            <Button onClick={handleConnect}>
              <UserPlus size={16} className="mr-2" />
              Connect
            </Button>
          </div>
        </div>
        
        {/* Profile Info */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - User Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <CardDescription>@{user.username}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {user.bio && <p>{user.bio}</p>}
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin size={16} className="mr-2" />
                  <span>{user.location || 'Location not specified'}</span>
                </div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar size={16} className="mr-2" />
                  <span>Joined {formatDistance(user.joinedDate, new Date(), { addSuffix: true })}</span>
                </div>
                
                <div className="flex justify-between text-center pt-2 border-t">
                  <div>
                    <p className="font-bold">{user.placesVisited}</p>
                    <p className="text-xs text-muted-foreground">Places</p>
                  </div>
                  <div>
                    <p className="font-bold">{user.followers}</p>
                    <p className="text-xs text-muted-foreground">Followers</p>
                  </div>
                  <div>
                    <p className="font-bold">{user.following}</p>
                    <p className="text-xs text-muted-foreground">Following</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Travel Interests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {user.travelInterests?.map((interest) => (
                    <Badge key={interest} variant="outline">
                      {interest}
                    </Badge>
                  ))}
                  {!user.travelInterests?.length && (
                    <p className="text-sm text-muted-foreground">No interests specified</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Right Column - Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="posts">
              <TabsList className="mb-4">
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="photos">Photos</TabsTrigger>
              </TabsList>
              
              <TabsContent value="posts">
                {userPosts.length === 0 ? (
                  <Card className="text-center py-12">
                    <CardContent>
                      <MessageSquare size={48} className="mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Posts Yet</h3>
                      <p className="text-muted-foreground mb-4">This user hasn't shared any travel experiences yet.</p>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {userPosts.map((post) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="animate-enter"
                      >
                        <Card>
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-10 w-10 bg-white">
                                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <CardTitle className="text-lg">{post.title}</CardTitle>
                                  <CardDescription className="flex items-center gap-1">
                                    <MapPin size={12} />
                                    {post.location}
                                  </CardDescription>
                                </div>
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {formatDistance(post.date, new Date(), { addSuffix: true })}
                              </span>
                            </div>
                          </CardHeader>
                          
                          {post.imageUrl && (
                            <div className="px-6">
                              <div className="aspect-video rounded-md overflow-hidden">
                                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                              </div>
                            </div>
                          )}
                          
                          <CardContent className="pt-4">
                            <p className="text-sm">{post.excerpt}</p>
                            
                            <div className="flex flex-wrap gap-1 mt-3">
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
                                {(entryComments[post.id]?.length || 0) + post.comments}
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
                              {entryComments[post.id]?.map((comment) => (
                                <div key={comment.id} className="flex gap-3 mb-4">
                                  <Avatar className="h-8 w-8 bg-white">
                                    <AvatarImage src={comment.userAvatar} alt={comment.userName} />
                                    <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="bg-muted/50 rounded-md p-2">
                                      <div className="flex justify-between items-center">
                                        <p className="font-medium text-sm">{comment.userName}</p>
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
                                      <Button variant="ghost" size="sm" className="h-auto p-0 text-xs text-muted-foreground hover:text-destructive">
                                        <Flag size={12} className="mr-1" />
                                        Report
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                              
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
              </TabsContent>
              
              <TabsContent value="about">
                <Card>
                  <CardHeader>
                    <CardTitle>About {user.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Bio</h3>
                      <p>{user.bio || 'No bio provided yet.'}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Travel Experience</h3>
                      <p>Has visited {user.placesVisited} places around the world.</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        {user.travelInterests?.map((interest) => (
                          <Badge key={interest} variant="secondary">
                            {interest}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="photos">
                <Card>
                  <CardHeader>
                    <CardTitle>Photos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {userPosts.some(post => post.imageUrl) ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {userPosts
                          .filter(post => post.imageUrl)
                          .map((post) => (
                            <div 
                              key={post.id} 
                              className="aspect-square rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                              onClick={() => navigate(`/journal/${post.id}`)}
                            >
                              <img 
                                src={post.imageUrl} 
                                alt={post.title} 
                                className="w-full h-full object-cover" 
                              />
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No photos to display</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default RoammateProfilePage;
