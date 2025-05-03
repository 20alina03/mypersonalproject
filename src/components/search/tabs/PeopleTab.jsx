
import { User } from 'lucide-react';
import RoammateCard from '@/components/social/RoammateCard';

const PeopleTab = ({ users }) => {
  return (
    <>
      {users.length === 0 ? (
        <div className="text-center py-12">
          <User size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Users Found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search terms</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map(user => (
            <RoammateCard
              key={user.id}
              user={user}
              connectionStatus="suggested"
              onConnect={() => console.log(`Connect with ${user.name}`)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default PeopleTab;
