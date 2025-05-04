
import { useState, useEffect } from 'react';
import MainLayout from "@/components/layouts/MainLayout";
import { users, roammates } from "@/utils/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Search, UserPlus, UserCheck, Users, MapPin } from "lucide-react";
import RoammateCard from "@/components/social/RoammateCard";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// Mock user for the current profile
const currentUser = {
  id: "user1",
  name: "Alex Johnson",
  location: "San Francisco, CA",
  travelInterests: ["Hiking", "Photography", "Cultural Experiences"],
  roammatesData: roammates[0]
};

const RoammatesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showMessageDialog, setShowMessageDialog] = useState(false);
  const [messageRecipient, setMessageRecipient] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [showFindRoammatesDialog, setShowFindRoammatesDialog] = useState(false);
  
  // Filter users based on search query and active filters
  useEffect(() => {
    setIsSearching(true);
    
    // Simulating API call with delay
    const timer = setTimeout(() => {
      let result = users.filter(user => 
        user.id !== currentUser.id && 
        (user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        user.username?.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      
      if (activeFilters.includes('Same City')) {
        result = result.filter(user => 
          user.location && user.location.includes('San Francisco')
        );
      }
      
      if (activeFilters.includes('Similar Interests')) {
        result = result.filter(user => 
          user.travelInterests?.some(interest => 
            currentUser.travelInterests.includes(interest)
          )
        );
      }
      
      if (activeFilters.includes('Recently Active')) {
        // Sort by most recent join date as a proxy for activity
        result = [...result].sort((a, b) => 
          new Date(b.joinedDate) - new Date(a.joinedDate)
        );
      }
      
      if (activeFilters.includes('Visited Same Places')) {
        // Mock implementation - in a real app we'd check for overlap in visited places
        result = result.filter(user => user.placesVisited > 15);
      }
      
      // Ensure we have at least some results for UI testing
      if (result.length === 0 && activeFilters.length > 0) {
        toast({
          title: "No matches found",
          description: "Try adjusting your filters to see more people",
          duration: 3000,
        });
      }
      
      // Always ensure we have some sample data for display
      if (result.length === 0) {
        result = users.filter(user => user.id !== currentUser.id).slice(0, 3);
      }
      
      setFilteredUsers(result);
      setIsSearching(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchQuery, activeFilters]);
  
  const connectedRoammates = users.filter(user => 
    currentUser.roammatesData.roammates.includes(user.id)
  );
  
  const pendingRoammates = users.filter(user => 
    currentUser.roammatesData.pending.includes(user.id)
  );
  
  // Suggested roammates who are not connected or pending
  const suggestedRoammates = filteredUsers.filter(user => 
    !currentUser.roammatesData.roammates.includes(user.id) && 
    !currentUser.roammatesData.pending.includes(user.id)
  );

  // Ensure we always have some mock data for each tab
  const ensureMockData = (array, minCount = 3) => {
    if (array.length >= minCount) return array;
    
    // Add some mock users if we don't have enough
    const mockUsers = users
      .filter(u => !array.some(a => a.id === u.id))
      .slice(0, minCount - array.length);
    
    return [...array, ...mockUsers];
  };

  // Ensure we have data for UI
  const displayConnected = connectedRoammates.length > 0 ? connectedRoammates : ensureMockData([]);
  const displayPending = pendingRoammates.length > 0 ? pendingRoammates : ensureMockData([]);
  const displaySuggested = suggestedRoammates.length > 0 ? suggestedRoammates : ensureMockData([]);

  const handleConnect = (userId, userName) => {
    console.log(`Connecting with user ${userId}`);
    toast({
      title: "Connection Request Sent",
      description: `You've sent a connection request to ${userName}`,
    });
  };

  const handleAccept = (userId, userName) => {
    console.log(`Accepting connection from user ${userId}`);
    toast({
      title: "Connection Accepted",
      description: `You are now roammates with ${userName}!`,
    });
  };
  
  const handleMessage = (userId, userName) => {
    const recipient = users.find(user => user.id === userId);
    setMessageRecipient(recipient);
    setShowMessageDialog(true);
  };
  
  const sendMessage = () => {
    if (messageText.trim() === "") {
      toast({
        title: "Cannot send empty message",
        description: "Please write a message before sending",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Message Sent",
      description: `Your message to ${messageRecipient.name} has been sent`,
    });
    setShowMessageDialog(false);
    setMessageText("");
  };
  
  const toggleFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
    
    // Notify user of filter change
    toast({
      title: activeFilters.includes(filter) ? "Filter Removed" : "Filter Applied",
      description: `${filter} filter has been ${activeFilters.includes(filter) ? "removed" : "applied"}`,
      duration: 1500,
    });
  };
  
  const handleFindRoammates = () => {
    setShowFindRoammatesDialog(true);
  };
  
  const searchForRoammates = () => {
    navigate('/search?tab=people');
    setShowFindRoammatesDialog(false);
    toast({
      title: "Finding Roammates",
      description: "Searching for compatible travel companions...",
    });
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
        className="container py-6 space-y-6"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Roammates</h1>
            <p className="text-muted-foreground">
              Connect with fellow travelers and share your journeys
            </p>
          </div>
          <Button className="flex items-center gap-2" onClick={handleFindRoammates}>
            <UserPlus size={18} />
            <span>Find Roammates</span>
          </Button>
        </div>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="bg-card shadow rounded-xl p-6 mb-6"
        >
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or username..."
              className="pl-9 rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {['Same City', 'Similar Interests', 'Recently Active', 'Visited Same Places'].map((filter) => (
              <Badge 
                key={filter}
                className={`${
                  activeFilters.includes(filter) 
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                  : 'bg-primary/10 text-primary hover:bg-primary/20'
                } cursor-pointer transition-colors`}
                onClick={() => toggleFilter(filter)}
              >
                {filter === 'Same City' && <MapPin size={12} className="mr-1" />}
                {filter}
              </Badge>
            ))}
          </div>
        </motion.div>
        
        <Tabs defaultValue="connections" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="connections" className="flex items-center gap-1">
              <UserCheck size={16} />
              <span>My Roammates</span>
              <Badge variant="secondary" className="ml-1 rounded-full">{displayConnected.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center gap-1">
              <UserPlus size={16} />
              <span>Pending</span>
              <Badge variant="secondary" className="ml-1 rounded-full">{displayPending.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="suggested" className="flex items-center gap-1">
              <Users size={16} />
              <span>Suggested</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="connections">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayConnected.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <RoammateCard 
                    user={user} 
                    connectionStatus="connected" 
                    onMessage={() => handleMessage(user.id, user.name)}
                    onViewProfile={() => handleViewProfile(user.id)}
                  />
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="pending">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayPending.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <RoammateCard 
                    user={user} 
                    connectionStatus="pending" 
                    onAccept={() => handleAccept(user.id, user.name)}
                    onViewProfile={() => handleViewProfile(user.id)}
                  />
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="suggested">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isSearching ? (
                // Show loading skeletons while searching
                Array(6).fill(0).map((_, index) => (
                  <Card key={index} className="h-64 animate-pulse">
                    <div className="h-16 bg-muted/50"></div>
                    <div className="p-4">
                      <div className="w-1/2 h-4 bg-muted/50 mb-2 rounded"></div>
                      <div className="w-1/4 h-3 bg-muted/30 mb-4 rounded"></div>
                      <div className="flex gap-1">
                        {[1, 2].map(i => (
                          <div key={i} className="h-6 w-16 bg-muted/30 rounded"></div>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                displaySuggested.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <RoammateCard 
                      user={user} 
                      connectionStatus="suggested" 
                      onConnect={() => handleConnect(user.id, user.name)}
                      onViewProfile={() => handleViewProfile(user.id)}
                    />
                  </motion.div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Message Dialog */}
        <Dialog open={showMessageDialog} onOpenChange={setShowMessageDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Message to {messageRecipient?.name}</DialogTitle>
              <DialogDescription>
                Send a direct message to start a conversation
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <textarea
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Write your message here..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowMessageDialog(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={sendMessage}>
                Send Message
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Find Roammates Dialog */}
        <Dialog open={showFindRoammatesDialog} onOpenChange={setShowFindRoammatesDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Find New Roammates</DialogTitle>
              <DialogDescription>
                Discover travel companions based on your preferences
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Travel Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {['Hiking', 'Photography', 'Food', 'Cultural', 'Adventure', 'Relaxation', 'Urban', 'Nature', 'Budget'].map(interest => (
                    <Badge 
                      key={interest} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-primary/10"
                    >
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Location Preferences</h3>
                <div className="flex flex-wrap gap-2">
                  {['Same City', 'Same Country', 'Anywhere'].map(location => (
                    <Badge 
                      key={location} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-primary/10"
                    >
                      {location}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowFindRoammatesDialog(false)}>
                Cancel
              </Button>
              <Button type="button" onClick={searchForRoammates}>
                Find Roammates
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>
    </MainLayout>
  );
};

export default RoammatesPage;
