import { createBrowserRouter, Navigate, useLocation } from 'react-router-dom';
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

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    children: [
      {
        index: true,
        element: <Welcome />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'events',
        element: <Events />
      },
      {
        path: 'events/:eventId',
        element: <EventDetails />
      },
      {
        path: 'forums',
        element: <Forums />
      },
      {
        path: 'forums/:postId',
        element: <ForumPost />
      },
      {
        path: 'bazaar',
        element: <Bazaar />
      },
      {
        path: 'services',
        element: <Services />
      },
      {
        path: 'resources',
        element: <Resources />
      },
      {
        path: 'settings',
        element: <SettingsLayout />,
        children: [
          {
            path: 'profile',
            element: <ProfileSettings />
          },
          {
            path: 'notifications',
            element: <NotificationSettings />
          },
          {
            path: 'privacy',
            element: <PrivacySettings />
          },
          {
            path: 'security',
            element: <SecuritySettings />
          }
        ]
      },
      {
        path: 'community',
        element: <Community />
      },
      {
        path: 'users',
        element: <Users />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'map',
        element: <LocalMap />
      },
      {
        path: 'decisions',
        element: <Decisions />
      },
      {
        path: 'discover',
        element: <Discover />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/verify-email',
    element: <VerifyEmail />
  },
  {
    path: '/email-sent',
    element: <EmailSentPage />
  },
  {
    path: '/email-verified',
    element: <EmailVerifiedPage />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/reset-password',
    element: <ResetPassword />
  }
], {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true
  }
});

export default router;
