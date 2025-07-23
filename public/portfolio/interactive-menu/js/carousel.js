class Carousel {
    constructor() {
        // Performance: Use requestAnimationFrame for smoother animations
        this.rafId = null;
        this.isVisible = true;
        
        this.container = document.querySelector('.carousel-container');
        this.track = document.querySelector('.carousel-track');
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.carousel-nav-prev');
        this.nextBtn = document.querySelector('.carousel-nav-next');
        this.progressBar = document.querySelector('.carousel-progress-bar');
        
        this.currentIndex = 0;
        this.slideWidth = this.container.clientWidth;
        this.totalSlides = this.slides.length - 1; // -1 because the last slide is a copy
        this.autoplayInterval = null;
        this.progressInterval = null;
        this.autoplayDuration = 5000; // 5 seconds
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.isTransitioning = false;
        this.resizeTimeout = null;
        
        // Bind methods for better performance
        this.handleResize = this.debounce(this.handleResize.bind(this), 250);
        this.handleKeydown = this.handleKeydown.bind(this);
        this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
        
        this.initCarousel();
    }
    
    // Debounce utility for performance
    debounce(func, wait) {
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(this.resizeTimeout);
                func(...args);
            };
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(later, wait);
        }.bind(this);
    }

    handleVisibilityChange() {
        this.isVisible = !document.hidden;
        if (this.isVisible) {
            this.startAutoplay();
        } else {
            this.pauseAutoplay();
        }
    }

    handleKeydown(e) {
        // Only handle keyboard if carousel is in viewport
        if (!this.isInViewport()) return;
        
        if (e.key === 'ArrowLeft' && !this.isTransitioning) {
            e.preventDefault();
            this.previousSlide();
            this.resetAutoplay();
        } else if (e.key === 'ArrowRight' && !this.isTransitioning) {
            e.preventDefault();
            this.nextSlide();
            this.resetAutoplay();
        } else if (e.key === 'Space' && !this.isTransitioning) {
            e.preventDefault();
            if (this.autoplayInterval) {
                this.pauseAutoplay();
            } else {
                this.startAutoplay();
            }
        }
    }

    isInViewport() {
        const rect = this.container.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    handleResize() {
        const newWidth = this.container.clientWidth;
        if (Math.abs(newWidth - this.slideWidth) > 10) { // Only resize if significant change
            this.slideWidth = newWidth;
            this.track.style.width = `${this.slideWidth * this.slides.length}px`;
            this.slides.forEach(slide => {
                slide.style.width = `${this.slideWidth}px`;
            });
            this.goToSlide(this.currentIndex, false); // Don't animate on resize
        }
    }
    
    initCarousel() {
        // Set initial slide as active
        this.slides[0].classList.add('active');
        
        // Set track width
        this.track.style.width = `${this.slideWidth * this.slides.length}px`;

        // Ensure all slides have consistent width
        this.slides.forEach(slide => {
            slide.style.width = `${this.slideWidth}px`;
        });
        
        // Add event listeners for indicators with improved accessibility
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                if (!this.isTransitioning) {
                    this.goToSlide(index);
                    this.resetAutoplay();
                }
            });
            
            // Add keyboard support for indicators
            indicator.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (!this.isTransitioning) {
                        this.goToSlide(index);
                        this.resetAutoplay();
                    }
                }
            });
        });

        // Add event listeners for navigation arrows
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                if (!this.isTransitioning) {
                    this.previousSlide();
                    this.resetAutoplay();
                }
            });
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                if (!this.isTransitioning) {
                    this.nextSlide();
                    this.resetAutoplay();
                }
            });
        }

        // Add optimized keyboard navigation
        document.addEventListener('keydown', this.handleKeydown);
        
        // Add visibility change listener for better performance
        document.addEventListener('visibilitychange', this.handleVisibilityChange);
        
        // Start autoplay and progress
        this.startAutoplay();
        
        // Add hover pause listeners with better performance
        this.container.addEventListener('mouseenter', () => this.pauseAutoplay(), { passive: true });
        this.container.addEventListener('mouseleave', () => this.startAutoplay(), { passive: true });
        
        // Setup mobile touch events with improved handling
        this.setupTouchEvents();
        
        // Handle window resize with debouncing
        window.addEventListener('resize', this.handleResize, { passive: true });

        // Add intersection observer for performance
        this.setupIntersectionObserver();
        
        // Preload next image for better UX
        this.preloadNextImage();
    }

    preloadNextImage() {
        const nextIndex = (this.currentIndex + 1) % this.totalSlides;
        const nextSlide = this.slides[nextIndex];
        const nextImg = nextSlide?.querySelector('img');
        
        if (nextImg && !nextImg.complete) {
            const preloadImg = new Image();
            preloadImg.src = nextImg.src;
        }
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.startAutoplay();
                } else {
                    this.pauseAutoplay();
                }
            });
        });
        
        observer.observe(this.container);
    }
    
    goToSlide(index, animate = true) {
        if (this.isTransitioning) return;
        
        // Ensure index is within bounds
        if (index < 0) {
            index = this.totalSlides - 1;
        } else if (index >= this.totalSlides) {
            index = 0;
        }
        
        this.isTransitioning = true;
        
        // Remove active class from all slides
        this.slides.forEach(slide => slide.classList.remove('active'));
        
        // Add active class to current slide
        this.slides[index].classList.add('active');
        
        this.currentIndex = index;
        
        // Set transition based on animate parameter
        if (!animate) {
            this.track.style.transition = 'none';
        } else {
            this.track.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
        
        // Move the track
        this.track.style.transform = `translateX(-${this.slideWidth * index}px)`;
        
        // Force reflow to ensure transition is applied or removed properly
        if (!animate) {
            this.track.offsetHeight;
            this.track.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
        
        this.updateActiveIndicator();
        
        // Reset transition flag after animation
        setTimeout(() => {
            this.isTransitioning = false;
        }, animate ? 800 : 0);
    }
    
    nextSlide() {
        this.goToSlide(this.currentIndex + 1);
    }
    
    previousSlide() {
        this.goToSlide(this.currentIndex - 1);
    }

    updateProgress() {
        if (!this.progressBar) return;
        
        let progress = 0;
        const startTime = Date.now();
        
        this.progressInterval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            progress = (elapsed / this.autoplayDuration) * 100;
            
            if (progress >= 100) {
                progress = 100;
                clearInterval(this.progressInterval);
            }
            
            this.progressBar.style.width = `${progress}%`;
        }, 50);
    }

    resetProgress() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }
        if (this.progressBar) {
            this.progressBar.style.width = '0%';
        }
    }
    
    startAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
        }
        
        this.resetProgress();
        this.updateProgress();
        
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoplayDuration);
    }

    pauseAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
        this.resetProgress();
    }

    resetAutoplay() {
        this.pauseAutoplay();
        this.startAutoplay();
    }
    
    updateActiveIndicator() {
        this.indicators.forEach((indicator, index) => {
            if (index === this.currentIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    setupTouchEvents() {
        let startX = 0;
        let currentX = 0;
        let isDragging = false;
        
        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            this.pauseAutoplay();
        }, { passive: true });
        
        this.container.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            currentX = e.touches[0].clientX;
        }, { passive: true });
        
        this.container.addEventListener('touchend', () => {
            if (!isDragging) return;
            isDragging = false;
            
            const diffX = startX - currentX;
            const threshold = this.slideWidth * 0.2; // 20% of slide width
            
            if (Math.abs(diffX) > threshold && !this.isTransitioning) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
            
            this.startAutoplay();
        }, { passive: true });

        // Mouse events for desktop drag
        let isMouseDown = false;
        
        this.container.addEventListener('mousedown', (e) => {
            e.preventDefault();
            startX = e.clientX;
            isMouseDown = true;
            this.pauseAutoplay();
        });
        
        this.container.addEventListener('mousemove', (e) => {
            if (!isMouseDown) return;
            e.preventDefault();
            currentX = e.clientX;
        });
        
        this.container.addEventListener('mouseup', () => {
            if (!isMouseDown) return;
            isMouseDown = false;
            
            const diffX = startX - currentX;
            const threshold = this.slideWidth * 0.2;
            
            if (Math.abs(diffX) > threshold && !this.isTransitioning) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
            }
            
            this.startAutoplay();
        });

        this.container.addEventListener('mouseleave', () => {
            isMouseDown = false;
            this.startAutoplay();
        });
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Carousel();
});