const CACHE_NAME = "next-quiz-app-v1";
const ASSETS = [
  "/",
  "/_next/static/css/styles.css",
  "/_next/static/chunks/main.js",
  "/_next/static/chunks/pages/_app.js",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});