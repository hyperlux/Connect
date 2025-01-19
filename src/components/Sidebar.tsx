import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/auth.tsx';
import { useTheme } from '../lib/theme';
import { useSidebar } from '../lib/sidebar';
import { 
  LayoutGrid, 
  MessageSquare, 
  Calendar, 
  ShoppingBag, 
  Building2, 
  FileText,
  Settings,
  ExternalLink,
  Users
} from 'lucide-react';

type IconComponent = React.ComponentType<{
  className?: string;
  strokeWidth?: number;
  color?: string;
}>;

interface NavItem {
  path: string;
  icon: IconComponent;
  label: string;
}

interface ExternalResourceItem {
  href: string;
  title: string;
  description: string;
}

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, isLoading } = useAuth();
  const { theme } = useTheme();
  const { isOpen, toggle } = useSidebar();

  const handleLogoClick = React.useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    navigate(isAuthenticated ? '/app/dashboard' : '/');
  }, [isAuthenticated, navigate]);

  const isActive = React.useCallback((path: string) => {
    return location.pathname === `/app${path}`;
  }, [location.pathname]);

  if (isLoading) {
    return null;
  }

  const navItems: NavItem[] = React.useMemo(() => [
    { path: '/dashboard', icon: LayoutGrid as unknown as IconComponent, label: 'Dashboard' },
    { path: '/forums', icon: MessageSquare as unknown as IconComponent, label: 'Forums' },
    { path: '/events', icon: Calendar as unknown as IconComponent, label: 'Events' },
    { path: '/bazaar', icon: ShoppingBag as unknown as IconComponent, label: 'Bazaar' },
    { path: '/services', icon: Building2 as unknown as IconComponent, label: 'Services' },
    { path: '/resources', icon: FileText as unknown as IconComponent, label: 'Resources' },
    { path: '/users', icon: Users as unknown as IconComponent, label: 'Residents' },
    { path: '/settings', icon: Settings as unknown as IconComponent, label: 'Settings' }
  ], []);

  const externalResources: ExternalResourceItem[] = React.useMemo(() => [
    { href: 'https://auroville.org', title: 'Auroville Foundation', description: 'Official Foundation Website' },
    { href: 'https://directory.auroville.org', title: 'Directory', description: 'Community Directory' },
    { href: 'https://news.auroville.org', title: 'Media Portal', description: 'News and Media' },
    { href: 'https://wiki.auroville.org', title: 'Wiki', description: 'Community Knowledge Base' }
  ], []);

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggle}
        />
      )}
      
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-transform duration-200 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-4">
          <a href="#" onClick={handleLogoClick} className="block">
            <img 
              src={theme === 'dark' ? "/logodark.png" : "/logolight.png"}
              alt="Auroville" 
              className="h-12 w-auto object-contain mx-auto"
            />
          </a>
        </div>

        <nav className="px-3 py-2">
          {navItems.map(({ path, icon: Icon, label }) => (
            <Link
              key={path}
              to={`/app${path}`}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive(path)
                  ? 'bg-auroville-primary text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-4 px-3">
          <h3 className="text-xs font-medium text-gray-500 dark:text-gray-400 px-3 mb-2">EXTERNAL RESOURCES</h3>
          <nav className="space-y-1">
            {externalResources.map(({ href, title, description }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                <div>
                  <div>{title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{description}</div>
                </div>
              </a>
            ))}
          </nav>
        </div>

        {user && (
          <div className="mt-4 px-3">
            <Link 
              to="/app/profile" 
              className="flex items-center px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div>
                <div className="text-sm font-medium">{user.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Community Member</div>
              </div>
            </Link>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
