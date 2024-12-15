import React from 'react';
import { createBrowserRouter, Navigate, useLocation, redirect } from 'react-router-dom';
import { useAuth } from './lib/auth';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import EventDetails from './pages/Events/EventDetails';
import Forums from './pages/Forums';
import ForumPost from './pages/Forums/ForumPost';
import Services from './pages/Services';
import Community from './pages/Community';
import Profile from './pages/Profile';
import Resources from './pages/Resources';
import LocalMap from './pages/LocalMap';
import Decisions from './pages/Decisions';
import Discover from './pages/Discover';
import Bazaar from './pages/Bazaar';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import SettingsLayout from './pages/Settings/Layout';
import ProfileSettings from './pages/Settings/Profile';
import NotificationSettings from './pages/Settings/NotificationSettings';
import PrivacySettings from './pages/Settings/PrivacySettings';
import SecuritySettings from './pages/Settings/SecuritySettings';
import ResetPassword from './pages/ResetPassword';
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import EmailSentPage from './pages/EmailSentPage';
import EmailVerifiedPage from './pages/EmailVerifiedPage';
import Users from './pages/Users';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  
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
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

// Error Boundary Component
function ErrorBoundary() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated && location.pathname !== '/login') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Oops! Something went wrong</h2>
        <p className="text-gray-600 mb-4">We're sorry, but there was an error loading this page.</p>
        <button 
          onClick={() => window.location.href = isAuthenticated ? '/app/dashboard' : '/'}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Return Home
        </button>
      </div>
    </div>
  );
}

// Auth checker for protected routes
async function authLoader() {
  const token = localStorage.getItem('token');
  if (!token) {
    return redirect('/login');
  }
  return null;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Welcome />,
    errorElement: <ErrorBoundary />
  },
  // Redirect root profile to app profile
  {
    path: '/profile',
    loader: authLoader,
    element: <Navigate to="/app/profile" replace />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/signup',
    element: <Navigate to="/register" replace />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/dashboard',
    loader: authLoader,
    element: <Navigate to="/app/dashboard" replace />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/app',
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    loader: authLoader,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        errorElement: <ErrorBoundary />
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
        errorElement: <ErrorBoundary />
      },
      {
        path: 'events',
        element: <Events />,
        errorElement: <ErrorBoundary />
      },
      {
        path: 'events/:eventId',
        element: <EventDetails />,
        errorElement: <ErrorBoundary />
      },
      {
        path: 'forums',
        element: <Forums />,
        errorElement: <ErrorBoundary />
      },
      {
        path: 'forums/:postId',
        element: <ForumPost />,
        errorElement: <ErrorBoundary />
      },
      {
        path: 'bazaar',
        element: <Bazaar />,
        errorElement: <ErrorBoundary />
      },
      {
        path: 'services',
        element: <Services />,
        errorElement: <ErrorBoundary />
      },
      {
        path: 'resources',
        element: <Resources />,
        errorElement: <ErrorBoundary />
      },
      {
        path: 'settings',
        element: <SettingsLayout />,
        errorElement: <ErrorBoundary />,
        children: [
          {
            path: 'profile',
            element: <ProfileSettings />,
            errorElement: <ErrorBoundary />
          },
          {
            path: 'notifications',
            element: <NotificationSettings />,
            errorElement: <ErrorBoundary />
          },
          {
            path: 'privacy',
            element: <PrivacySettings />,
            errorElement: <ErrorBoundary />
          },
          {
            path: 'security',
            element: <SecuritySettings />,
            errorElement: <ErrorBoundary />
          }
        ]
      },
      {
        path: 'community',
        element: <Community />,
        errorElement: <ErrorBoundary />
      },
      {
        path: 'users',
        element: <Users />,
        errorElement: <ErrorBoundary />
      },
      {
        path: 'profile',
        element: <Profile />,
        errorElement: <ErrorBoundary />
      },
      {
        path: 'map',
        element: <LocalMap />,
        errorElement: <ErrorBoundary />
      },
      {
        path: 'decisions',
        element: <Decisions />,
        errorElement: <ErrorBoundary />
      },
      {
        path: 'discover',
        element: <Discover />,
        errorElement: <ErrorBoundary />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/verify-email',
    element: <VerifyEmail />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/email-sent',
    element: <EmailSentPage />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/email-verified',
    element: <EmailVerifiedPage />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/reset-password',
    element: <ResetPassword />,
    errorElement: <ErrorBoundary />
  },
  // Catch all route for unmatched paths
  {
    path: '*',
    element: <Navigate to="/" replace />,
    errorElement: <ErrorBoundary />
  }
], {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true
  }
});

export default router;
