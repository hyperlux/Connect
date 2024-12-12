import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTheme } from '../lib/theme';
import { useEffect } from 'react';
import { useSidebar } from '../lib/sidebar';

export default function Layout() {
  const { theme } = useTheme();
  const { isOpen, toggle } = useSidebar();

  useEffect(() => {
    // Apply theme to root element
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-[#1a1a1a]">
      {/* Sidebar with overlay for mobile */}
      <div className="relative lg:static">
        <aside 
          className={`fixed lg:relative h-screen w-64 transition-all duration-300 ease-in-out transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          } bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-30`}
        >
          <Sidebar />
        </aside>
        
        {/* Mobile overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={toggle}
          />
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
