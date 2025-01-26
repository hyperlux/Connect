import React, { Suspense, lazy } from 'react';
import { 
  createBrowserRouter,
  Navigate, 
  Outlet,
  useLocation 
} from 'react-router-dom';
import { useAuth } from './lib/auth';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load components
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard/index'));
const EmailVerification = lazy(() => import('./pages/EmailVerification'));
const EmailSentPage = lazy(() => import('./pages/EmailSentPage'));

// Authentication Wrapper Component
const PrivateRoute: React.FC = () => {
  const { isAuthenticated, isLoading, getCurrentUser } = useAuth();
  const location = useLocation();

  // Enhanced logging for authentication checks
  console.log('AuthenticatedLayout rendering');
  
  // Check for loading state
  if (isLoading) {
    console.log('Authentication still loading');
    return <LoadingSpinner />;
  }

  // Perform detailed authentication check
  const authenticated = isAuthenticated();
  const user = getCurrentUser();

  console.log('AuthenticatedLayout Auth Check:', {
    authenticated,
    user: user ? { 
      id: user.id, 
      email: user.email, 
      role: user.role 
    } : null
  });

  // Conditional rendering based on authentication status
  if (authenticated && user) {
    return <Outlet />;
  } else {
    console.log('Not authenticated in AuthenticatedLayout, redirecting to login');
    return (
      <Navigate 
        to="/login" 
        state={{ 
          from: location, 
          reason: 'Not authenticated' 
        }} 
        replace 
      />
    );
  }
};

// Public Route Wrapper to prevent authenticated users from accessing login/register pages
const PublicRoute: React.FC = () => {
  const { isAuthenticated, isLoading, getCurrentUser } = useAuth();
  const location = useLocation();

  // Check for loading state
  if (isLoading) {
    console.log('Authentication still loading');
    return <LoadingSpinner />;
  }

  // Perform detailed authentication check
  const authenticated = isAuthenticated();
  const user = getCurrentUser();

  console.log('PublicRoute Auth Check:', {
    authenticated,
    user: user ? { 
      id: user.id, 
      email: user.email, 
      role: user.role 
    } : null
  });

  // Conditional rendering based on authentication status
  if (!authenticated || !user) {
    return <Outlet />;
  } else {
    console.log('Already authenticated, redirecting to dashboard');
    return (
      <Navigate 
        to={location.state?.from?.pathname || "/dashboard"} 
        replace 
      />
    );
  }
};

export const createAppRouter = () => {
  return createBrowserRouter([
    {
      element: <PublicRoute />,
      children: [
        { path: "/login", element: <Login /> },
        { path: "/verify-email", element: <EmailVerification /> },
        { path: "/email-sent", element: <EmailSentPage /> },
      ]
    },
    {
      element: <PrivateRoute />,
      children: [
        { path: "/dashboard", element: <Dashboard /> },
        // Add other protected routes here
      ]
    },
    { 
      path: "/", 
      element: <Navigate to="/dashboard" replace /> 
    },
    { 
      path: "*", 
      element: <Navigate to="/login" replace /> 
    }
  ]);
};

export default createAppRouter;
