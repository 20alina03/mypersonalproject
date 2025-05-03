
import { MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";

const PlacesTab = ({ locations }) => {
  return (
    <>
      {locations.length === 0 ? (
        <div className="text-center py-12">
          <MapPin size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Locations Found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search terms</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {locations.map(location => (
            <div key={location.name} className="bg-card border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="h-12 w-12 rounded-full bg-muted/50 flex items-center justify-center mr-4">
                  <MapPin size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{location.name}</h3>
                  <p className="text-sm text-muted-foreground">{location.count} journal entries</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    View on Map
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PlacesTab;
