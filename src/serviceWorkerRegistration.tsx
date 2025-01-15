import { useEffect, useCallback } from 'react';
import type { RegisterSWOptions } from 'vite-plugin-pwa/types';

const ServiceWorkerInitializer = () => {
  const registerSW = useCallback(async () => {
    if (!('serviceWorker' in navigator)) {
      console.info('Service workers are not supported');
      return;
    }

    try {
      // Vite PWA plugin generates this virtual module
      const { registerSW } = await import('virtual:pwa-register');
      
      const updateSW = registerSW({
        onRegistered(registration: ServiceWorkerRegistration) {
          console.info('Service Worker registered:', registration);
        },
        onRegisterError(error: Error) {
          console.error('Service Worker registration failed:', error);
        },
        onNeedRefresh() {
          // You can implement a UI prompt here if you want to ask users to refresh
          console.info('New content available, please refresh.');
        },
        onOfflineReady() {
          console.info('App ready to work offline');
        }
      } as RegisterSWOptions);

      // Optional: You can expose the update function if you want to manually trigger updates
      window.__SW_UPDATE = () => updateSW?.();
      
    } catch (error) {
      console.error('Failed to register service worker:', error);
    }
  }, []);

  useEffect(() => {
    registerSW();
  }, [registerSW]);

  return null;
};

export default ServiceWorkerInitializer;
