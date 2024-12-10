import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ThemeProvider from './lib/theme';
import { AuthProvider } from './lib/auth';
import AppRoutes from './routes';
import { routerConfig } from './lib/router';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Your router configuration
const router = createBrowserRouter([
  {
    path: '*',
    element: <AppRoutes />
  }
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} future={routerConfig} />
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}