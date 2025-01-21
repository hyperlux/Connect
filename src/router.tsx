import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useAuth } from './lib/auth';

// Pages
import Dashboard from './components/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import EmailSentPage from './pages/EmailSentPage';
import EmailVerification from './pages/EmailVerification';
import EmailVerifiedPage from './pages/EmailVerifiedPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import Community from './pages/Community';
import Forums from './pages/Forums';
import Services from './pages/Services';
import AuthCallback from './pages/AuthCallback';

// Components
import PrivateRoute from './components/PrivateRoute';

const PrivateRouteWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/auth/callback",
    element: <AuthCallback />,
  },
  {
    path: "/email-sent",
    element: <EmailSentPage />,
  },
  {
    path: "/email-verification",
    element: <EmailVerification />,
  },
  {
    path: "/verify-email",
    element: <EmailVerification />,
  },
  {
    path: "/email-verified",
    element: <EmailVerifiedPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/",
    element: <PrivateRouteWrapper><Dashboard /></PrivateRouteWrapper>,
  },
  {
    path: "/app/dashboard",
    element: <PrivateRouteWrapper><Dashboard /></PrivateRouteWrapper>,
  },
  {
    path: "/profile",
    element: <PrivateRouteWrapper><Profile /></PrivateRouteWrapper>,
  },
  {
    path: "/community",
    element: <PrivateRouteWrapper><Community /></PrivateRouteWrapper>,
  },
  {
    path: "/forums",
    element: <PrivateRouteWrapper><Forums /></PrivateRouteWrapper>,
  },
  {
    path: "/services",
    element: <PrivateRouteWrapper><Services /></PrivateRouteWrapper>,
  },
]);

export default router;
