import { createBrowserRouter } from 'react-router-dom';
import EmailSentPage from './pages/EmailSentPage';
import EmailVerifiedPage from './pages/EmailVerifiedPage';

const router = createBrowserRouter([
  // your existing routes
  {
    path: '/email-sent',
    element: <EmailSentPage />
  },
  {
    path: '/email-verified',
    element: <EmailVerifiedPage />
  }
], {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true
  }
});

export default router;
