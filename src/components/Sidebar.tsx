import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/auth.tsx';
import { useTheme } from '../lib/theme';
import { 
  LayoutGrid, 
  MessageSquare, 
  Calendar, 
  ShoppingBag, 
  Building2, 
  FileText,
  Settings,
  ExternalLink
} from 'lucide-react';

export default function Sidebar() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { theme } = useTheme();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      {/* Logo */}
      <div className="p-4">
        <a href="#" onClick={handleLogoClick} className="block">
          <img 
            src={theme === 'dark' ? "/logodark.png" : "/logolight.png"}
            alt="Auroville" 
            className="h-12 w-auto object-contain mx-auto"
          />
        </a>
      </div>

      {/* Main Navigation */}
      <nav className="px-3 py-2">
        <Link
          to="/dashboard"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            isActive('/dashboard')
              ? 'bg-auroville-primary text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <LayoutGrid className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/forums"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            isActive('/forums')
              ? 'bg-auroville-primary text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <MessageSquare className="h-5 w-5" />
          <span>Forums</span>
        </Link>

        <Link
          to="/events"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            isActive('/events')
              ? 'bg-auroville-primary text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <Calendar className="h-5 w-5" />
          <span>Events</span>
        </Link>

        <Link
          to="/bazaar"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            isActive('/bazaar')
              ? 'bg-auroville-primary text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <ShoppingBag className="h-5 w-5" />
          <span>Bazaar</span>
        </Link>

        <Link
          to="/services"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            isActive('/services')
              ? 'bg-auroville-primary text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <Building2 className="h-5 w-5" />
          <span>Services</span>
        </Link>

        <Link
          to="/resources"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            isActive('/resources')
              ? 'bg-auroville-primary text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <FileText className="h-5 w-5" />
          <span>Resources</span>
        </Link>

        <Link
          to="/settings"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            isActive('/settings')
              ? 'bg-auroville-primary text-white'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </nav>

      {/* External Resources */}
      <div className="mt-4 px-3">
        <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 px-3 mb-2">EXTERNAL RESOURCES</h3>
        <nav className="space-y-1">
          <a
            href="https://auroville.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <div>
              <div>Auroville Foundation</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Official Foundation Website</div>
            </div>
          </a>

          <a
            href="https://directory.auroville.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <div>
              <div>Directory</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Community Directory</div>
            </div>
          </a>

          <a
            href="https://news.auroville.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <div>
              <div>Media Portal</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">News and Media</div>
            </div>
          </a>

          <a
            href="https://wiki.auroville.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <div>
              <div>Wiki</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Community Knowledge Base</div>
            </div>
          </a>
        </nav>
      </div>

      {/* User Profile */}
      {user && (
        <div className="mt-4 px-3">
          <Link 
            to="/profile" 
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=FF8C00&color=fff`}
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <div className="text-sm font-medium">{user.name}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Community Member</div>
            </div>
          </Link>
        </div>
      )}
    </aside>
  );
}
