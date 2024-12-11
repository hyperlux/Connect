import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTheme } from '../lib/theme';
import { useEffect } from 'react';

export default function Layout() {
  const { theme } = useTheme();

  useEffect(() => {
    // Apply theme to root element
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <div className="min-h-screen flex bg-[#1a1a1a]">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 z-30">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <Header />
        <main className="flex-1 p-6 bg-[#1e1e1e] min-h-[calc(100vh-64px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}