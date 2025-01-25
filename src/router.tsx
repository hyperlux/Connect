import React, { Suspense, lazy } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
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
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate 
      to="/login" 
      state={{ from: location }} 
      replace 
    />
  );
};

// Public Route Wrapper to prevent authenticated users from accessing login/register pages
const PublicRoute: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return !isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate 
      to={location.state?.from?.pathname || "/dashboard"} 
      replace 
    />
  );
};

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="/email-sent" element={<EmailSentPage />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Add other protected routes here */}
          </Route>

          {/* Redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default AppRouter;
