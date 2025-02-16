const CACHE_NAME = 'truenat-cache-v1'; // Update version when you change the service worker
const urlsToCache = [
  '/', // Cache the main page
  '/index.html', // Or your main HTML file
  '/mydata.html',  // Cache other HTML pages
  '/CallLog.html',
  '/Resolute.html',
  '/styles.css', // Cache your CSS
  '/your_image.jpg', // Cache your image
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
  // Add other assets (JS files, etc.)
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Return from cache
        }
        return fetch(event.request); // Fetch from network
      })
  );
});


self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});