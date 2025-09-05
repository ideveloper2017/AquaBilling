import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  CreditCard, 
  DollarSign, 
  AlertTriangle, 
  BarChart3, 
  Settings,
  UserCheck,
  Droplets,
  LogOut,
  Phone,
  Calculator
} from 'lucide-react';

interface MenuItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles: string[];
}

const menuItems: MenuItem[] = [
  {
    label: 'Boshqaruv paneli',
    path: '/',
    icon: <LayoutDashboard className="w-5 h-5" />,
    roles: ['*']
  },
  {
    label: 'Foydalanuvchilar',
    path: '/users',
    icon: <Users className="w-5 h-5" />,
    roles: ['superadmin', 'admin']
  },
  {
    label: 'Mijozlar',
    path: '/customers',
    icon: <UserCheck className="w-5 h-5" />,
    roles: ['superadmin', 'admin', 'customer_service', 'cashier']
  },
  {
    label: 'Hisob-kitoblar',
    path: '/bills',
    icon: <FileText className="w-5 h-5" />,
    roles: ['superadmin', 'admin', 'cashier', 'customer_service']
  },
  {
    label: 'To\'lovlar',
    path: '/payments',
    icon: <CreditCard className="w-5 h-5" />,
    roles: ['superadmin', 'admin', 'cashier']
  },
  {
    label: 'Qarzlar',
    path: '/debts',
    icon: <AlertTriangle className="w-5 h-5" />,
    roles: ['superadmin', 'admin', 'debt_collection']
  },
  {
    label: 'Kassa',
    path: '/cashier',
    icon: <Calculator className="w-5 h-5" />,
    roles: ['cashier']
  },
  {
    label: 'Mijozlar xizmati',
    path: '/customer-service',
    icon: <Phone className="w-5 h-5" />,
    roles: ['customer_service']
  },
  {
    label: 'Hisobotlar',
    path: '/reports',
    icon: <BarChart3 className="w-5 h-5" />,
    roles: ['superadmin', 'admin', 'debt_collection']
  },
  {
    label: 'Sozlamalar',
    path: '/settings',
    icon: <Settings className="w-5 h-5" />,
    roles: ['superadmin', 'admin']
  }
];

export function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const hasAccess = (roles: string[]) => {
    if (!user) return false;
    return roles.includes('*') || roles.includes(user.role);
  };

  const filteredMenuItems = menuItems.filter(item => hasAccess(item.roles));

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-sky-500 rounded-lg">
            <Droplets className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Suv Tizimi</h1>
            <p className="text-sm text-gray-600">Billing Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {filteredMenuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors',
              location.pathname === item.path
                ? 'bg-sky-100 text-sky-700 border-sky-200'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            )}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-8 h-8 bg-sky-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
            <p className="text-xs text-gray-600 capitalize">{user?.role?.replace('_', ' ')}</p>
          </div>
        </div>
        <Button 
          onClick={logout}
          variant="outline" 
          size="sm" 
          className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Chiqish
        </Button>
      </div>
    </div>
  );
}