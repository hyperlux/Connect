import { Link, useNavigate } from 'react-router-dom';
import { Search, Users } from 'lucide-react';
import { useAuth } from '../lib/auth';
import ThemeToggle from './ThemeToggle';
import { NotificationsPopover } from './NotificationsPopover';
import { useEffect } from 'react';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Header auth state:', { user, isAuthenticated });
  }, [user, isAuthenticated]);

  const handleLogout = async () => {
    console.log('Starting logout...');
    try {
      await logout();
      console.log('Logout successful, navigating to login...');
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 0);
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/login', { replace: true });
    }
  };

  if (typeof isAuthenticated === 'undefined') {
    return null;
  }

  return (
    <header className="px-6 py-3 bg-white dark:bg-[#1a1a1a] border-b border-gray-200 dark:border-[#2a2a2a]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/logo.png" 
              alt="Auroville Community" 
              className="h-12 w-auto"
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Auroville</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">COMMUNITY</p>
            </div>
          </Link>

          <div className="relative w-96">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white dark:bg-[#2a2a2a] border border-gray-300 dark:border-[#333333] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-auroville-primary focus:border-transparent"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-400" />
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Visitor Counter */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-auroville-light dark:bg-[#2a2a2a]">
            <Users className="h-5 w-5 text-auroville-primary" />
            <div className="text-sm">
              <span className="font-medium text-auroville-primary">1,247</span>
              <span className="ml-1 text-gray-600 dark:text-gray-400">visitors today</span>
            </div>
          </div>

          <ThemeToggle />

          {isAuthenticated && user ? (
            <div className="flex items-center gap-4">
              <NotificationsPopover />
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
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-3 py-1 rounded hover:bg-gray-100 dark:hover:bg-[#2a2a2a] transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="text-sm text-white bg-auroville-primary hover:bg-opacity-90 px-4 py-1.5 rounded transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}