import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  hasRole: (roles: UserRole[]) => boolean;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Super Admin',
    email: 'superadmin@water.com',
    phone: '+998901234567',
    role: 'superadmin',
    isActive: true,
    createdAt: new Date(),
    lastLogin: new Date(),
  },
  {
    id: '2',
    name: 'System Admin',
    email: 'admin@water.com',
    phone: '+998901234568',
    role: 'admin',
    isActive: true,
    createdAt: new Date(),
    lastLogin: new Date(),
  },
  {
    id: '3',
    name: 'Kassir Olimjon',
    email: 'cashier@water.com',
    phone: '+998901234569',
    role: 'cashier',
    isActive: true,
    createdAt: new Date(),
    lastLogin: new Date(),
  },
  {
    id: '4',
    name: 'Debt Collector',
    email: 'debt@water.com',
    phone: '+998901234570',
    role: 'debt_collection',
    isActive: true,
    createdAt: new Date(),
    lastLogin: new Date(),
  },
  {
    id: '5',
    name: 'Customer Service',
    email: 'service@water.com',
    phone: '+998901234571',
    role: 'customer_service',
    isActive: true,
    createdAt: new Date(),
    lastLogin: new Date(),
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === '123456') {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const hasRole = (roles: UserRole[]): boolean => {
    return user ? roles.includes(user.role) : false;
  };

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    const rolePermissions: Record<UserRole, string[]> = {
      superadmin: ['*'],
      admin: ['user_management', 'customer_management', 'billing', 'reports', 'system_settings'],
      cashier: ['billing', 'payments', 'customer_view'],
      customer: ['view_bills', 'make_payment'],
      debt_collection: ['debt_management', 'customer_contact', 'reports'],
      customer_service: ['customer_management', 'billing_support', 'customer_contact'],
    };

    const userPermissions = rolePermissions[user.role] || [];
    return userPermissions.includes('*') || userPermissions.includes(permission);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, hasRole, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}