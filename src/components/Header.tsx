import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Search, Users } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import ThemeToggle from './ThemeToggle';
import NotificationsPopover from './NotificationsPopover';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className={`px-6 py-4 ${
      isDark 
        ? 'bg-dark-card border-dark' 
        : 'bg-white border-gray-200'
    } border-b`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Search..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                isDark
                  ? 'bg-dark-lighter border-dark text-dark-primary placeholder-dark-secondary'
                  : 'bg-white border-gray-300 text-gray-900'
              } border focus:outline-none focus:ring-2 focus:ring-auroville-primary focus:border-transparent`}
            />
            <Search className={`absolute left-3 top-2.5 h-5 w-5 ${
              isDark ? 'text-dark-secondary' : 'text-gray-400'
            }`} />
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Visitor Counter */}
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
            isDark ? 'bg-dark-lighter' : 'bg-auroville-light'
          }`}>
            <Users className="h-5 w-5 text-auroville-primary" />
            <div className="text-sm">
              <span className="font-medium text-auroville-primary">1,247</span>
              <span className={`ml-1 ${
                isDark ? 'text-dark-secondary' : 'text-gray-600'
              }`}>visitors today</span>
            </div>
          </div>

          <ThemeToggle />

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <NotificationsPopover />
              <Link to="/profile" className="flex items-center gap-3">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}&background=E27B58&color=fff`}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <p className={`text-sm font-medium ${
                    isDark ? 'text-dark-primary' : 'text-gray-700'
                  }`}>
                    {user?.name}
                  </p>
                  <p className={`text-xs ${
                    isDark ? 'text-dark-secondary' : 'text-gray-500'
                  }`}>
                    Community Member
                  </p>
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className={`text-sm hover:text-gray-900 ${
                  isDark ? 'text-dark-secondary hover:text-dark-primary' : 'text-gray-600'
                }`}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-auroville-primary text-white rounded-lg hover:bg-opacity-90"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}