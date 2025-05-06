
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MapPin, Map, Book, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { mockTravelTips } from '@/lib/mockData';

const WelcomeHero = () => {
  const { isAuthenticated, user } = useAuth();
  const [tipIndex, setTipIndex] = useState(0);
  const [currentTip, setCurrentTip] = useState(mockTravelTips[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (tipIndex + 1) % mockTravelTips.length;
      setTipIndex(nextIndex);
      setCurrentTip(mockTravelTips[nextIndex]);
    }, 8000);

    return () => clearInterval(timer);
  }, [tipIndex]);

  return (
    <div className="relative w-full px-6 py-12 md:py-24 overflow-hidden bg-gradient-to-br from-background to-muted/30">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-atlas-teal/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-atlas-orange/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-muted/80 rounded-full py-1.5 px-3 border border-border w-fit">
              <span className="inline-block w-2 h-2 rounded-full bg-atlas-teal animate-pulse"></span>
              <span className="text-sm font-medium">Daily Travel Tip</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
              {isAuthenticated 
                ? `Welcome back, ${user.name.split(' ')[0]}!` 
                : 'Document Your Journey With Atlas'}
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-md">
              Capture your travel memories, map your adventures, and connect with fellow explorers around the world.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
              {isAuthenticated ? (
                <>
                  <Button asChild size="lg" className="bg-atlas-teal hover:bg-atlas-teal/90 group">
                    <Link to="/journal" className="flex items-center gap-2">
                      <Book className="w-4 h-4" />
                      <span>Journal Entry</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/map" className="flex items-center gap-2">
                      <Map className="w-4 h-4" />
                      <span>Explore Map</span>
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild size="lg" className="bg-atlas-teal hover:bg-atlas-teal/90 group">
                    <Link to="/register" className="flex items-center gap-2">
                      <span>Get Started</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/login">Sign In</Link>
                  </Button>
                </>
              )}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-card border border-border rounded-xl shadow-lg p-6 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-atlas-teal to-atlas-navy"></div>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-atlas-teal/10 p-2 rounded-full">
                  <MapPin className="h-5 w-5 text-atlas-teal" />
                </div>
                <h3 className="font-semibold">Travel Tip of the Day</h3>
              </div>
              
              <motion.div
                key={currentTip.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <h4 className="text-lg font-medium mb-2">{currentTip.title}</h4>
                <p className="text-muted-foreground">{currentTip.content}</p>
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">Category: {currentTip.category}</div>
                  <div className="flex items-center">
                    {[...Array(mockTravelTips.length)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-2 h-2 rounded-full mx-1 ${i === tipIndex ? 'bg-atlas-teal' : 'bg-muted'}`}
                      ></div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHero;
