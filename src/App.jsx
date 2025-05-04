
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MapPage from "./pages/MapPage";
import JournalPage from "./pages/JournalPage";
import JournalEntryPage from "./pages/JournalEntryPage";
import ProfilePage from "./pages/ProfilePage";
import RoammatesPage from "./pages/RoammatesPage";
import RoammateProfilePage from "./pages/RoammateProfilePage";
import RoammatesFeedPage from "./pages/RoammatesFeedPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/journal/:id" element={<JournalEntryPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/roammates" element={<RoammatesPage />} />
          <Route path="/roammate-profile/:userId" element={<RoammateProfilePage />} />
          <Route path="/roammates-feed" element={<RoammatesFeedPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
