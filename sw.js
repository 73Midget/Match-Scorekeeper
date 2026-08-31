/* Match Scorekeeper — service worker
   Created by G. Groiss · GNU AGPL v3.0

   BUMP THIS on every deploy. It must match APP_BUILD in index.html.
   Changing it is what makes tablets pick up a new build: the browser sees
   sw.js has changed, installs the new one, and the old cache is deleted. */
const BUILD = "2026-08-29-b";
const CACHE = "scorekeeper-" + BUILD;

/* Everything needed to run with no signal. Keep this list accurate —
   if any entry 404s, install fails and the app won't cache at all. */
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }));
  /* Deliberately NOT calling skipWaiting(): a new build must never swap in
     underneath someone mid-match. It activates the next time the app is
     fully closed and reopened. */
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.map(function (k) {
          return k === CACHE ? null : caches.delete(k);
        }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  const req = e.request;
  if (req.method !== "GET") return;
  if (new URL(req.url).origin !== location.origin) return;

  /* Navigation: network first, cache fallback. Online you always get the
     current build (no stale-app trap); offline at the range you get the
     cached copy. */
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then(function (res) {
          const copy = res.clone();
          caches.open(CACHE).then(function (c) { c.put("./index.html", copy); });
          return res;
        })
        .catch(function () {
          return caches.match("./index.html").then(function (r) {
            return r || caches.match("./");
          });
        })
    );
    return;
  }

  /* Everything else (icons, manifest): cache first — they rarely change and
     this keeps launches instant. */
  e.respondWith(
    caches.match(req).then(function (r) {
      return r || fetch(req).then(function (res) {
        const copy = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, copy); });
        return res;
      });
    })
  );
});
