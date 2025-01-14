import { useEffect } from 'react';

const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      // Unregister any existing service workers first
      navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(registration => {
          registration.unregister();
        });
      });

      const baseUrl = window.location.origin || process.env.PUBLIC_URL || '';
      if (!baseUrl) {
        console.error('ServiceWorker: Unable to determine base URL');
        return;
      }

      const swUrl = `${baseUrl}/service-worker.js`;
      
      navigator.serviceWorker
        .register(swUrl, { scope: '/' })
        .then((registration) => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch((error) => {
          console.error('ServiceWorker registration failed:', error);
        });
    });
  }
};

const useServiceWorker = () => {
  useEffect(() => {
    registerServiceWorker();
  }, []);
};

const ServiceWorkerInitializer = () => {
  useServiceWorker();
  return null;
};

export default ServiceWorkerInitializer;
