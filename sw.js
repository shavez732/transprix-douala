const CACHE_NAME = 'transprix-douala-v8';
const ASSETS = [
  './',
  'index.html',
  'douala.js',
  'yaounde.js',
  'manifest.json',
  'icon.svg'
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
  if (event.request.url.includes('https://docs.google.com/spreadsheets/d/e/2PACX-1vSq9OEZUP1AT0zs08bc4G3Z4gmirf0g8tRq0WztCRCXsOfMf_tZTZI9qupwPm-8sPMDvGvHnTzGjaCo/pub?output=csv')) return;

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
