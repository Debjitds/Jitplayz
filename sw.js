// Naya cache version - update ke saath
const CACHE_NAME = 'calendar-app-cache-v4';

// Updated resources, agar koi naya asset add hua ho, to URL update kar sakte hain
const urlsToCache = [
  '/',            // Home page (App shell)
  '/index.html',  // Main HTML file
  '/styles.css',  // CSS file
  '/script.js',      // JavaScript file
  '/logo.png'     // Logo ya koi image
];

// Install event mein resource caching aur immediate activation ke liye skipWaiting() ka use
// Install event mein resource caching aur immediate activation ke liye skipWaiting() ka use
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("calendar-app-cache-v4") // Replace 'v1' with your cache name
      .then((cache) => {
        return cache.addAll([
          // List of URLs to cache
          '/',
          '/index.html',
          '/styles.css',
          '/script.js',
          '/logo.png'
          // Add all other assets you want to cache
        ]);
      })
      .catch((error) => {
        // Log the error to the console for debugging
        console.error('Cache addAll failed:', error);
        // You might want to perform other error handling here,
        // like skipping caching certain assets or retrying.
        // Depending on your needs, you might even want to
        // reject the installation by throwing the error or
        // preventing the event from completing.
      })
  );
});

// Add other service worker event listeners (activate, fetch, etc.) below this

// Activate event mein purane cache ko clean karo aur new SW ko sabhi clients pe turant claim karo
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activate - New Version');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          // Wrap the cache name in quotes to treat it as a string
          if (name !== 'calendar-app-cache-v3') {
            console.log('[Service Worker] Deleting old cache:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => {
      // Sabhi open pages pe new SW ka control turant
      return self.clients.claim();
    })
  );
});

// Fetch event for serving requests from cache, with network fallback
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
