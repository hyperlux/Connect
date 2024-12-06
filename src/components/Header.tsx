import { Link, useNavigate } from 'react-router-dom';
import { Search, Users } from 'lucide-react';
import { useAuth } from '../lib/auth';
import ThemeToggle from './ThemeToggle';
import NotificationsPopover from './NotificationsPopover';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="px-8 py-3 bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-[#2a2a2a]">
      <div className="flex items-center justify-between max-w-[1920px] mx-auto">
        {/* Left Section */}
        <div className="flex items-center gap-8">
          {/* Search Section */}
          <div className="relative w-[280px]">
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-9 pl-9 pr-4 text-sm rounded-lg bg-gray-50 dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#333333] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-auroville-primary focus:border-auroville-primary"
            />
            <Search className="absolute left-2.5 top-2 h-5 w-5 text-gray-400 dark:text-gray-500" />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center">
          {/* Visitor Counter */}
          <div className="flex items-center mr-6">
            <div className="flex items-center gap-2 px-2.5 py-1.5 text-xs rounded-md bg-gray-50 dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#333333]">
              <Users className="h-4 w-4 text-auroville-primary" />
              <div>
                <span className="font-medium text-auroville-primary">1,247</span>
                <span className="ml-1 text-gray-600 dark:text-gray-400">visitors</span>
              </div>
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="mr-6">
            <ThemeToggle />
          </div>

          {isAuthenticated && user ? (
            <div className="flex items-center">
              {/* Notifications */}
              <div className="mr-6">
                <NotificationsPopover />
              </div>

              {/* Profile and Logout */}
              <div className="flex items-center gap-4 border-l border-gray-200 dark:border-[#2a2a2a] pl-6">
                <Link to="/profile" className="flex items-center gap-3">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}&background=E27B58&color=fff`}
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-white">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Community Member
                    </p>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-3 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}