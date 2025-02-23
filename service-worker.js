const CACHE_NAME = 'truenat-cg-cache-v1'; // Cache name (version number)
const urlsToCache = [
  '/', // Cache the main page
  '/index.html', // Or whatever your main HTML file is named
  '/style.css', // Path to your CSS file
  '/script.js', // Path to your JavaScript file
  '/your_image.jpg', // Path to your logo or other images
  '/manifest.json', // The manifest file itself
  '/icon.png', // Paths to your icons
  '/icons/icon-512x512.png',
  // ... Add paths to other assets (images, fonts, etc.)
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request); // Return from cache or fetch from network
      })
  );
});
