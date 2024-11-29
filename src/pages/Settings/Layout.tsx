import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Settings, Bell, Shield, Key } from 'lucide-react';
import { useAuth } from '../../lib/auth';

export default function SettingsLayout() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="col-span-3">
          <nav className="space-y-1">
            <NavLink
              to="/settings/profile"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <Settings className="mr-3 h-5 w-5" />
              General Settings
            </NavLink>

            <NavLink
              to="/settings/notifications"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <Bell className="mr-3 h-5 w-5" />
              Notifications
            </NavLink>

            <NavLink
              to="/settings/privacy"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <Shield className="mr-3 h-5 w-5" />
              Privacy
            </NavLink>

            <NavLink
              to="/settings/security"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
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
          <div className="bg-white rounded-xl shadow-sm">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
} 