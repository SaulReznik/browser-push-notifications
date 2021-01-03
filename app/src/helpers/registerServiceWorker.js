const registerServiceWorker = async path => {
    try {
        return await navigator.serviceWorker.register(path, {
            scope: '/' // scope is the working area of the service worker
        });
    } catch (err) {
        console.error('Unable to register service worker.', err)
    }
};

export default registerServiceWorker;