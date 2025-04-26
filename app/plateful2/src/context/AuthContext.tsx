import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Partial<User>, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem('platefulUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call to a backend service
    try {
      // Mock authentication for demo
      const user = mockUsers.find(u => u.email === email);
      
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
        localStorage.setItem('platefulUser', JSON.stringify(user));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('platefulUser');
  };

  const register = async (userData: Partial<User>, password: string): Promise<boolean> => {
    // In a real app, this would be an API call to a backend service
    try {
      // Mock registration for demo
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: userData.name || '',
        email: userData.email || '',
        role: userData.role || 'donor',
        address: userData.address,
        location: userData.location,
        verified: userData.role === 'sharer' ? false : true, // NGOs need verification
      };
      
      setCurrentUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('platefulUser', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};