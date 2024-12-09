import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
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

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  
  console.log('ProtectedRoute state:', { isAuthenticated, isLoading, pathname: location.pathname });

  if (isLoading) {
    console.log('Auth is loading');
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
    console.log('Not authenticated, redirecting to login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log('Authenticated, rendering children');
  return <>{children}</>;
}

function LoginPage() {
  const { user } = useAuth();
  
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-[#1E1E1E] flex">
      {/* Welcome Banner Section */}
      <div className="hidden lg:block w-1/2 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/firematri.png"
            alt="Auroville"
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-16">
              <h1 className="text-5xl font-bold text-white mb-6">Welcome to Auroville</h1>
              <div className="space-y-4">
                <p className="text-2xl text-white/90 italic leading-relaxed">
                  "Auroville wants to be the bridge between the past and the future."
                </p>
                <p className="text-lg text-white/80">— The Mother</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <img
              className="mx-auto h-16 w-auto mb-8"
              src="/logodark.png"
              alt="Auroville"
            />
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Sign in to your account
            </h2>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected routes */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="events/*" element={<Events />} />
        <Route path="events/:eventId" element={<EventDetails />} />
        <Route path="forums" element={<Forums />} />
        <Route path="services" element={<Services />} />
        <Route path="community" element={<Community />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<SettingsLayout />}>
          <Route path="profile" element={<ProfileSettings />} />
          <Route path="notifications" element={<NotificationSettings />} />
          <Route path="privacy" element={<PrivacySettings />} />
          <Route path="security" element={<SecuritySettings />} />
        </Route>
        <Route path="resources" element={<Resources />} />
        <Route path="map" element={<LocalMap />} />
        <Route path="decisions" element={<Decisions />} />
        <Route path="discover" element={<Discover />} />
        <Route path="bazaar" element={<Bazaar />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
} 