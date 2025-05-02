
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-md w-full text-center space-y-6">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:scale-105 transition-transform">
          <MapPin className="h-8 w-8 text-atlas-teal" strokeWidth={2.5} />
          <span className="text-3xl font-bold bg-gradient-to-r from-atlas-teal to-atlas-navy bg-clip-text text-transparent">
            Atlas
          </span>
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <h1 className="text-7xl font-bold text-atlas-teal">404</h1>
          <h2 className="text-2xl font-semibold">Page Not Found</h2>
          <p className="text-muted-foreground">
            Oops! It seems you've ventured off the map. The page you're looking for doesn't exist.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
        >
          <Button asChild className="bg-atlas-teal hover:bg-atlas-teal/90 group">
            <Link to="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="javascript:history.back()" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Go Back</span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
