
import { createContext, useContext, useState } from 'react';
import { mockCurrentUser } from '@/lib/mockData';
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(mockCurrentUser);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // Mock login functionality - would connect to backend in real app
      console.log(`Logging in with ${email}`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setUser(mockCurrentUser);
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in to Atlas.",
        variant: "default",
      });
      return true;
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Mock logout functionality
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser(null);
      toast({
        title: "Logged out",
        description: "You've been successfully logged out.",
      });
      
      navigate("/");
      return true;
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: "There was an error logging you out. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, password, name) => {
    setIsLoading(true);
    try {
      // Mock registration functionality
      console.log(`Registering user: ${name} (${email})`);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser({
        ...mockCurrentUser,
        name,
        email,
      });
      toast({
        title: "Registration successful!",
        description: "Welcome to Atlas. Your journey begins now!",
      });
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: "There was an error creating your account. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
      register
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
