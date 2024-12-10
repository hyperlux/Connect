// Minimal service worker for testing
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Handle API requests differently
  if (event.request.url.includes('api.auroville.social')) {
    return;
  }

  // For all other requests, try the network first, then the cache
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        return caches.match(event.request);
      })
  );
}); 