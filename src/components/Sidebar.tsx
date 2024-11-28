import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Building2, 
  Calendar, 
  Users, 
  MessageSquare, 
  FileText, 
  MapPin,
  LayoutDashboard,
  Vote,
  ShoppingBag,
  Settings,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../lib/auth';
import { useTheme } from '../lib/theme';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Vote, label: 'Decision Hub', href: '/decisions' },
  { icon: ShoppingBag, label: 'Bazaar', href: '/bazaar' },
  { icon: Calendar, label: 'Events', href: '/events' },
  { icon: MessageSquare, label: 'Forums', href: '/forums' },
  { icon: Building2, label: 'Services', href: '/services' },
  { icon: Users, label: 'Community', href: '/community' },
  { icon: FileText, label: 'Resources', href: '/resources' },
  { icon: MapPin, label: 'Local Map', href: '/map' },
  { icon: BookOpen, label: 'Studies', href: '/studies' },
  { icon: Settings, label: 'Settings', href: '/settings' }
];

const externalLinks = [
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
  const isDark = theme === 'dark';

  return (
    <div className={`h-screen w-64 flex flex-col ${
      isDark 
        ? 'bg-dark-card border-dark' 
        : 'bg-white border-gray-200'
    } border-r`}>
      <div className={`p-5 border-b ${isDark ? 'border-dark' : 'border-gray-200'}`}>
        <img 
          src={isDark ? "/logodark.png" : "/logolight.png"}
          alt="Auroville Community" 
          className="h-12 object-contain"
        />
      </div>
      
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href !== '/' && location.pathname.startsWith(item.href));

            return (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#FDF1EC] text-[#E27B58]'
                      : isDark
                        ? 'text-dark-primary hover:bg-dark-lighter'
                        : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className={`w-5 h-5 ${
                    isActive 
                      ? 'text-[#E27B58]' 
                      : isDark 
                        ? 'text-dark-primary' 
                        : 'text-gray-600'
                  }`} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className={`pt-4 border-t mt-4 ${isDark ? 'border-dark' : 'border-gray-200'}`}>
          <h3 className={`px-4 text-xs font-semibold uppercase tracking-wider mb-2 ${
            isDark ? 'text-dark-secondary' : 'text-gray-500'
          }`}>
            External Resources
          </h3>
          {externalLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                isDark
                  ? 'text-dark-primary hover:bg-dark-lighter'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <ExternalLink className={`w-5 h-5 ${
                isDark ? 'text-dark-primary' : 'text-gray-600'
              }`} />
              <div>
                <span className="block text-sm">{link.label}</span>
                <span className={`text-xs ${
                  isDark ? 'text-dark-secondary' : 'text-gray-500'
                }`}>
                  {link.description}
                </span>
              </div>
            </a>
          ))}
        </div>
      </nav>

      {isAuthenticated && user && (
        <div className={`p-4 border-t ${isDark ? 'border-dark' : 'border-gray-200'}`}>
          <Link
            to="/profile"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
              isDark
                ? 'hover:bg-dark-lighter'
                : 'hover:bg-gray-100'
            }`}
          >
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=E27B58&color=fff`}
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1">
              <p className={`text-sm font-medium ${
                isDark ? 'text-dark-primary' : 'text-gray-700'
              }`}>
                {user.name}
              </p>
              <p className={`text-xs ${
                isDark ? 'text-dark-secondary' : 'text-gray-500'
              }`}>
                Community Member
              </p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}