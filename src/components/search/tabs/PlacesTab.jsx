
import { MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { toast } from '@/hooks/use-toast';

const PlacesTab = ({ locations }) => {
  const handleViewOnMap = (locationName) => {
    toast({
      title: "Opening Map View",
      description: `Showing ${locationName} on the map`,
    });
    // In a real app, this would navigate to the map page with a location filter
  };

  return (
    <>
      {locations.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center py-12"
        >
          <MapPin size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">No Locations Found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search terms</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {locations.map((location, index) => (
            <motion.div
              key={location.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-card border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start">
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 cursor-pointer">
                      <MapPin size={24} className="text-primary" />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="space-y-2">
                      <h4 className="font-medium">{location.name} Preview</h4>
                      <p className="text-sm text-muted-foreground">
                        {location.count} journal entries from this location
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" variant="outline" onClick={() => handleViewOnMap(location.name)}>
                          View on Map
                        </Button>
                        <Button size="sm">Browse Journals</Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
                <div>
                  <h3 className="font-semibold text-lg mb-1">{location.name}</h3>
                  <p className="text-sm text-muted-foreground">{location.count} journal entries</p>
                  <Button variant="outline" size="sm" className="mt-2" onClick={() => handleViewOnMap(location.name)}>
                    View on Map
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
};

export default PlacesTab;
