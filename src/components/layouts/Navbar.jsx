
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  Search,
  MapPin,
  User,
  LogIn,
  X,
  LogOut,
  Map,
  Book,
  Users,
  Bell
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifications, setNotifications] = useState(3); // Example notification count
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate("/");
    }
  };

  const navLinks = [
    { name: 'Map', path: '/map', icon: Map },
    { name: 'Journal', path: '/journal', icon: Book },
    { name: 'Roammates', path: '/roammates', icon: Users },
  ];

  return (
    <header className={`sticky top-0 z-40 w-full border-b backdrop-blur-lg supports-[backdrop-filter]:bg-background/70 transition-all duration-300 ${scrolled ? 'shadow-md bg-background/95' : 'bg-background/30'}`}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <SidebarTrigger>
            <Button variant="ghost" size="icon" className="rounded-full md:hidden hover:bg-primary/10">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </SidebarTrigger>
          
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className="bg-atlas-teal/10 p-2 rounded-full"
            >
              <MapPin className="h-6 w-6 text-atlas-teal group-hover:text-atlas-orange transition-colors duration-300" />
            </motion.div>
            <motion.span 
              className="hidden md:inline-block text-xl font-bold bg-gradient-to-r from-atlas-teal to-atlas-navy bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Atlas
            </motion.span>
          </Link>

          <nav className="hidden md:flex items-center ml-6 space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;
              
              return (
                <Button
                  key={link.path}
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  asChild
                  className={`relative rounded-full ${isActive ? 'bg-primary/10' : ''} transition-all duration-200`}
                >
                  <Link to={link.path} className="flex items-center gap-1.5 px-4">
                    <Icon className="h-4 w-4" />
                    <span>{link.name}</span>
                    {isActive && (
                      <motion.div 
                        className="absolute bottom-0 left-0 h-0.5 bg-atlas-teal"
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </Button>
              );
            })}
          </nav>
        </div>

        <AnimatePresence>
          {isSearchOpen ? (
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "100%" }}
              exit={{ opacity: 0, width: 0 }}
              className="absolute left-0 top-0 h-16 px-4 flex items-center justify-center bg-background/95 backdrop-blur-md md:static md:w-auto md:bg-transparent md:px-0 md:backdrop-blur-none z-20 mx-16"
            >
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search destinations, users or journals..."
                  className="w-full pl-9 bg-muted/30 focus:bg-background border-2 rounded-full transition-colors duration-200"
                  autoFocus={isSearchOpen}
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden absolute right-1 top-1 rounded-full"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ) : (
            <div className="hidden md:flex flex-1 max-w-md px-4">
              <div className="relative w-full">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search destinations, users or journals..."
                  className="w-full pl-9 bg-muted/30 focus:bg-background border-atlas-teal/20 rounded-full hover:border-atlas-teal/40 focus:border-atlas-teal"
                />
              </div>
            </div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {isAuthenticated ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative rounded-full">
                    <Bell className="h-5 w-5" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-atlas-orange text-[10px] text-white">{notifications}</span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 p-2 rounded-xl animate-in slide-in-from-top-5">
                  <DropdownMenuLabel className="flex justify-between items-center">
                    <span>Notifications</span>
                    <Button variant="ghost" size="sm" className="h-8 text-xs">Mark all as read</Button>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-[300px] overflow-auto">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="py-2 px-1 hover:bg-accent rounded-lg transition-colors cursor-pointer">
                        <div className="flex gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>AB</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm line-clamp-2"><span className="font-medium">Alex Brown</span> added a new journal entry in <span className="text-atlas-teal">Switzerland</span></p>
                            <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <DropdownMenuSeparator />
                  <Button variant="ghost" size="sm" className="w-full justify-center mt-1">View all notifications</Button>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative h-9 w-9 rounded-full ml-2">
                    <Avatar className="h-9 w-9 ring-2 ring-offset-2 ring-atlas-teal/50 hover:ring-atlas-teal transition-all duration-300">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "Profile"} />
                      <AvatarFallback className="bg-atlas-teal text-white">
                        {user?.name?.charAt(0) || 'A'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 animate-in slide-in-from-top-5 rounded-xl p-2">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="bg-atlas-teal/10 p-1 rounded-full">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-atlas-teal text-white">
                          {user?.name?.charAt(0) || 'A'}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-sm font-medium line-clamp-1">{user?.name || "User"}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{user?.email || ""}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="my-1" />
                  <DropdownMenuItem asChild className="rounded-lg cursor-pointer focus:bg-accent/70">
                    <Link to="/profile" className="flex items-center py-1.5">
                      <User className="h-4 w-4 mr-2" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-lg cursor-pointer focus:bg-accent/70">
                    <Link to="/journal" className="flex items-center py-1.5">
                      <Book className="h-4 w-4 mr-2" />
                      <span>My Journal</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-lg cursor-pointer focus:bg-accent/70">
                    <Link to="/map" className="flex items-center py-1.5">
                      <Map className="h-4 w-4 mr-2" />
                      <span>My Map</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1" />
                  <DropdownMenuItem onClick={handleLogout} className="rounded-lg cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-500/10">
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="hidden sm:flex rounded-full">
                <Link to="/login" className="flex items-center gap-1">
                  <LogIn className="h-4 w-4 mr-1" />
                  Login
                </Link>
              </Button>
              <Button asChild variant="atlas" size="sm" className="rounded-full shadow-md hover:shadow-lg transition-all duration-300">
                <Link to="/register" className="flex items-center gap-1">
                  <User className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Sign Up</span>
                  <span className="sm:hidden">Join</span>
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
