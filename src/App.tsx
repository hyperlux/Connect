import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { createAppRouter } from './router';
import ThemeProvider from './lib/theme';
import { AuthProvider } from './lib/auth';
import { SidebarProvider } from './lib/sidebar';

// Create a client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <React.StrictMode>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <SidebarProvider>
              <RouterProvider router={createAppRouter()} />
            </SidebarProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
