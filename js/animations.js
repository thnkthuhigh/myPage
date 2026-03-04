/* ============================================================
   ANIMATIONS.JS - GSAP ScrollTrigger animations
   Advanced scroll-triggered animation sequences
   ============================================================ */

// This file is loaded by main.js through initAnimations()
// Additional animation utilities

// Text split animation helper
function splitTextToChars(element) {
    const text = element.textContent;
    element.innerHTML = '';
    
    text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.classList.add('char');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.transitionDelay = `${i * 0.03}s`;
        element.appendChild(span);
    });
}

// Smooth number counter
function smoothCounter(element, target, duration = 2000) {
    let start = 0;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function
        const eased = 1 - Math.pow(1 - progress, 3);
        
        const current = Math.floor(eased * target);
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target;
        }
    }
    
    requestAnimationFrame(update);
}

// Parallax mouse movement
function initParallaxMouse() {
    const parallaxElements = document.querySelectorAll('[data-parallax-mouse]');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        
        parallaxElements.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-parallax-mouse')) || 1;
            const x = mouseX * speed * 20;
            const y = mouseY * speed * 20;
            
            gsap.to(el, {
                x: x,
                y: y,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
}

// Intersection Observer for reveals (fallback for non-GSAP)
function initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        observer.observe(el);
    });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initParallaxMouse();
});
