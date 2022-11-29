

const STATIC_CACHE_NAME = 'static-cache-v1';
const INMUTABLE_CACHE_NAME = 'inmutable-cache-v1';

self.addEventListener('install', (event) => {
    console.log('SW: Instalado');
    const staticCache = caches.open(STATIC_CACHE_NAME).then((cache) => {
        return cache.addAll([
            './',          
            './index.html',
            './style/base.css',
            './style/bg.png',
            './style/plain_sign_in_blue.png',
            './js/app.js',
            './js/base.js',
            './js/pouchdb-nightly.js',
            './images/icons/android-launchericon-48-48.png',
            './images/icons/android-launchericon-72-72.png',
            './images/icons/android-launchericon-96-96.png',
            './images/icons/android-launchericon-144-144.png',
            './images/icons/android-launchericon-192-192.png',
            './images/icons/android-launchericon-512-512.png'
            
        ]);
    });

    const inmutableCache = caches.open(INMUTABLE_CACHE_NAME).then((cache) => {
        return cache.addAll([
          "https://cdn.jsdelivr.net/npm/pouchdb@7.3.1/dist/pouchdb.min.js",
          "//cdn.jsdelivr.net/npm/pouchdb@7.3.1/dist/pouchdb.min.js",
        ]);
    });
    
    event.waitUntil(Promise.all[(staticCache, inmutableCache)]);
});

self.addEventListener('activate', (event) => {
    console.log('SW: Activadoo');
});

self.addEventListener('fetch', (event) => {
    const respuesta = caches
        .match(event.request)
        .then((respCache) => respCache);
    event.respondWith(respuesta);
});