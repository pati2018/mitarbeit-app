// Offline-Betrieb: erst Netz (damit Updates ankommen), sonst Zwischenspeicher.
// Schülerdaten liegen nicht hier, sondern im localStorage des Geräts.
var CACHE = "mitarbeit-v2";
var DATEIEN = ["./", "index.html", "manifest.webmanifest", "vendor/xlsx.full.min.js",
  "icons/icon-180.png", "icons/icon-192.png", "icons/icon-512.png"];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(DATEIEN); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).then(function (res) {
      if (res.ok && new URL(e.request.url).origin === location.origin) {
        var kopie = res.clone();
        caches.open(CACHE).then(function (c) { c.put(e.request, kopie); });
      }
      return res;
    }).catch(function () {
      return caches.match(e.request).then(function (r) { return r || caches.match("index.html"); });
    })
  );
});
