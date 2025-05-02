
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Menu,
  Search,
  MapPin,
  User,
  LogIn,
  LogOut,
  Settings,
  PenSquare,
  Map as MapIcon,
  Bell,
  Globe
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
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate('/login');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
          </SidebarTrigger>
          
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-br from-atlas-teal to-atlas-navy rounded-md p-1 group-hover:from-atlas-navy group-hover:to-atlas-teal transition-all duration-300">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <span className="hidden md:inline-block text-xl font-bold bg-gradient-to-r from-atlas-teal to-atlas-navy bg-clip-text text-transparent">Atlas</span>
          </Link>
        </div>

        <div className={`${isSearchOpen ? 'flex' : 'hidden'} md:flex flex-1 max-w-md px-4`}>
          <div className="relative w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search destinations, users or journals..."
              className="w-full pl-8 bg-muted/30 focus:ring-atlas-teal/30 transition-all"
            />
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
            <>
              <div className="hidden sm:flex items-center">
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-atlas-orange">3</Badge>
                  <span className="sr-only">Notifications</span>
                </Button>
                
                <Button variant="ghost" size="sm" className="ml-2" asChild>
                  <Link to="/journal">
                    <PenSquare className="h-4 w-4 mr-1" />
                    Journal
                  </Link>
                </Button>
                
                <Button variant="ghost" size="sm" className="ml-1" asChild>
                  <Link to="/map">
                    <Globe className="h-4 w-4 mr-1" />
                    Map
                  </Link>
                </Button>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8 avatar-ring border-2 border-atlas-teal hover:border-atlas-orange transition-all">
                      <AvatarImage src="/placeholder.svg" alt={user?.name || "Profile"} />
                      <AvatarFallback className="bg-atlas-teal text-white">
                        {user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name || "User"}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email || ""}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center cursor-pointer">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/journal" className="flex items-center cursor-pointer">
                      <PenSquare className="h-4 w-4 mr-2" />
                      My Journal
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/map" className="flex items-center cursor-pointer">
                      <MapIcon className="h-4 w-4 mr-2" />
                      My Map
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center cursor-pointer">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center cursor-pointer text-red-500 focus:text-red-500">
                    <LogOut className="h-4 w-4 mr-2" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost" size="sm" className="hover:bg-atlas-teal/10">
                <Link to="/login" className="flex items-center gap-1">
                  <LogIn className="h-4 w-4 mr-1" />
                  Login
                </Link>
              </Button>
              <Button 
                asChild 
                variant="default" 
                size="sm"
                className="bg-gradient-to-r from-atlas-teal to-atlas-navy hover:from-atlas-navy hover:to-atlas-teal transition-colors duration-300"
              >
                <Link to="/register" className="flex items-center gap-1">
                  <User className="h-4 w-4 mr-1" />
                  Sign Up
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
