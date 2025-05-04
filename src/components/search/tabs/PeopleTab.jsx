
import { User } from 'lucide-react';
import RoammateCard from '@/components/social/RoammateCard';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";

const PeopleTab = ({ users }) => {
  const navigate = useNavigate();
  
  const handleConnect = (userId, userName) => {
    // In a real app, this would make an API call
    console.log(`Connecting with user ${userId}`);
    toast({
      title: "Connection Request Sent",
      description: `You've sent a connection request to ${userName}`,
    });
  };
  
  const viewAllRoammates = () => {
    navigate('/roammates');
  };
  
  const viewFeed = () => {
    navigate('/roammates-feed');
  };

  return (
    <>
      {users.length === 0 ? (
        <div className="text-center py-12">
          <User size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Users Found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search terms</p>
        </div>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-medium">Travel Companions</h3>
              <Badge variant="outline" className="bg-primary/5">{users.length} found</Badge>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={viewAllRoammates}>All Roammates</Button>
              <Button variant="default" onClick={viewFeed}>View Feed</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user, index) => (
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
          </div>
        </>
      )}
    </>
  );
};

export default PeopleTab;
