import React from 'react';
import { Bell } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from './ui/dropdown-menu';

export default function NotificationsPopover() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={`relative p-2 rounded-lg transition-colors ${
            isDark 
              ? 'hover:bg-dark-lighter text-dark-secondary hover:text-dark-primary' 
              : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
          }`}
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className={`px-4 py-3 font-medium ${isDark ? 'text-dark-primary' : 'text-gray-900'}`}>
          Notifications
        </div>
        <DropdownMenuItem>
          <div className="flex flex-col gap-1">
            <p className={`text-sm ${isDark ? 'text-dark-primary' : 'text-gray-900'}`}>
              New event: Community Gathering
            </p>
            <p className={`text-xs ${isDark ? 'text-dark-secondary' : 'text-gray-500'}`}>
              2 hours ago
            </p>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}