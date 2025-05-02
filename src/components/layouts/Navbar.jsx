
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
  Users
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
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

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
    await logout();
  };

  const navLinks = [
    { name: 'Map', path: '/map', icon: Map },
    { name: 'Journal', path: '/journal', icon: Book },
    { name: 'Roammates', path: '/roammates', icon: Users },
  ];

  return (
    <header className={`sticky top-0 z-40 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200 ${scrolled ? 'shadow-sm bg-background/95' : 'bg-background/30'}`}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </SidebarTrigger>
          
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
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
                  className={`relative ${isActive ? 'bg-primary/10' : ''} transition-all duration-200`}
                >
                  <Link to={link.path} className="flex items-center gap-1.5">
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

        <div className={`${isSearchOpen ? 'flex' : 'hidden'} md:flex flex-1 max-w-md px-4`}>
          <div className="relative w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search destinations, users or journals..."
              className="w-full pl-8 bg-muted/30 focus:bg-background transition-colors duration-200"
            />
            {isSearchOpen && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden absolute right-0 top-0"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8 ring-2 ring-offset-2 ring-atlas-teal/50 hover:ring-atlas-teal transition-all duration-300">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name || "Profile"} />
                    <AvatarFallback className="bg-atlas-teal text-white">
                      {user?.name?.charAt(0) || 'A'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 animate-in slide-in-from-top-5">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="bg-atlas-teal/10 p-1 rounded-full">
                    <Avatar className="h-8 w-8">
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
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/journal" className="cursor-pointer flex items-center">
                    <Book className="h-4 w-4 mr-2" />
                    <span>My Journal</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/map" className="cursor-pointer flex items-center">
                    <Map className="h-4 w-4 mr-2" />
                    <span>My Map</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:text-red-500">
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Log Out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="hidden sm:flex">
                <Link to="/login" className="flex items-center gap-1">
                  <LogIn className="h-4 w-4 mr-1" />
                  Login
                </Link>
              </Button>
              <Button asChild variant="default" size="sm" className="bg-atlas-teal hover:bg-atlas-teal/90">
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
