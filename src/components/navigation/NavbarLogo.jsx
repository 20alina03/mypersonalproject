
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';

const NavbarLogo = () => {
  return (
    <div className="flex items-center gap-2">
      <SidebarTrigger className="md:ml-1 h-9 w-9 shrink-0 rounded-full" />
      <Link to="/" className="hidden md:flex items-center gap-2">
        <MapPin className="h-6 w-6 text-primary" />
        <span className="font-bold text-lg">Atlas</span>
      </Link>
    </div>
  );
};

export default NavbarLogo;
