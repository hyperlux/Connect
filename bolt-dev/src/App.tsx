import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import router from './router';
import ThemeProvider from './lib/theme';
import { AuthProvider } from './lib/auth';
import { SidebarProvider } from './lib/sidebar';
import { useEffect } from 'react';

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
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

        navigator.serviceWorker
          .register(swUrl)
          .then((registration) => {
            console.log('ServiceWorker registration successful with scope:', registration.scope);
          })
          .catch((error) => {
            console.error('ServiceWorker registration failed:', error);
          });
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <SidebarProvider>
            <RouterProvider
              router={router}
              future={{
                v7_startTransition: true,
              }}
            />
          </SidebarProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
