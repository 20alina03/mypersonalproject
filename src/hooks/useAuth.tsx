
import { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile, mockCurrentUser } from '@/lib/mockData';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(mockCurrentUser);

  const login = async (email: string, password: string) => {
    // Mock login functionality
    setUser(mockCurrentUser);
  };

  const logout = async () => {
    // Mock logout functionality
    setUser(null);
  };

  const register = async (email: string, password: string, name: string) => {
    // Mock registration functionality
    setUser(mockCurrentUser);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
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
