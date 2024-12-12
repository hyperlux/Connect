import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import EmailSentPage from './pages/EmailSentPage';
import EmailVerifiedPage from './pages/EmailVerifiedPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Welcome from './pages/Welcome';
import Forums from './pages/Forums';
import Dashboard from './pages/Dashboard';
import Community from './pages/Community';
import Services from './pages/Services';
import Events from './pages/Events';
import Bazaar from './pages/Bazaar';
import Resources from './pages/Resources';
import Settings from './pages/Settings';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Welcome />
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/forums',
        element: <Forums />
      },
      {
        path: '/events',
        element: <Events />
      },
      {
        path: '/bazaar',
        element: <Bazaar />
      },
      {
        path: '/services',
        element: <Services />
      },
      {
        path: '/resources',
        element: <Resources />
      },
      {
        path: '/settings',
        element: <Settings />
      },
      {
        path: '/community',
        element: <Community />
      },
      {
        path: '/profile',
        element: <Profile />
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
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      }
    ]
  }
], {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true
  }
});

export default router;
