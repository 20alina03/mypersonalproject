
import { useState } from 'react';
import SearchBar from '@/components/search/SearchBar';
import NotificationsDropdown from './NotificationsDropdown';
import UserDropdown from './UserDropdown';

const MobileMenu = ({ isOpen }) => {
  if (!isOpen) return null;
  
  return (
    <div className="md:hidden bg-background border-t shadow-lg animate-in slide-in-from-top">
      <div className="container py-4 space-y-4">
        <SearchBar />
        
        <div className="flex items-center justify-between">
          <NotificationsDropdown />
          <UserDropdown />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
