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
    <header className="px-3 py-2 bg-[#1a1a1a] border-b border-[#2a2a2a]">
      <div className="flex items-center justify-between">
        {/* Search and Visitor Count Container */}
        <div className="flex-1 ml-52 flex flex-col">
          <div className="relative w-[500px]">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-[#2a2a2a] border border-[#333333] text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-auroville-primary focus:border-transparent text-sm"
            />
            <Search className="absolute left-2.5 top-2 h-4 w-4 text-gray-400" />
          </div>
          <div className="mt-0.5 flex items-center gap-1 text-xs">
            <Users className="h-3.5 w-3.5 text-auroville-primary" />
            <span className="text-auroville-primary font-medium">1,247</span>
            <span className="text-gray-400">visitors today</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <NotificationsPopover />
              <Link to="/profile" className="flex items-center gap-2">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}&background=E27B58&color=fff`}
                  alt="Profile"
                  className="w-7 h-7 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-white">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    Community Member
                  </p>
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded hover:bg-[#2a2a2a] transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-xs text-gray-400 hover:text-white px-2 py-1 rounded hover:bg-[#2a2a2a] transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="text-xs text-white bg-auroville-primary hover:bg-opacity-90 px-3 py-1 rounded transition-colors"
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