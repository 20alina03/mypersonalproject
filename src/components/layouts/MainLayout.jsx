
import { ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AnimatePresence, motion } from 'framer-motion';

const MainLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col w-full bg-gradient-to-br from-background to-muted/30">
        <Navbar />
        <div className="flex flex-1 w-full">
          <Sidebar />
          <motion.main 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex-1 p-4 md:p-6 overflow-auto max-h-[calc(100vh-4rem)]"
          >
            <AnimatePresence mode="wait">
              {children}
            </AnimatePresence>
          </motion.main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
