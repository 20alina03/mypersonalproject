
import { createContext, useContext, useState } from 'react';
import { mockCurrentUser } from '@/lib/mockData';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(mockCurrentUser);

  const login = async (email, password) => {
    // Mock login functionality
    setUser(mockCurrentUser);
  };

  const logout = async () => {
    // Mock logout functionality
    setUser(null);
  };

  const register = async (email, password, name) => {
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
