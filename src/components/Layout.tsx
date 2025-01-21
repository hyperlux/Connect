import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTheme } from '../lib/theme';
import { useAuth } from '../lib/auth';
import { useEffect } from 'react';

export default function Layout() {
  const { theme } = useTheme();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Apply theme to root element
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading...</h2>
          <p className="text-gray-600">Please wait while we verify your session.</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // or redirect to login
  }

  return (
    <div className="layout-container">
      <aside className="layout-sidebar">
        <Sidebar />
      </aside>
      
      <main className="layout-main">
        <Header />
        <div className="p-6">
          <div className="max-w-screen-2xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
