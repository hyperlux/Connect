import { useEffect, useCallback } from 'react';
import type { RegisterSWOptions } from 'vite-plugin-pwa/types';

const ServiceWorkerInitializer = () => {
  const registerSW = useCallback(async () => {
    console.log('Starting Service Worker registration process');

    if (!('serviceWorker' in navigator)) {
      console.error('Service workers are NOT supported in this browser');
      return;
    }

    try {
      console.log('Attempting to import virtual:pwa-register module');
      const { registerSW } = await import('virtual:pwa-register');
      
      console.log('Registering Service Worker with detailed options');
      const updateSW = registerSW({
        onRegistered(registration: ServiceWorkerRegistration) {
          console.info('✅ Service Worker registered successfully:', {
            scope: registration.scope,
            active: !!registration.active,
            waiting: !!registration.waiting,
            installing: !!registration.installing
          });
          
          // Log detailed registration information
          if (registration.active) {
            console.log('Active Service Worker state:', registration.active.state);
          }
        },
        onRegisterError(error: Error) {
          console.error('❌ Service Worker registration FAILED:', {
            name: error.name,
            message: error.message,
            stack: error.stack
          });
        },
        onNeedRefresh() {
          console.warn('🔄 New content available, refresh recommended');
        },
        onOfflineReady() {
          console.info('🌐 App is ready to work offline');
        }
      } as RegisterSWOptions);

      // Expose update function globally for manual updates
      (window as any).__SW_UPDATE = () => {
        console.log('Manually triggering Service Worker update');
        updateSW?.();
      };
      
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('❌ CRITICAL: Failed to register service worker', {
          name: error.name,
          message: error.message,
          stack: error.stack
        });
      } else {
        console.error('❌ CRITICAL: Unknown error during service worker registration', error);
      }
    }
  }, []);

  useEffect(() => {
    console.log('ServiceWorkerInitializer mounted, calling registerSW');
    registerSW();
  }, [registerSW]);

  return null;
};

export default ServiceWorkerInitializer;
