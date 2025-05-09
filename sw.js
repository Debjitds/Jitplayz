// Naya cache version - update ke saath
const CACHE_NAME = 'calendar-app-cache-v4';

// Updated resources, agar koi naya asset add hua ho, to URL update kar sakte hain
const urlsToCache = [
  '/',            // Home page (App shell)
  '/index.html',  // Main HTML file
  '/styles.css',  // CSS fileconst CACHE_NAME = 'calendar-app-cache-v1';
const BASE_PATH = './'; // Adjust this based on your deployment path

const ASSETS_TO_CACHE = [
  BASE_PATH,
  'index.html',
  '2023.html',
  '2024.html',
  '2025.html',
  '2026.html',
  'darkmode.js',
  'script.js',
  'holidays-data.js',
  'orientation.js',
  'screen-short.js',
  // Images
  '/d.png',
  '/d24.png',
  '/day.png',
  '/desk.png',
  '/e.png',
  '/f.png',
  '/n23.png',
  '/n24.png',
  '/night.png',
  '/nightnav.png',
  '/web.png'
];

// Installation Event
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing new service worker...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching app assets');
        // Cache resources individually with error handling
        return Promise.all(
          ASSETS_TO_CACHE.map(url => {
            return cache.add(new Request(url))
              .catch(error => {
                console.error(`[Service Worker] Failed to cache: ${url}`, error);
                return Promise.resolve(); // Continue with other resources
              });
          })
        );
      })
      .then(() => {
        console.log('[Service Worker] All resources cached successfully');
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[Service Worker] Cache initialization failed:', error);
      })
  );
});

// Activation Event
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating new service worker...');

  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME) {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all clients
      self.clients.claim()
    ])
  );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if found
        if (response) {
          return response;
        }

        // Clone the request because it can only be used once
        const fetchRequest = event.request.clone();

        // Make network request and cache the response
        return fetch(fetchRequest)
          .then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response because it can only be used once
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              })
              .catch(error => {
                console.error('[Service Worker] Failed to cache fetch response:', error);
              });

            return response;
          })
          .catch(error => {
            console.error('[Service Worker] Fetch failed:', error);
            // You could return a custom offline page here
          });
      })
  );
});

// Handle Service Worker Updates
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});
  '/script.js',      // JavaScript file
  '/logo.png'     // Logo ya koi image
];

// Install event mein resource caching aur immediate activation ke liye skipWaiting() ka use
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install - New Version');
  
  // Naya SW turant activate ho jaaye
  self.skipWaiting();
  
  event.waitUntil(
    caches.open('calendar-app-cache-v4').then((cache) => {
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
