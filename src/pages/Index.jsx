
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Map, Book, Users, ArrowRight, Globe, Compass } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import WelcomeHero from '@/components/home/WelcomeHero';
import { useAuth } from '@/hooks/useAuth';

const features = [
  {
    title: "Travel Journal",
    description: "Document your journeys with rich media entries and location tagging.",
    icon: Book,
    color: "bg-green-100 text-green-600",
    link: "/journal"
  },
  {
    title: "Interactive Map",
    description: "Visualize your adventures on an interactive world map.",
    icon: Map,
    color: "bg-blue-100 text-blue-600",
    link: "/map"
  },
  {
    title: "Connect with Travelers",
    description: "Find and connect with like-minded travelers around the world.",
    icon: Users,
    color: "bg-purple-100 text-purple-600",
    link: "/roammates"
  },
  {
    title: "Global Exploration",
    description: "Discover new destinations and travel experiences from other users.",
    icon: Globe,
    color: "bg-amber-100 text-amber-600",
    link: "/explore"
  }
];

const Index = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen">
      <WelcomeHero />
      
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="py-16 px-6 bg-muted/30"
      >
        <div className="container max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Your Complete Travel Companion</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Atlas offers everything you need to plan, document, and share your travel adventures.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              >
                <Card className="h-full transition-all hover:shadow-md hover:-translate-y-1 border-border/50 group">
                  <CardContent className="p-6">
                    <div className={`${feature.color} p-3 rounded-lg w-fit mb-4`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    
                    <Button asChild variant="ghost" className="p-0 h-auto group-hover:text-atlas-teal">
                      <Link to={isAuthenticated ? feature.link : "/register"} className="flex items-center gap-1">
                        <span className="text-sm font-medium">
                          {isAuthenticated ? "Explore" : "Join to Explore"}
                        </span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      
      <section className="py-20 px-6">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex-1"
            >
              <div className="relative">
                <div className="w-full aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070"
                    alt="Travel Map" 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 max-w-[220px] border border-border/60">
                  <div className="flex items-center gap-2 mb-2">
                    <Compass className="h-5 w-5 text-atlas-teal" />
                    <h4 className="font-medium">Your Journey</h4>
                  </div>
                  <p className="text-muted-foreground text-sm">Track your travels across continents and share your adventures.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-1"
            >
              <h2 className="text-3xl font-bold mb-4">Rediscover Your Travel Memories</h2>
              <p className="text-muted-foreground mb-6">
                Never forget a travel memory again. Atlas helps you document and organize all your travel experiences in one place.
              </p>
              
              <ul className="space-y-4 mb-8">
                {['Capture moments with journal entries', 'Tag locations on your personal map', 'Share experiences with fellow travelers'].map((item, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + idx * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="bg-atlas-teal/10 p-1.5 rounded-full">
                      <MapPin className="h-4 w-4 text-atlas-teal" />
                    </div>
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
              
              <Button asChild size="lg" className="bg-atlas-teal hover:bg-atlas-teal/90 group">
                <Link to={isAuthenticated ? "/journal" : "/register"} className="flex items-center gap-2">
                  <span>Start Your Journal</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      
      <footer className="bg-muted/50 border-t py-12 px-6">
        <div className="container max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <MapPin className="h-6 w-6 text-atlas-teal mr-2" />
              <span className="font-bold text-xl">Atlas</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-6 md:mb-0">
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
              <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
              <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
            </div>
            
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Atlas. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
