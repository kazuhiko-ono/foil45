// Service Worker for Yuki Sunaga Windsurfing Site
// Progressive Web App capabilities and caching

const CACHE_NAME = 'yuki-sunaga-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/css/responsive.css',
  '/js/main.js',
  '/js/animations.js',
  '/images/hero-bg.jpg',
  '/images/profile-portrait.jpg',
  '/favicon.ico',
  '/apple-touch-icon.png'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});