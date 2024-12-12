import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function NotificationsPopover() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
          <Bell className="h-5 w-5 text-auroville-primary" />
          {/* Add notification badge here if needed */}
        </button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex flex-col max-h-[500px] overflow-y-auto">
          <div className="px-4 py-3 border-b">
            <h3 className="font-semibold">Notifications</h3>
          </div>
          {/* Notification items go here */}
          <div className="p-4 text-center text-sm text-gray-500">
            No new notifications
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
