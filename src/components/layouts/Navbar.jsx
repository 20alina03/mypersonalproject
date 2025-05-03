
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { MapPin, Bell, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarTrigger } from '@/components/ui/sidebar';
import SearchBar from '@/components/search/SearchBar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled ? 'bg-background/90 backdrop-blur-md shadow-sm' : 'bg-background'
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:ml-1 h-9 w-9 shrink-0 rounded-full" />
          <Link to="/" className="hidden md:flex items-center gap-2">
            <MapPin className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">Atlas</span>
          </Link>
        </div>
        
        <div className="hidden md:block flex-1 mx-8">
          <SearchBar />
        </div>
        
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-1 mr-2">
            <NotificationsDropdown />
          </div>
          
          <div className="hidden md:block">
            <UserDropdown />
          </div>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t shadow-lg animate-in slide-in-from-top">
          <div className="container py-4 space-y-4">
            <SearchBar />
            
            <div className="flex items-center justify-between">
              <NotificationsDropdown />
              <UserDropdown />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const UserDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="rounded-full h-9 w-9 p-0">
          <Avatar className="h-8 w-8 border avatar-ring">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">Alex Johnson</p>
            <p className="text-xs text-muted-foreground">@alexjourneys</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/profile" className="cursor-pointer">My Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/journal" className="cursor-pointer">My Journal</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/map" className="cursor-pointer">My Map</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/roammates" className="cursor-pointer">Roammates</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/login" className="cursor-pointer text-muted-foreground">Sign out</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const NotificationsDropdown = () => {
  const notifications = [
    {
      id: 'notif1',
      type: 'comment',
      content: 'Maya Patel commented on your journal entry',
      time: '5 min ago',
      read: false
    },
    {
      id: 'notif2',
      type: 'roammate',
      content: 'Carlos Rodriguez sent you a roammate request',
      time: '2 hours ago',
      read: false
    },
    {
      id: 'notif3',
      type: 'like',
      content: 'Emma Wilson liked your Tokyo journal entry',
      time: '1 day ago',
      read: true
    }
  ];
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-[10px] bg-secondary">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length > 0 ? (
          <>
            {notifications.map(notification => (
              <DropdownMenuItem key={notification.id} className={`cursor-pointer py-3 ${!notification.read ? 'bg-muted/50' : ''}`}>
                <div className="flex flex-col space-y-1">
                  <p className={`text-sm ${!notification.read ? 'font-medium' : ''}`}>
                    {notification.content}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {notification.time}
                  </p>
                </div>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-center text-primary">
              View all notifications
            </DropdownMenuItem>
          </>
        ) : (
          <div className="py-4 text-center text-muted-foreground">
            You have no new notifications
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Navbar;
