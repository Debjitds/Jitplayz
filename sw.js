// Naya cache version - update ke saath
const CACHE_NAME = 'calendar-app-cache-v3';

// Updated resources, agar koi naya asset add hua ho, to URL update kar sakte hain
const urlsToCache = [
  '/',            // Home page (App shell)
  '/index.html',  // Main HTML file
  '/styles.css',  // CSS file
  '/script.js',      // JavaScript file
  '/logo.png'     // Logo ya koi image
];

// Install event mein resource caching aur immediate activation ke liye skipWaiting() ka use
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install - New Version');
  
  // Naya SW turant activate ho jaaye
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(calendar-app-cache-v3).then((cache) => {
      console.log('[Service Worker] Caching new resources');
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event mein purane cache ko clean karo aur new SW ko sabhi clients pe turant claim karo
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activate - New Version');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== calendar-app-cache-v3) {
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
