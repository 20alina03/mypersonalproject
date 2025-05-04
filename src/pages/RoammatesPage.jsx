
import { useState, useEffect } from 'react';
import MainLayout from "@/components/layouts/MainLayout";
import { users, roammates } from "@/utils/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, UserCheck, Users, MapPin } from "lucide-react";
import RoammateCard from "@/components/social/RoammateCard";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

// Mock user for the current profile
const currentUser = {
  id: "user1",
  name: "Alex Johnson",
  roammatesData: roammates[0]
};

const RoammatesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  
  // Filter users based on search query and active filters
  useEffect(() => {
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
      const currentUserInterests = users.find(u => u.id === currentUser.id)?.travelInterests || [];
      result = result.filter(user => 
        user.travelInterests?.some(interest => 
          currentUserInterests.includes(interest)
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
    
    setFilteredUsers(result);
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

  const handleConnect = (userId, userName) => {
    // In a real app, this would make an API call
    console.log(`Connecting with user ${userId}`);
    toast({
      title: "Connection Request Sent",
      description: `You've sent a connection request to ${userName}`,
    });
  };

  const handleAccept = (userId, userName) => {
    // In a real app, this would make an API call
    console.log(`Accepting connection from user ${userId}`);
    toast({
      title: "Connection Accepted",
      description: `You are now roammates with ${userName}!`,
    });
  };
  
  const toggleFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
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
          <Button className="flex items-center gap-2" onClick={() => navigate('/search?tab=people')}>
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
              <Badge variant="secondary" className="ml-1 rounded-full">{connectedRoammates.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="pending" className="flex items-center gap-1">
              <UserPlus size={16} />
              <span>Pending</span>
              <Badge variant="secondary" className="ml-1 rounded-full">{pendingRoammates.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="suggested" className="flex items-center gap-1">
              <Users size={16} />
              <span>Suggested</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="connections">
            {connectedRoammates.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <Users size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Roammates Yet</h3>
                <p className="text-muted-foreground mb-4">Connect with other travelers to start sharing experiences</p>
                <Button onClick={() => navigate('/search?tab=people')}>Find Roammates</Button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {connectedRoammates.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <RoammateCard 
                      user={user} 
                      connectionStatus="connected" 
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="pending">
            {pendingRoammates.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-12"
              >
                <UserPlus size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Pending Requests</h3>
                <p className="text-muted-foreground mb-4">You don't have any pending roammate requests</p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pendingRoammates.map((user, index) => (
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
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="suggested">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestedRoammates.map((user, index) => (
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
                  />
                </motion.div>
              ))}
              {suggestedRoammates.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-3 text-center py-12"
                >
                  <Users size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Suggested Roammates</h3>
                  <p className="text-muted-foreground mb-4">Try changing your search filters</p>
                </motion.div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </MainLayout>
  );
};

export default RoammatesPage;
