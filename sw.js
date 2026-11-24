const CACHE_NAME = 'transprix-douala-v11';
const ASSETS = [
  './',
  'index.html',
  'douala.js',
  'yaounde.js',
  'bafoussam.js',
  'manifest.json',
  'icon.svg',
  'images/douala.jpg',
  'images/yaounde.jpg',
  'images/bafoussam.jpg'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  // Les requêtes Google Sheets ne passent pas par le cache SW (gérées par localStorage dans index.html)
  if (event.request.url.includes('docs.google.com/spreadsheets')) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
