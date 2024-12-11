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
      <aside className="w-64 shrink-0 border-r border-[#2a2a2a]">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 bg-[#1e1e1e] pl-4 pr-6 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}