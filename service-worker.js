/* qlixsound PWA service worker — shell only; Supabase/audio stay network-driven. */
const CACHE_NAME = 'qlixsound-shell-v1';
const APP_SHELL = ['./','./index.html','./tracks.html','./style.css','./app.js','./config.js','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install', event => { event.waitUntil((async () => { const cache = await caches.open(CACHE_NAME); await cache.addAll(APP_SHELL); await self.skipWaiting(); })()); });
self.addEventListener('activate', event => { event.waitUntil((async () => { const keys = await caches.keys(); await Promise.all(keys.filter(key => key.startsWith('qlixsound-shell-') && key !== CACHE_NAME).map(key => caches.delete(key))); await self.clients.claim(); })()); });
self.addEventListener('fetch', event => {
  const request = event.request; const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;
  if (request.mode === 'navigate') {
    event.respondWith((async () => { try { const response = await fetch(request); if (response.ok) { const cache = await caches.open(CACHE_NAME); cache.put(request,response.clone()); } return response; } catch (_) { return (await caches.match(request)) || (await caches.match('./index.html')); } })()); return;
  }
  event.respondWith((async () => { try { const response = await fetch(request); if (response.ok) { const cache = await caches.open(CACHE_NAME); cache.put(request,response.clone()); } return response; } catch (_) { return (await caches.match(request)) || Response.error(); } })());
});
