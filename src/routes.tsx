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

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/email-sent" element={<EmailSentPage />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Protected routes */}
      <Route 
        path="/dashboard" 
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