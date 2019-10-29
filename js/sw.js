const appName = 'restaurant-app'; 
const staticCacheName = appName + '-v1.0'; 
const imgsCache = appName + '-images'; 
const allCaches = [staticCacheName, imgsCache]; 


// install SW, cache all statis assets
self.addEventListener('install', event => 
    event.waitUntil(
        caches.open(staticCacheName).then( cache => {
            return cache.addAll([
                '/',
                'css/styles.js', 
                'js/dbhelper.js', 
                'js/main.js', 
                'js/register-sw.js', 
                'js/restaurant_info.js', 
                'data/restaurants.json' 
            ])
        })
    )    
);

// Delete old static cache if name doesn't match the current version of the app
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

