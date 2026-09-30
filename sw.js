const CACHE_NAME = "toy-haven-v2";

const FILES_TO_CACHE = [
    "./index.html",
    "./products.html",
    "./cart.html",
    "./checkout.html",
    "./wishlist.html",
    "./support.html",
    "./style.css",
    "./app.js",
    "./products.js",
    "./manifest.webmanifest",
    "./icon-192.png",
    "./icon-512.png",
    "./Logo.jpeg",
    "./moonlight teddy.jpeg",
    "./Mystery Mansion.jpeg",
    "./Pixel Pet Buddy.jpeg",
    "./Rainbow Rocket Blaster.jpeg",
    "./Retro Racer GT.jpeg",
    "./Jungle Dash.jpeg",
    "./Cosmic Quest.jpeg",
    "./favicon.png",
    "./Build-It Dino Kit.jpeg",
    "./City Fire Rescue.jpeg",
    "./Classic Bus 1968.jpeg",
    "./Cloud Castle Princess.jpeg",
    "./Galaxy Explorer Mini.jpeg",
    "./toy-teddy.png",
    "./toy-teddy.svg"

];

self.addEventListener("install", event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache =>
            Promise.all(FILES_TO_CACHE.map(file => cache.add(file).catch(() => {})))
        )
    );
});

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", event => {
    if (event.request.method !== "GET") return;
    event.respondWith(
        fetch(event.request)
            .then(response => {
                const copy = response.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
                return response;
            })
            .catch(() => caches.match(event.request))
    );
});
