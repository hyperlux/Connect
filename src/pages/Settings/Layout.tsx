import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Settings, Bell, Shield, Key } from 'lucide-react';
import { useAuth } from '../../lib/auth';

export default function SettingsLayout() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" style={{ backgroundColor: 'var(--color-background)' }}>
      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="col-span-3">
          <nav className="space-y-1" style={{ backgroundColor: 'var(--color-card)', borderRadius: '0.75rem' }}>
            <NavLink
              to="/app/settings/profile"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-auroville-light dark:bg-[#E27B58]/20 text-auroville-primary'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-lighter'
                }`
              }
            >
              <Settings className="mr-3 h-5 w-5" />
              General Settings
            </NavLink>

            <NavLink
              to="/app/settings/notifications"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-auroville-light dark:bg-[#E27B58]/20 text-auroville-primary'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-lighter'
                }`
              }
            >
              <Bell className="mr-3 h-5 w-5" />
              Notifications
            </NavLink>

            <NavLink
              to="/app/settings/privacy"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-auroville-light dark:bg-[#E27B58]/20 text-auroville-primary'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-lighter'
                }`
              }
            >
              <Shield className="mr-3 h-5 w-5" />
              Privacy
            </NavLink>

            <NavLink
              to="/app/settings/security"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-auroville-light dark:bg-[#E27B58]/20 text-auroville-primary'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-lighter'
                }`
              }
            >
              <Key className="mr-3 h-5 w-5" />
              Security
            </NavLink>
          </nav>
        </div>

        {/* Main Content */}
        <div className="col-span-9">
          <div className="rounded-xl shadow-sm" style={{ backgroundColor: 'var(--color-card)' }}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
