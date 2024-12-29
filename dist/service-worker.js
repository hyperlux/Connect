self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('vite').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/service-worker.js',
        // Add more files as needed
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  const apiURL = 'http://localhost:5000/api';
  if (event.request.url.startsWith(apiURL)) {
    event.respondWith(fetch(event.request));
    return;
  }
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.registration.unregister());
});