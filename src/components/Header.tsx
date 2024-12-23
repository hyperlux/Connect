import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Users, Menu, X } from 'lucide-react';
import { useAuth } from '../lib/auth';
import ThemeToggle from './ThemeToggle';
import { NotificationsPopover } from './NotificationsPopover';
import { useTheme } from '../lib/theme';
import { useSidebar } from '../lib/sidebar';
import { API_URL } from '../lib/environment';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const { isOpen, toggle } = useSidebar();
  const [avatarKey, setAvatarKey] = useState(0);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/login', { replace: true });
    }
  };

  // Update avatarKey when user or profilePicture changes
  useEffect(() => {
    setAvatarKey(prev => prev + 1);
  }, [user?.profilePicture]);

  const getProfileImage = () => {
    if (user?.profilePicture) {
      return `${API_URL}${user.profilePicture}?${avatarKey}`;
    }
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}&background=FF8C00&color=fff`;
  };

  if (typeof isAuthenticated === 'undefined') {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-screen-2xl mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          {/* Hamburger Menu Button */}
          <button 
            onClick={toggle}
            className="relative z-50 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-auroville-primary"
            aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            {isOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          {/* Search and Visitor Count */}
          <div className="flex-1 flex items-center justify-center gap-4">
            <div className="flex items-center gap-1 text-xs">
              <Users className="h-3.5 w-3.5 text-auroville-primary" />
              <span className="text-auroville-primary font-medium">1,247</span>
              <span className="text-gray-500 dark:text-gray-400">visitors today</span>
            </div>
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-auroville-primary focus:border-auroville-primary text-sm"
              />
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4">
            <ThemeToggle />

            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <NotificationsPopover />
                <Link to="/profile" className="flex items-center gap-2">
                  <img
                    key={avatarKey}
                    src={getProfileImage()}
                    alt="Profile"
                    className="w-7 h-7 rounded-full object-cover"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      if (!img.src.includes('ui-avatars')) {
                        img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}&background=FF8C00&color=fff`;
                      }
                    }}
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Community Member
                    </p>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-xs text-white bg-auroville-primary hover:bg-auroville-primary/90 px-3 py-1 rounded transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center gap-3">
            <ThemeToggle />
            {isAuthenticated && user ? (
              <Link to="/profile">
                <img
                  key={avatarKey}
                  src={getProfileImage()}
                  alt="Profile"
                  className="w-7 h-7 rounded-full object-cover"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    if (!img.src.includes('ui-avatars')) {
                      img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}&background=FF8C00&color=fff`;
                    }
                  }}
                />
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-xs text-white bg-auroville-primary hover:bg-auroville-primary/90 px-3 py-1 rounded transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white dark:bg-gray-800">
          <div className="p-4">
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mb-4"
            >
              Close
            </button>
            <div className="space-y-4">
              {isAuthenticated && user ? (
                <>
                  <div className="flex items-center gap-3 p-2">
                    <img
                      key={avatarKey}
                      src={getProfileImage()}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        if (!img.src.includes('ui-avatars')) {
                          img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}&background=FF8C00&color=fff`;
                        }
                      }}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Community Member
                      </p>
                    </div>
                  </div>
                  <NotificationsPopover />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className="block text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block text-sm text-white bg-auroville-primary hover:bg-auroville-primary/90 p-2 rounded transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
