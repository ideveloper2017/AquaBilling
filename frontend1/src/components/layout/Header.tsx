import React from 'react';
import { Bell, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Badge } from '@/components/ui/badge';

function Header() {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-background">
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="px-3 py-2 rounded-md border bg-muted focus:outline-none"
        />
        <button className="relative p-2 rounded-full hover:bg-muted transition">
          <Bell className="w-5 h-5" />
          <Badge className="absolute -top-1 -right-1">3</Badge>
        </button>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full border hover:bg-muted transition"
          aria-label="Toggle dark mode"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-yellow-400 dark:text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
          )}
        </button>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-semibold">{user?.name}</span>
        <span className="text-xs text-muted-foreground">{user?.role}</span>
      </div>
    </header>
  );
}

export { Header };