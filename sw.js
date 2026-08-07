const CACHE = 'spotter-log-v2';
// Relative paths keep the app inside its GitHub Pages project directory.
const APP_SHELL = new URL('./', self.location).href;
self.addEventListener('install', event => event.waitUntil(caches.open(CACHE).then(cache => cache.add(APP_SHELL))));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then(hit => hit || fetch(event.request).then(response => {
    if (response.ok && new URL(event.request.url).origin === self.location.origin) {
      caches.open(CACHE).then(cache => cache.put(event.request, response.clone()));
    }
    return response;
  })));
});
