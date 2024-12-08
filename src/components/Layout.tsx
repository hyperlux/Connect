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
      <div className="fixed left-0 top-0 h-full w-52 z-30">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-auto bg-[#1e1e1e]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}