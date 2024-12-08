import { Link, useLocation } from 'react-router-dom';
import { 
  Building2, 
  Calendar, 
  MessageSquare, 
  FileText, 
  LayoutDashboard,
  Vote,
  ShoppingBag,
  Settings,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '../lib/auth';
import { useTheme } from '../lib/theme';

interface MenuItem {
  icon: React.ComponentType<any>;
  label: string;
  href: string;
}

interface ExternalLink {
  label: string;
  href: string;
  description: string;
}

const menuItems: MenuItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Vote, label: 'Decision Hub', href: '/decisions' },
  { icon: MessageSquare, label: 'Forums', href: '/forums' },
  { icon: Calendar, label: 'Events', href: '/events' },
  { icon: ShoppingBag, label: 'Bazaar', href: '/bazaar' },
  { icon: Building2, label: 'Services', href: '/services' },
  { icon: FileText, label: 'Resources', href: '/resources' },
  { icon: Settings, label: 'Settings', href: '/settings' }
];

const externalLinks: ExternalLink[] = [
  { 
    label: 'Auroville Foundation', 
    href: 'http://www.aurovillefoundation.org.in/',
    description: 'Official Foundation Website'
  },
  { 
    label: 'Directory', 
    href: 'https://directory.auroville.services/',
    description: 'Community Directory'
  },
  { 
    label: 'Media Portal', 
    href: 'https://auroville.media/',
    description: 'News and Media'
  },
  { 
    label: 'Wiki', 
    href: 'https://wiki.auroville.org.in/wiki/Welcome',
    description: 'Community Knowledge Base'
  }
];

export default function Sidebar() {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const { theme } = useTheme();

  return (
    <div className="h-screen w-80 flex flex-col fixed bg-white dark:bg-[#1a1a1a] border-r border-gray-200 dark:border-[#2a2a2a]">
      <div className="p-6 border-b border-gray-200 dark:border-[#2a2a2a]">
        <Link to="/" className="flex items-center">
          <img 
            src={theme === 'dark' ? "/logodark.png" : "/logolight.png"}
            alt="Auroville Community" 
            className="h-8 w-auto"
          />
        </Link>
      </div>
      
      <nav className="flex-1 overflow-y-auto">
        <div className="px-4 py-4">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href || 
                (item.href !== '/' && location.pathname.startsWith(item.href));
              const Icon = item.icon;

              return (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#FDF1EC] dark:bg-[#E27B58]/20 text-[#E27B58]'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2a2a2a]'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${
                      isActive 
                        ? 'text-[#E27B58]' 
                        : 'text-gray-600 dark:text-gray-400'
                    }`} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
}