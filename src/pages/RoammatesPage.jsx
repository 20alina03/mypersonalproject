
import { useState } from 'react';
import MainLayout from "@/components/layouts/MainLayout";
import { users, roammates } from "@/utils/mockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, UserPlus, UserCheck, Users } from "lucide-react";
import RoammateCard from "@/components/social/RoammateCard";
import { toast } from "@/hooks/use-toast";

// Mock user for the current profile
const currentUser = {
  id: "user1",
  name: "Alex Johnson",
  roammatesData: roammates[0]
};

const RoammatesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.id !== currentUser.id && 
    (user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
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
  
  return (
    <MainLayout>
      <div className="container py-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Roammates</h1>
            <p className="text-muted-foreground">
              Connect with fellow travelers and share your journeys
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <UserPlus size={18} />
            <span>Find Roammates</span>
          </Button>
        </div>
        
        <div className="bg-card shadow rounded-xl p-6 mb-6">
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
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer">Same City</Badge>
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer">Similar Interests</Badge>
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer">Recently Active</Badge>
            <Badge className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer">Visited Same Places</Badge>
          </div>
        </div>
        
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
              <div className="text-center py-12">
                <Users size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Roammates Yet</h3>
                <p className="text-muted-foreground mb-4">Connect with other travelers to start sharing experiences</p>
                <Button>Find Roammates</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {connectedRoammates.map(user => (
                  <RoammateCard 
                    key={user.id} 
                    user={user} 
                    connectionStatus="connected" 
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="pending">
            {pendingRoammates.length === 0 ? (
              <div className="text-center py-12">
                <UserPlus size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No Pending Requests</h3>
                <p className="text-muted-foreground mb-4">You don't have any pending roammate requests</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pendingRoammates.map(user => (
                  <RoammateCard 
                    key={user.id} 
                    user={user} 
                    connectionStatus="pending" 
                    onAccept={() => handleAccept(user.id, user.name)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="suggested">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {suggestedRoammates.map(user => (
                <RoammateCard 
                  key={user.id} 
                  user={user} 
                  connectionStatus="suggested" 
                  onConnect={() => handleConnect(user.id, user.name)}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default RoammatesPage;
