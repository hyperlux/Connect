import React, { useEffect } from 'react';
import { 
  Routes, 
  Route, 
  Navigate, 
  useLocation,
  BrowserRouter
} from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events/index';
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
import { useTheme } from './lib/theme';
import { useAuth } from './lib/auth';
import LoginForm from './components/LoginForm';
import VerifyEmail from './pages/VerifyEmail';
import SettingsLayout from './pages/Settings/Layout';
import ProfileSettings from './pages/Settings/Profile';
import NotificationSettings from './pages/Settings/NotificationSettings';
import PrivacySettings from './pages/Settings/PrivacySettings';
import SecuritySettings from './pages/Settings/SecuritySettings';
import SignupForm from './components/SignupForm';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Protected Route wrapper
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

// Create a LoginPage component
function LoginPage() {
  const { user } = useAuth();
  
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Welcome to Auroville</h1>
        <LoginForm />
      </div>
    </div>
  );
}

function App() {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

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
    </BrowserRouter>
  );
}

export default App;