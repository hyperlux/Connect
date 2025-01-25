import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useTheme } from '../lib/theme';
import { useAuth } from '../lib/auth';
import { useSidebar } from '../lib/sidebar';

export default function Layout() {
  const { theme } = useTheme();
  const { isAuthenticated, isLoading, user, error } = useAuth();
  const { isOpen } = useSidebar();
  const [authCheckComplete, setAuthCheckComplete] = useState(false);

  useEffect(() => {
    // Apply theme to root element
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);

    // Log authentication state with more details
    console.log('Layout Authentication State:', {
      isAuthenticated: isAuthenticated(),
      isLoading,
      user,
      error,
      authCheckComplete
    });

    // Set auth check complete after a short delay to ensure all checks are done
    const timeoutId = setTimeout(() => {
      setAuthCheckComplete(true);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [theme, isAuthenticated, isLoading, user, error, authCheckComplete]);

  // Detailed logging for authentication state
  console.log('Layout Render Details:', {
    isAuthenticated: isAuthenticated(),
    isLoading,
    authCheckComplete,
    user: user ? { id: user.id, email: user.email } : null
  });

  // Handle different authentication states
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading...</h2>
          <p className="text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // If auth check is complete and not authenticated, redirect to login
  if (authCheckComplete && !isAuthenticated()) {
    console.warn('Not authenticated in Layout, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // Render layout for authenticated users
  return (
    <div className="layout-container">
      <aside className={`layout-sidebar ${isOpen ? 'open' : ''}`}>
        <Sidebar />
      </aside>
      
      <main className="layout-main">
        <header className="layout-header">
          <Header />
        </header>
        <div className="layout-content">
          <div className="max-w-screen-2xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
