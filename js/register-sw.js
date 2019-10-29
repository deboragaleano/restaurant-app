// Register SW if supported
if(navigator.serviceWorker) {
    navigator.serviceWorker.register('/sw.js').then( reg => 
        console.log('Service Worker has been registered successfully!')
    ).catch( err => 
        console.log("Couldn't register Service Worker.\n", err)
    ); 
}
