import { useEffect } from 'react';

const registerServiceWorker = () => {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log('ServiceWorker registration successful:', registration);
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

export default useServiceWorker;