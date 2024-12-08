import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { useTheme } from '../lib/theme';
import { 
  LayoutGrid, 
  Vote, 
  MessageSquare, 
  Calendar, 
  ShoppingBag, 
  Building2, 
  FileText,
  Settings,
  ExternalLink
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();
  const { theme } = useTheme();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="h-full bg-[#1a1a1a] text-gray-400 overflow-y-auto">
      {/* Logo */}
      <div className="p-4">
        <Link to="/" className="block">
          <img 
            src={theme === 'dark' ? "/logodark.png" : "/logolight.png"}
            alt="Auroville" 
            className="h-12 w-auto object-contain mx-auto"
          />
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="mt-2 px-2">
        <Link
          to="/dashboard"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            isActive('/dashboard')
              ? 'bg-[#E27B58] text-white'
              : 'hover:bg-[#2a2a2a] hover:text-white'
          }`}
        >
          <LayoutGrid className="h-5 w-5" />
          <span>Dashboard</span>
        </Link>

        <Link
          to="/decision-hub"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            isActive('/decision-hub')
              ? 'bg-[#E27B58] text-white'
              : 'hover:bg-[#2a2a2a] hover:text-white'
          }`}
        >
          <Vote className="h-5 w-5" />
          <span>Decision Hub</span>
        </Link>

        <Link
          to="/forums"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            isActive('/forums')
              ? 'bg-[#E27B58] text-white'
              : 'hover:bg-[#2a2a2a] hover:text-white'
          }`}
        >
          <MessageSquare className="h-5 w-5" />
          <span>Forums</span>
        </Link>

        <Link
          to="/events"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            isActive('/events')
              ? 'bg-[#E27B58] text-white'
              : 'hover:bg-[#2a2a2a] hover:text-white'
          }`}
        >
          <Calendar className="h-5 w-5" />
          <span>Events</span>
        </Link>

        <Link
          to="/bazaar"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            isActive('/bazaar')
              ? 'bg-[#E27B58] text-white'
              : 'hover:bg-[#2a2a2a] hover:text-white'
          }`}
        >
          <ShoppingBag className="h-5 w-5" />
          <span>Bazaar</span>
        </Link>

        <Link
          to="/services"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            isActive('/services')
              ? 'bg-[#E27B58] text-white'
              : 'hover:bg-[#2a2a2a] hover:text-white'
          }`}
        >
          <Building2 className="h-5 w-5" />
          <span>Services</span>
        </Link>

        <Link
          to="/resources"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            isActive('/resources')
              ? 'bg-[#E27B58] text-white'
              : 'hover:bg-[#2a2a2a] hover:text-white'
          }`}
        >
          <FileText className="h-5 w-5" />
          <span>Resources</span>
        </Link>

        <Link
          to="/settings"
          className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
            isActive('/settings')
              ? 'bg-[#E27B58] text-white'
              : 'hover:bg-[#2a2a2a] hover:text-white'
          }`}
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </nav>

      {/* External Resources */}
      <div className="mt-6 px-4">
        <h3 className="text-xs font-medium text-gray-400 px-2 mb-2">EXTERNAL RESOURCES</h3>
        <nav className="space-y-1">
          <a
            href="https://auroville.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-[#2a2a2a] hover:text-white transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <div>
              <div>Auroville Foundation</div>
              <div className="text-xs text-gray-500">Official Foundation Website</div>
            </div>
          </a>

          <a
            href="https://directory.auroville.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-[#2a2a2a] hover:text-white transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <div>
              <div>Directory</div>
              <div className="text-xs text-gray-500">Community Directory</div>
            </div>
          </a>

          <a
            href="https://news.auroville.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-[#2a2a2a] hover:text-white transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <div>
              <div>Media Portal</div>
              <div className="text-xs text-gray-500">News and Media</div>
            </div>
          </a>

          <a
            href="https://wiki.auroville.org"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-[#2a2a2a] hover:text-white transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            <div>
              <div>Wiki</div>
              <div className="text-xs text-gray-500">Community Knowledge Base</div>
            </div>
          </a>
        </nav>
      </div>

      {/* User Profile */}
      {user && (
        <div className="mt-6 p-4">
          <Link to="/profile" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#2a2a2a] transition-colors">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=E27B58&color=fff`}
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <div className="text-sm font-medium text-white">{user.name}</div>
              <div className="text-xs text-gray-400">Community Member</div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}