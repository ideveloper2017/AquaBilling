import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

export function Header() {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
      <div className="flex items-center flex-1">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Qidirish..."
            className="pl-10 pr-4 bg-gray-50 border-gray-200 focus:bg-white"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <Badge 
            variant="destructive" 
            className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
          >
            3
          </Badge>
        </Button>

        <div className="flex items-center space-x-2 text-sm">
          <User className="w-4 h-4 text-gray-500" />
          <span className="text-gray-700">{user?.name}</span>
          <Badge variant="secondary" className="capitalize">
            {user?.role?.replace('_', ' ')}
          </Badge>
        </div>
      </div>
    </header>
  );
}