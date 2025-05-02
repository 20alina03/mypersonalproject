
import { useState } from "react";
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Download, Plus, Globe, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Component that would be replaced by an actual map implementation
const InteractiveMap = () => {
  return (
    <div className="w-full rounded-lg overflow-hidden border bg-muted/20 relative">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074')] bg-cover opacity-20 z-0"></div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[400px] p-6">
        <MapPin className="h-10 w-10 text-atlas-teal mb-4" />
        <h3 className="text-xl font-semibold mb-2">Interactive World Map</h3>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          Your personal travel map will be displayed here, showing all the places you've visited and plan to visit.
        </p>
        <Button className="bg-atlas-teal hover:bg-atlas-teal/90" size="lg">
          <Globe className="h-4 w-4 mr-2" />
          <span>Explore Your Map</span>
        </Button>
      </div>
    </div>
  );
};

const MapPage = () => {
  const [activeTab, setActiveTab] = useState("my-map");

  // Mock data
  const visitedLocations = 27;
  const visitedCountries = 14;
  
  return (
    <MainLayout>
      <div className="container py-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-muted-foreground/80 bg-clip-text text-transparent">
              Travel Map
            </h1>
            <p className="text-muted-foreground">
              Explore and add places you've visited around the world
            </p>
          </motion.div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              <span>Export</span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-atlas-teal hover:bg-atlas-teal/90 group">
                  <Plus className="h-4 w-4 mr-2" />
                  <span>Add Location</span>
                  <ChevronDown className="h-4 w-4 ml-1 opacity-70 transition-transform group-data-[state=open]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="cursor-pointer">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>Current Location</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Globe className="h-4 w-4 mr-2" />
                  <span>Search Location</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Plus className="h-4 w-4 mr-2" />
                  <span>Add Multiple</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <Tabs 
          defaultValue="my-map" 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <TabsList className="mb-4 bg-muted/50 p-1">
            <TabsTrigger value="my-map" className="data-[state=active]:bg-atlas-teal data-[state=active]:text-white">
              My Map
            </TabsTrigger>
            <TabsTrigger value="community" className="data-[state=active]:bg-atlas-teal data-[state=active]:text-white">
              Community
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="data-[state=active]:bg-atlas-teal data-[state=active]:text-white">
              Wishlist
            </TabsTrigger>
          </TabsList>
          
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="my-map" className="border-none p-0 mt-0">
              <InteractiveMap />
              
              <div className="flex justify-between items-center mt-6 p-4 rounded-lg border bg-background/50">
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-sm font-medium">Places Visited</p>
                    <p className="text-2xl font-bold text-atlas-teal">{visitedLocations}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Countries Explored</p>
                    <p className="text-2xl font-bold text-atlas-orange">{visitedCountries}</p>
                  </div>
                </div>
                <Button variant="outline" className="hidden sm:flex">
                  <Download className="h-4 w-4 mr-2" />
                  <span>Download Map</span>
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="community">
              <div className="p-12 text-center bg-muted/20 rounded-lg border border-dashed flex flex-col items-center">
                <Globe className="h-16 w-16 text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-medium mb-2">Community Map Feature</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Discover locations popular among other Atlas users and get inspired for your next adventure!
                </p>
                <Button className="bg-atlas-teal hover:bg-atlas-teal/90">Sign Up to Access</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="wishlist">
              <div className="p-12 text-center bg-muted/20 rounded-lg border border-dashed flex flex-col items-center">
                <MapPin className="h-16 w-16 text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-medium mb-2">Travel Wishlist</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Create your travel bucket list by marking places you want to visit in the future.
                </p>
                <Button className="bg-atlas-teal hover:bg-atlas-teal/90">Start Your Wishlist</Button>
              </div>
            </TabsContent>
          </motion.div>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default MapPage;
