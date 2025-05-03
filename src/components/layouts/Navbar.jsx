
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import SearchBar from '@/components/search/SearchBar';
import NavbarLogo from '../navigation/NavbarLogo';
import NotificationsDropdown from '../navigation/NotificationsDropdown';
import UserDropdown from '../navigation/UserDropdown';
import MobileMenu from '../navigation/MobileMenu';

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
        <NavbarLogo />
        
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
      
      <MobileMenu isOpen={mobileMenuOpen} />
    </header>
  );
};

export default Navbar;
