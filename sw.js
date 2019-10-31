const appName = 'restaurant-app'; 
const staticCacheName = appName + '-v1.0'; 
const imgsCache = appName + '-images'; 
let allCaches = [staticCacheName, imgsCache]; 


// When installing SW, cache all statics assets for offline
self.addEventListener('install', event => 
    event.waitUntil(
        caches.open(staticCacheName).then( cache => {
            return cache.addAll([
                '/', // caches index.html 
                '/restaurant.html', 
                'css/styles.css', 
                'js/dbhelper.js', 
                'js/main.js', 
                'js/restaurant_info.js', 
                'js/register-sw.js', 
                'data/restaurants.json' 
            ])
        })
    )    
);

// Delete old static cache if name doesn't match the current version of the app
// this is to ensure we have the latest version 
self.addEventListener('activate', event =>
    event.waitUntil(
        caches.keys().then( cachesNames => {
            return Promise.all(
                cachesNames.filter( cacheName => {
                    return cacheName.startsWith(appName) &&
                            cacheName != staticCacheName;
                }).map( cacheName => {
                    return caches.delete(cacheName); 
                })
            )
        })
    )
)

//We need to 'fetch' to get things out of the cache
//If the request got a match in the cache, I’ll return it 
//Otherwise, I’ll return a fetch to the network for the original request 
self.addEventListener('fetch', event =>
    event.respondWith(
        caches.match(event.request, {'ignoreSearch': true}).then( response => {
            return response || fetch(event.request); 
        })
    )
)