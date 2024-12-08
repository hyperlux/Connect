import { Link, useNavigate } from 'react-router-dom';
import { Search, Users, Menu } from 'lucide-react';
import { useAuth } from '../lib/auth';
import ThemeToggle from './ThemeToggle';
import { NotificationsPopover } from './NotificationsPopover';
import { useEffect, useState } from 'react';

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-gray-400 hover:text-white"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Search and Visitor Count Container */}
        <div className="flex-1 ml-4 lg:ml-52 flex flex-col">
          <div className="relative w-full max-w-[500px]">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-[#2a2a2a] border border-[#333333] text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-auroville-primary focus:border-transparent text-sm"
            />
            <Search className="absolute left-2.5 top-2 h-4 w-4 text-gray-400" />
          </div>
          <div className="mt-0.5 hidden sm:flex items-center gap-1 text-xs">
            <Users className="h-3.5 w-3.5 text-auroville-primary" />
            <span className="text-auroville-primary font-medium">1,247</span>
            <span className="text-gray-400">visitors today</span>
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

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center gap-3">
          <ThemeToggle />
          {isAuthenticated && user ? (
            <Link to="/profile">
              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}&background=E27B58&color=fff`}
                alt="Profile"
                className="w-7 h-7 rounded-full"
              />
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-xs text-white bg-auroville-primary hover:bg-opacity-90 px-3 py-1 rounded transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-[#1a1a1a]">
          <div className="p-4">
            <button 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-400 hover:text-white mb-4"
            >
              Close
            </button>
            <div className="space-y-4">
              {isAuthenticated && user ? (
                <>
                  <div className="flex items-center gap-3 p-2">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || '')}&background=E27B58&color=fff`}
                      alt="Profile"
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-white">
                        {user?.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        Community Member
                      </p>
                    </div>
                  </div>
                  <NotificationsPopover />
                  <button
                    onClick={handleLogout}
                    className="w-full text-left text-sm text-gray-400 hover:text-white p-2 rounded hover:bg-[#2a2a2a] transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className="block text-sm text-gray-400 hover:text-white p-2 rounded hover:bg-[#2a2a2a] transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block text-sm text-white bg-auroville-primary hover:bg-opacity-90 p-2 rounded transition-colors"
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