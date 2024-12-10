import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  // your routes here
], {
  future: {
    v7_relativeSplatPath: true,
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_skipActionErrorRevalidation: true
  }
});
