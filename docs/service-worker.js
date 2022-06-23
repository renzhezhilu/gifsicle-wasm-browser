// https://googlechrome.github.io/samples/service-worker/basic/

// Names of the two caches used in this version of the service worker.
// Change to v2, etc. when you update any of the local resources, which will
// in turn trigger the install event again.
const PRECACHE = "1.5.15";
const RUNTIME = "runtime";

// A list of local resources we always want to be cached.
const PRECACHE_URLS = ['index.html','./','css/color.css','css/font/inter.css','css/font/inter.ttf','css/highlight.min.css','css/icon/iconfont.css','css/icon/iconfont.eot','css/icon/iconfont.svg','css/icon/iconfont.ttf','css/icon/iconfont.woff','css/icon/iconfont.woff2','css/index.less','css/init.less','css/main.less','favicon.png','icon.png','images/bg.jpg','images/bg_.jpg','images/ui.webp','images/ui_.jpg','images/ui_.webp','index_html_bak.html','js/gifsicle.min.js','js/gifsicleTool.js','js/highlight.min.js','js/index.js','js/less.js','js/pxmu.js','js/simply-beautiful.js','js/tool.js','js/uzip.js','js/vue.esm.browser.2.6.js','readme.md','test.html'];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(PRECACHE)
            .then(cache => cache.addAll(PRECACHE_URLS))
            .then(self.skipWaiting())
    );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
    const currentCaches = [PRECACHE, RUNTIME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
        }).then(cachesToDelete => {
            return Promise.all(cachesToDelete.map(cacheToDelete => {
                return caches.delete(cacheToDelete);
            }));
        }).then(() => self.clients.claim())
    );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
    // Skip cross-origin requests, like those for Google Analytics.
    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }

                return caches.open(RUNTIME).then(cache => {
                    return fetch(event.request).then(response => {
                        // Put a copy of the response in the runtime cache.
                        return cache.put(event.request, response.clone()).then(() => {
                            return response;
                        });
                    });
                });
            })
        );
    }
});