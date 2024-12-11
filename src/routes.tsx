import React from 'react';
import { createBrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './lib/auth';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import EventDetails from './pages/Events/EventDetails';
import Forums from './pages/Forums';
import Services from './pages/Services';
import Community from './pages/Community';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Resources from './pages/Resources';
import LocalMap from './pages/LocalMap';
import Decisions from './pages/Decisions';
import Discover from './pages/Discover';
import Bazaar from './pages/Bazaar';
import LoginForm from './components/LoginForm';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import SettingsLayout from './pages/Settings/Layout';
import ProfileSettings from './pages/Settings/Profile';
import NotificationSettings from './pages/Settings/NotificationSettings';
import PrivacySettings from './pages/Settings/PrivacySettings';
import SecuritySettings from './pages/Settings/SecuritySettings';
import SignupForm from './components/SignupForm';
import ResetPassword from './pages/ResetPassword';
import Login from './pages/Login';
import Welcome from './pages/Welcome';
import EmailSentPage from './pages/EmailSentPage';

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
  // Public routes
  {
    path: "/",
    element: <Welcome />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <SignupForm />
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />
  },
  {
    path: "/email-sent",
    element: <EmailSentPage />
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />
  },
  {
    path: "/reset-password",
    element: <ResetPassword />
  },

  // Protected routes
  {
    path: "/",
    element: <ProtectedRoute><Layout /></ProtectedRoute>,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />
      },
      {
        path: "events",
        element: <Events />
      },
      {
        path: "events/:eventId",
        element: <EventDetails />
      },
      {
        path: "forums",
        element: <Forums />
      },
      {
        path: "services",
        element: <Services />
      },
      {
        path: "community",
        element: <Community />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "settings",
        element: <SettingsLayout />,
        children: [
          {
            path: "profile",
            element: <ProfileSettings />
          },
          {
            path: "notifications",
            element: <NotificationSettings />
          },
          {
            path: "privacy",
            element: <PrivacySettings />
          },
          {
            path: "security",
            element: <SecuritySettings />
          }
        ]
      },
      {
        path: "resources",
        element: <Resources />
      },
      {
        path: "map",
        element: <LocalMap />
      },
      {
        path: "decisions",
        element: <Decisions />
      },
      {
        path: "discover",
        element: <Discover />
      },
      {
        path: "bazaar",
        element: <Bazaar />
      }
    ]
  }
], {
  basename: import.meta.env.BASE_URL
});

export default router;
