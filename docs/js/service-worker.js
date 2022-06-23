// https://googlechrome.github.io/samples/service-worker/basic/

const PRECACHE = "1.2.6";
const RUNTIME = "runtime";

const PRECACHE_URLS = ['./css/color.css','./css/font/inter.css','./css/font/inter.ttf','./css/highlight.min.css','./css/icon/_demo.html','./css/icon/iconfont.css','./css/icon/iconfont.eot','./css/icon/iconfont.svg','./css/icon/iconfont.ttf','./css/icon/iconfont.woff','./css/icon/iconfont.woff2','./css/index.less','./css/init.less','./css/main.less','./favicon.png','./icon.png','./images/bg.jpg','./images/bg_.jpg','./images/ui.webp','./images/ui_.jpg','./images/ui_.webp','./index.html','./index_html_bal.html','./js/gifsicle.min.js','./js/gifsicleTool.js','./js/highlight.min.js','./js/index.js','./js/less.js','./js/pxmu.js','./js/simply-beautiful.js','./js/tool.js','./js/uzip.js','./js/vue.esm.browser.2.6.js','./readme.md','./test.html'];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open(PRECACHE)
            .then((cache) => cache.addAll(PRECACHE_URLS))
            .then(self.skipWaiting())
    );
});

self.addEventListener("activate", (event) => {
    const currentCaches = [PRECACHE, RUNTIME];
    event.waitUntil(
        caches
            .keys()
            .then((cacheNames) => {
                return cacheNames.filter(
                    (cacheName) => !currentCaches.includes(cacheName)
                );
            })
            .then((cachesToDelete) => {
                return Promise.all(
                    cachesToDelete.map((cacheToDelete) => {
                        return caches.delete(cacheToDelete);
                    })
                );
            })
            .then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (event) => {
    if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return caches.open(RUNTIME).then((cache) => {
                    return fetch(event.request).then((response) => {
                        return cache.put(event.request, response.clone()).then(() => {
                            return response;
                        });
                    });
                });
            })
        );
    }
});
