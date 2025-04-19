/*  Markiva Service Worker  */
/*  Place this file in:  /js/sw.js  */

const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME    = `markiva-cache-${CACHE_VERSION}`;

const CORE_ASSETS = [
  '/',                       // root
  '/index.html',
  '/404.html',
  '/contact.html',
  '/documentation.html',
  '/download.html',
  '/faq.html',
  '/markdown.html',
  '/roadmap.html',

  /* CSS */
  '/css/styles.css',

  /* JS */
  '/js/includePartials.js',
  '/js/scripts.js',
  '/js/configLoader.js',
  '/js/sw.js',

  /* Data */
  '/data/config.json',

  /* CDN dependencies (bootstrap, icons, etc.) */
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css',
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js',
  'https://cdn.jsdelivr.net/npm/vanta/dist/vanta.waves.min.js',
  'https://cdn.jsdelivr.net/npm/animate.css@4.1.1/animate.min.css'
];

/* ---------- INSTALL ---------- */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS))
  );
});

/* ---------- FETCH (Cache‑first, then network fallback) ---------- */
self.addEventListener('fetch', event => {
  const { request } = event;

  // Ignore non‑GET requests
  if (request.method !== 'GET') return;

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;

      // Not in cache: fetch from network & add a clone to cache
      return fetch(request)
        .then(response => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, responseClone));
          return response;
        })
        .catch(() => caches.match('/offline.html')); // Optional offline fallback
    })
  );
});

/* ---------- ACTIVATE (clean old caches) ---------- */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k.startsWith('markiva-cache-') && k !== CACHE_NAME)
            .map(k => caches.delete(k))
      )
    )
  );
});
