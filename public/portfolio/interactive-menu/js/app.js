document.addEventListener('DOMContentLoaded', () => {
    // Register service worker for better performance
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }

    // Initialize the menu builder with the menu data
    const menuBuilder = new MenuBuilder(menuData);
    
    // Initialize the carousel (removed duplicate initialization)
    // Carousel is already initialized in carousel.js
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const navigation = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', navigation.loadEventEnd - navigation.loadEventStart, 'ms');
        });
    }
    
    // Error handling
    window.addEventListener('error', (e) => {
        console.error('Global error:', e.error);
    });
    
    // Preload critical resources
    const preloadImages = [
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80',
        'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=2084&q=80'
    ];
    
    preloadImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = src;
        document.head.appendChild(link);
    });
    
    console.log('KustomByte menu interactive builder initialized');
});