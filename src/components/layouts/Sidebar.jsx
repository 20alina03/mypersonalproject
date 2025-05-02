
import { Link, useLocation } from 'react-router-dom';
import { Book, Map, Users, MapPin, User, Settings, Home, Compass, Heart, PlusCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const Sidebar = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const navigationItems = [
    {
      title: 'Feed',
      icon: <Home className="h-5 w-5" />,
      link: '/',
    },
    {
      title: 'Explore Map',
      icon: <Map className="h-5 w-5" />,
      link: '/map',
    },
    {
      title: 'My Journal',
      icon: <Book className="h-5 w-5" />,
      link: '/journal',
    },
    {
      title: 'Roammates',
      icon: <Users className="h-5 w-5" />,
      link: '/roammates',
    },
  ];

  const accountItems = [
    {
      title: 'Profile',
      icon: <User className="h-5 w-5" />,
      link: '/profile',
    },
    {
      title: 'Settings',
      icon: <Settings className="h-5 w-5" />,
      link: '/settings',
    },
  ];

  const exploreSections = [
    {
      title: 'Popular Destinations',
      icon: <MapPin className="h-5 w-5" />,
      link: '/explore/popular',
    },
    {
      title: 'Saved Places',
      icon: <Heart className="h-5 w-5" />,
      link: '/explore/saved',
    },
    {
      title: 'Travel Guides',
      icon: <Compass className="h-5 w-5" />,
      link: '/explore/guides',
    },
  ];

  return (
    <SidebarComponent>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-3 py-4">
          <div className="bg-atlas-teal/10 p-1.5 rounded-full">
            <MapPin className="h-6 w-6 text-atlas-teal" />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-atlas-teal to-atlas-navy bg-clip-text text-transparent">Atlas</span>
        </div>
        {isAuthenticated && (
          <div className="px-3 mb-3">
            <Button className="w-full bg-atlas-teal hover:bg-atlas-teal/90 gap-2 rounded-xl shadow-sm" size="sm">
              <PlusCircle className="h-4 w-4" />
              <span>New Entry</span>
            </Button>
          </div>
        )}
      </SidebarHeader>
      
      <SidebarContent className="py-2">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 py-1.5">Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.link;
              
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild
                    className={`rounded-xl transition-colors ${isActive ? 'bg-atlas-teal/10 text-atlas-teal font-medium' : ''}`}
                  >
                    <Link to={item.link} className="flex items-center gap-3 relative px-3 py-2">
                      <span className={`${isActive ? 'text-atlas-teal' : ''}`}>
                        {item.icon}
                      </span>
                      <span>{item.title}</span>
                      {isActive && (
                        <motion.div 
                          layoutId="sidebar-active-item"
                          className="absolute left-0 top-0 bottom-0 w-1 bg-atlas-teal rounded-r-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        {isAuthenticated && (
          <>
            <SidebarGroup>
              <SidebarGroupLabel className="px-3 py-1.5">Explore</SidebarGroupLabel>
              <SidebarMenu>
                {exploreSections.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild
                      className={`rounded-xl transition-colors ${location.pathname === item.link ? 'bg-atlas-teal/10 text-atlas-teal font-medium' : ''}`}
                    >
                      <Link to={item.link} className="flex items-center gap-3 px-3 py-2">
                        <span>{item.icon}</span>
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel className="px-3 py-1.5">Account</SidebarGroupLabel>
              <SidebarMenu>
                {accountItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild
                      className={`rounded-xl transition-colors ${location.pathname === item.link ? 'bg-atlas-teal/10 text-atlas-teal font-medium' : ''}`}
                    >
                      <Link to={item.link} className="flex items-center gap-3 px-3 py-2">
                        <span>{item.icon}</span>
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </>
        )}
      </SidebarContent>

      <SidebarFooter>
        <div className="px-3 py-4 border-t border-sidebar-border/50">
          <div className="mb-2 px-2">
            {!isAuthenticated && (
              <div className="space-y-2">
                <Button asChild variant="outline" className="w-full justify-center border-sidebar-border" size="sm">
                  <Link to="/login">Log In</Link>
                </Button>
                <Button asChild className="w-full justify-center bg-atlas-teal hover:bg-atlas-teal/90" size="sm">
                  <Link to="/register">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
          <p className="text-xs text-sidebar-foreground/70">Atlas Travel Platform</p>
          <p className="text-xs text-sidebar-foreground/50">© 2025 Atlas Inc.</p>
        </div>
      </SidebarFooter>
    </SidebarComponent>
  );
};

export default Sidebar;
