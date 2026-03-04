/* ============================================================
   MAIN.JS - Core functionality
   Custom cursor, navigation, theme, forms, interactions
   ============================================================ */

// Global site data loaded from JSON
let siteData = null;

document.addEventListener('DOMContentLoaded', () => {
    // Load content.json then initialize
    fetch('data/content.json')
        .then(res => res.json())
        .then(data => {
            siteData = data;
            renderSiteContent(data);
            initApp();
        })
        .catch(err => {
            console.warn('Could not load content.json, using defaults:', err);
            initApp();
        });
});

function initApp() {
    // ==================== PRELOADER ====================
    const preloader = document.getElementById('preloader');
    const loaderNumber = document.getElementById('loader-number');
    let count = 0;

    const counterInterval = setInterval(() => {
        count += Math.floor(Math.random() * 10) + 1;
        if (count > 100) count = 100;
        loaderNumber.textContent = count;

        if (count >= 100) {
            clearInterval(counterInterval);
            setTimeout(() => {
                gsap.to(preloader, {
                    yPercent: -100,
                    duration: 0.8,
                    ease: 'power4.inOut',
                    onComplete: () => {
                        preloader.style.display = 'none';
                        document.body.style.overflow = 'auto';
                        initAnimations();
                    }
                });
            }, 500);
        }
    }, 30);

    // ==================== CUSTOM CURSOR ====================
    const cursor = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        gsap.to(cursor, {
            x: mouseX,
            y: mouseY,
            duration: 0.1,
            ease: 'power2.out'
        });
    });

    // Smooth follower
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;

        gsap.set(follower, {
            x: followerX,
            y: followerY
        });

        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, [data-magnetic], input, textarea');

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        });

        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        });
    });

    // ==================== MAGNETIC EFFECT ====================
    const magneticElements = document.querySelectorAll('[data-magnetic]');

    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(el, {
                x: x * 0.3,
                y: y * 0.3,
                duration: 0.4,
                ease: 'power2.out'
            });
        });

        el.addEventListener('mouseleave', () => {
            gsap.to(el, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: 'elastic.out(1, 0.3)'
            });
        });
    });

    // ==================== NAVBAR ====================
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Scroll effect
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll progress
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = (scrollY / docHeight) * 100;
        document.getElementById('scroll-progress').style.width = `${scrollProgress}%`;

        // Active nav link
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    scrollTo: { y: target, offsetY: 80 },
                    duration: 1,
                    ease: 'power3.inOut'
                });
            }

            // Close mobile menu if open
            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // ==================== HAMBURGER / MOBILE MENU ====================
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobile-menu');

    function toggleMobileMenu() {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    hamburger.addEventListener('click', toggleMobileMenu);

    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            toggleMobileMenu();
        });
    });

    // ==================== THEME TOGGLE ====================
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Check saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Animate toggle
        gsap.fromTo(themeToggle,
            { rotation: 0, scale: 0.5 },
            { rotation: 360, scale: 1, duration: 0.5, ease: 'back.out(1.7)' }
        );
    });

    // ==================== TYPING EFFECT ====================
    const typedTextEl = document.getElementById('typed-text');
    const phrases = (siteData && siteData.hero && siteData.hero.typingPhrases) ? siteData.hero.typingPhrases : [
        'Full Stack Developer',
        'UI/UX Designer',
        'Creative Coder',
        'Problem Solver',
        'Tech Enthusiast'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before typing new phrase
        }

        setTimeout(typeEffect, typeSpeed);
    }

    typeEffect();

    // ==================== COUNTER ANIMATION ====================
    function animateCounters() {
        const counters = document.querySelectorAll('[data-count]');

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            const duration = 2;

            gsap.to(counter, {
                textContent: target,
                duration: duration,
                ease: 'power2.out',
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: counter,
                    start: 'top 80%',
                    once: true
                }
            });
        });
    }

    // ==================== PROJECT FILTERING ====================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category.includes(filter)) {
                    gsap.to(card, {
                        opacity: 1,
                        scale: 1,
                        duration: 0.4,
                        ease: 'power2.out',
                        onStart: () => card.classList.remove('hidden')
                    });
                } else {
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.4,
                        ease: 'power2.out',
                        onComplete: () => card.classList.add('hidden')
                    });
                }
            });
        });
    });

    // ==================== TESTIMONIAL SLIDER ====================
    const track = document.getElementById('testimonial-track');
    const cards = track ? track.querySelectorAll('.testimonial-card') : [];
    const dotsContainer = document.getElementById('testimonial-dots');
    const prevBtn = document.getElementById('testimonial-prev');
    const nextBtn = document.getElementById('testimonial-next');
    let currentSlide = 0;

    if (cards.length > 0 && dotsContainer) {
        // Create dots
        cards.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });

        function goToSlide(index) {
            currentSlide = index;
            track.style.transform = `translateX(-${index * 100}%)`;

            dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        prevBtn.addEventListener('click', () => {
            currentSlide = currentSlide === 0 ? cards.length - 1 : currentSlide - 1;
            goToSlide(currentSlide);
        });

        nextBtn.addEventListener('click', () => {
            currentSlide = currentSlide === cards.length - 1 ? 0 : currentSlide + 1;
            goToSlide(currentSlide);
        });

        // Auto-play
        setInterval(() => {
            currentSlide = (currentSlide + 1) % cards.length;
            goToSlide(currentSlide);
        }, 5000);
    }

    // ==================== CONTACT FORM ====================
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalText = submitBtn.querySelector('.btn-text').textContent;

            // Animate button
            submitBtn.querySelector('.btn-text').textContent = 'Đang gửi...';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                submitBtn.querySelector('.btn-text').textContent = 'Đã gửi! ✓';
                submitBtn.style.background = 'linear-gradient(135deg, #00ff88, #00cc6a)';

                gsap.fromTo(submitBtn,
                    { scale: 0.95 },
                    { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.3)' }
                );

                setTimeout(() => {
                    submitBtn.querySelector('.btn-text').textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 3000);
            }, 1500);
        });
    }

    // ==================== SKILL BAR ANIMATION ====================
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');

        skillBars.forEach(bar => {
            ScrollTrigger.create({
                trigger: bar,
                start: 'top 85%',
                once: true,
                onEnter: () => {
                    const width = bar.getAttribute('data-width');
                    gsap.to(bar, {
                        width: `${width}%`,
                        duration: 1.5,
                        ease: 'power2.out'
                    });
                }
            });
        });
    }

    // ==================== INIT ALL ANIMATIONS ====================
    function initAnimations() {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

        // Reveal animations
        const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');

        reveals.forEach((el, i) => {
            ScrollTrigger.create({
                trigger: el,
                start: 'top 85%',
                once: true,
                onEnter: () => {
                    gsap.to(el, {
                        opacity: 1,
                        x: 0,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        delay: i % 3 * 0.1,
                        ease: 'power3.out'
                    });
                    el.classList.add('revealed');
                }
            });
        });

        // Hero entrance animation
        const heroTl = gsap.timeline({ delay: 0.2 });

        heroTl
            .from('.hero-badge', { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out' })
            .from('.title-line', { y: 60, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }, '-=0.3')
            .from('.hero-description', { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
            .from('.hero-cta .btn', { y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }, '-=0.3')
            .from('.social-link', { y: 20, opacity: 0, duration: 0.4, stagger: 0.08, ease: 'power3.out' }, '-=0.3')
            .from('.hero-visual', { scale: 0.8, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.8')
            .from('.floating-card', { scale: 0, opacity: 0, duration: 0.6, stagger: 0.15, ease: 'back.out(1.7)' }, '-=0.5')
            .from('.scroll-indicator', { y: 20, opacity: 0, duration: 0.5 }, '-=0.3');

        // Parallax effects
        gsap.utils.toArray('.section').forEach(section => {
            const header = section.querySelector('.section-header');
            if (header) {
                gsap.to(header, {
                    yPercent: -20,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1
                    }
                });
            }
        });

        // Initialize skill bars
        initSkillBars();

        // Initialize counters
        animateCounters();

        // Timeline line animation
        const timelineLine = document.querySelector('.timeline-line');
        if (timelineLine) {
            gsap.to(timelineLine, {
                '--progress': '100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: '.timeline',
                    start: 'top 60%',
                    end: 'bottom 40%',
                    scrub: 1
                }
            });
        }

        // Marquee speed on scroll
        const marqueeTrack = document.querySelector('.marquee-track');
        if (marqueeTrack) {
            ScrollTrigger.create({
                trigger: '.marquee-section',
                start: 'top bottom',
                end: 'bottom top',
                onUpdate: (self) => {
                    const speed = 1 + self.getVelocity() / 1000;
                    gsap.to('.marquee-content', {
                        skewX: Math.min(Math.max(self.getVelocity() / 500, -5), 5),
                        duration: 0.3
                    });
                }
            });
        }
    }

    // ==================== VANILLA TILT INIT ====================
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {
            max: 8,
            speed: 400,
            glare: true,
            'max-glare': 0.15,
            gyroscope: true
        });
    }

    // ==================== RESUME TABS ====================
    const resumeTabs = document.querySelectorAll('.resume-tab');
    const resumePanels = document.querySelectorAll('.resume-panel');

    resumeTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');

            resumeTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            resumePanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === 'tab-' + target) {
                    panel.classList.add('active');
                    // Re-init tilt on newly visible cards
                    if (typeof VanillaTilt !== 'undefined') {
                        const tiltElements = panel.querySelectorAll('[data-tilt]');
                        tiltElements.forEach(el => {
                            if (el.vanillaTilt) el.vanillaTilt.destroy();
                        });
                        VanillaTilt.init(tiltElements, {
                            max: 5,
                            speed: 400,
                            glare: true,
                            'max-glare': 0.1
                        });
                    }
                }
            });
        });
    });

    // ==================== PROJECT DETAIL MODAL ====================
    // Build projectsData from JSON
    const projectsData = {};
    if (siteData && siteData.projects && siteData.projects.items) {
        siteData.projects.items.forEach(p => {
            if (p.detail) {
                projectsData[p.id] = {
                    title: p.detail.subtitle ? p.title : p.title,
                    subtitle: p.detail.subtitle,
                    category: p.detail.categoryLabel,
                    heroGradient: p.detail.heroGradient,
                    overview: p.detail.overview,
                    problem: p.detail.problem,
                    solution: p.detail.solution,
                    tech: p.detail.tech,
                    features: p.detail.features,
                    metrics: p.detail.metrics,
                    role: p.detail.role,
                    duration: p.detail.duration,
                    team: p.detail.team,
                    status: p.detail.status,
                    challenges: p.detail.challenges,
                    links: p.detail.links
                };
            }
        });
    }

    // Open modal
    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const detailButtons = document.querySelectorAll('.btn-detail');

    function openProjectModal(projectId) {
        const data = projectsData[projectId];
        if (!data) return;

        // Fill hero
        document.getElementById('modalHeroBg').style.background = data.heroGradient;
        document.getElementById('modalCategory').textContent = data.category;
        document.getElementById('modalTitle').textContent = data.title;
        document.getElementById('modalSubtitle').textContent = data.subtitle;

        // Fill body
        document.getElementById('modalOverview').textContent = data.overview;
        document.getElementById('modalProblem').textContent = data.problem;
        document.getElementById('modalSolution').textContent = data.solution;

        // Tech
        const techContainer = document.getElementById('modalTech');
        techContainer.innerHTML = data.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');

        // Features
        const featuresContainer = document.getElementById('modalFeatures');
        featuresContainer.innerHTML = data.features.map(f => `
            <div class="feature-item">
                <span class="feature-icon">${f.icon}</span>
                <div class="feature-text">
                    <strong>${f.title}</strong>
                    ${f.desc}
                </div>
            </div>
        `).join('');

        // Metrics
        const metricsContainer = document.getElementById('modalMetrics');
        metricsContainer.innerHTML = data.metrics.map(m => `
            <div class="metric-card">
                <div class="metric-value">${m.value}</div>
                <div class="metric-label">${m.label}</div>
            </div>
        `).join('');

        // Gallery placeholders
        const galleryContainer = document.getElementById('modalGallery');
        galleryContainer.innerHTML = [1, 2, 3].map(i => `
            <div class="gallery-placeholder">Screenshot ${i}</div>
        `).join('');

        // Project info
        document.getElementById('modalRole').textContent = data.role;
        document.getElementById('modalDuration').textContent = data.duration;
        document.getElementById('modalTeam').textContent = data.team;
        document.getElementById('modalStatus').textContent = data.status;

        // Challenges
        const challengesContainer = document.getElementById('modalChallenges');
        challengesContainer.innerHTML = data.challenges.map(c => `
            <div class="challenge-item">${c}</div>
        `).join('');

        // Links
        const linksContainer = document.getElementById('modalLinks');
        linksContainer.innerHTML = `
            <a href="${data.links.demo}" class="modal-link" target="_blank">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Live Demo
            </a>
            <a href="${data.links.github}" class="modal-link" target="_blank">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub Repo
            </a>
        `;

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Reset scroll
        const modalScroll = modal.querySelector('.modal-scroll');
        if (modalScroll) modalScroll.scrollTop = 0;

        // GSAP animation
        if (typeof gsap !== 'undefined') {
            gsap.fromTo('.modal-hero-content > *',
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, delay: 0.3, ease: 'power3.out' }
            );
            gsap.fromTo('.modal-section',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, delay: 0.5, ease: 'power2.out' }
            );
            gsap.fromTo('.sidebar-card',
                { opacity: 0, x: 30 },
                { opacity: 1, x: 0, stagger: 0.1, duration: 0.5, delay: 0.6, ease: 'power2.out' }
            );
        }
    }

    function closeProjectModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    detailButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const card = btn.closest('.project-card');
            const projectId = card ? card.getAttribute('data-project-id') : null;
            if (projectId) openProjectModal(projectId);
        });
    });

    // Also open on card click
    document.querySelectorAll('.project-card[data-project-id]').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.project-link')) return; // Don't intercept external links
            if (e.target.closest('.btn-detail')) return; // Already handled
            const projectId = card.getAttribute('data-project-id');
            if (projectId) openProjectModal(projectId);
        });
        card.style.cursor = 'pointer';
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeProjectModal);
    }

    modal?.addEventListener('click', (e) => {
        if (e.target === modal) closeProjectModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal?.classList.contains('active')) {
            closeProjectModal();
        }
    });

    // ==================== GSAP SCROLL ANIMATIONS FOR RESUME ====================
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.utils.toArray('.resume-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 40,
                duration: 0.6,
                delay: i * 0.1,
                ease: 'power3.out'
            });
        });

        gsap.utils.toArray('.language-card, .interest-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                scale: 0.8,
                duration: 0.5,
                delay: i * 0.05,
                ease: 'back.out(1.5)'
            });
        });
    }
}

// ==================== RENDER SITE CONTENT FROM JSON ====================
function renderSiteContent(data) {
    if (!data) return;

    // --- META ---
    if (data.meta) {
        document.title = data.meta.title || document.title;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && data.meta.description) metaDesc.setAttribute('content', data.meta.description);
    }

    // --- HERO ---
    if (data.hero) {
        const badge = document.querySelector('.hero-badge span:last-child');
        if (badge) badge.textContent = data.hero.badge;

        const greeting = document.querySelector('.title-word');
        if (greeting) greeting.textContent = data.hero.greeting;

        const name = document.querySelector('.title-name');
        if (name) {
            name.textContent = data.hero.name;
            name.setAttribute('data-text', data.hero.name);
        }

        const desc = document.querySelector('.hero-description');
        if (desc) desc.innerHTML = data.hero.description;

        // Floating cards
        if (data.hero.floatingCards) {
            data.hero.floatingCards.forEach((card, i) => {
                const el = document.querySelector(`.floating-card.card-${i + 1}`);
                if (el) {
                    const icon = el.querySelector('.floating-card-icon');
                    const num = el.querySelector('.card-number');
                    const lbl = el.querySelector('.card-label');
                    if (icon) icon.textContent = card.icon;
                    if (num) num.textContent = card.number;
                    if (lbl) lbl.textContent = card.label;
                }
            });
        }

        // Scroll text
        const scrollText = document.querySelector('.scroll-indicator span');
        if (scrollText && data.hero.scrollText) scrollText.textContent = data.hero.scrollText;
    }

    // --- ABOUT ---
    if (data.about) {
        const subtitle = document.querySelector('.about-subtitle');
        if (subtitle) subtitle.textContent = data.about.subtitle;

        const paragraphs = document.querySelectorAll('.about-text p');
        if (data.about.paragraphs) {
            data.about.paragraphs.forEach((text, i) => {
                if (paragraphs[i]) paragraphs[i].textContent = text;
            });
        }

        // Stats
        if (data.about.stats) {
            const statItems = document.querySelectorAll('.stat-item');
            data.about.stats.forEach((stat, i) => {
                if (statItems[i]) {
                    const num = statItems[i].querySelector('.stat-number');
                    const lbl = statItems[i].querySelector('.stat-label');
                    if (num) num.setAttribute('data-count', stat.count);
                    if (lbl) lbl.textContent = stat.label;
                }
            });
        }

        // Info items
        if (data.about.info) {
            const infoItems = document.querySelectorAll('.about-info .info-item');
            data.about.info.forEach((info, i) => {
                if (infoItems[i]) {
                    const lbl = infoItems[i].querySelector('.info-label');
                    const val = infoItems[i].querySelector('.info-value');
                    if (lbl) lbl.textContent = info.label;
                    if (val) val.textContent = info.value;
                }
            });
        }

        // Experience badge
        const expNum = document.querySelector('.exp-number');
        if (expNum && data.about.experienceYears) expNum.textContent = data.about.experienceYears;
    }

    // --- SKILLS ---
    if (data.skills && data.skills.categories) {
        const cats = document.querySelectorAll('.skill-category');
        data.skills.categories.forEach((cat, ci) => {
            if (!cats[ci]) return;
            const h3 = cats[ci].querySelector('.skill-category-header h3');
            if (h3) h3.textContent = cat.name;

            const items = cats[ci].querySelectorAll('.skill-item');
            cat.items.forEach((skill, si) => {
                if (!items[si]) return;
                const name = items[si].querySelector('.skill-name');
                const pct = items[si].querySelector('.skill-percent');
                const bar = items[si].querySelector('.skill-progress');
                if (name) name.textContent = skill.name;
                if (pct) pct.textContent = skill.percent + '%';
                if (bar) bar.setAttribute('data-width', skill.percent);
            });
        });
    }

    // --- EXPERIENCE ---
    if (data.experience && data.experience.timeline) {
        const items = document.querySelectorAll('.timeline-item');
        data.experience.timeline.forEach((exp, i) => {
            if (!items[i]) return;
            const date = items[i].querySelector('.timeline-date');
            const title = items[i].querySelector('.timeline-title');
            const company = items[i].querySelector('.timeline-company');
            const desc = items[i].querySelector('.timeline-description');
            if (date) date.textContent = exp.date;
            if (title) title.textContent = exp.title;
            if (company) company.textContent = exp.company;
            if (desc) desc.textContent = exp.description;

            const tags = items[i].querySelectorAll('.timeline-tags span');
            exp.tags.forEach((tag, ti) => {
                if (tags[ti]) tags[ti].textContent = tag;
            });
        });
    }

    // --- TESTIMONIALS ---
    if (data.testimonials && data.testimonials.items) {
        const cards = document.querySelectorAll('.testimonial-card');
        data.testimonials.items.forEach((t, i) => {
            if (!cards[i]) return;
            const text = cards[i].querySelector('.testimonial-text');
            const name = cards[i].querySelector('.author-name');
            const role = cards[i].querySelector('.author-role');
            const avatar = cards[i].querySelector('.author-avatar');
            if (text) text.textContent = '"' + t.text + '"';
            if (name) name.textContent = t.authorName;
            if (role) role.textContent = t.authorRole;
            if (avatar) avatar.textContent = t.authorInitials;
        });
    }

    // --- CONTACT ---
    if (data.contact) {
        const subtitle = document.querySelector('.contact-subtitle');
        if (subtitle) subtitle.textContent = data.contact.subtitle;

        const text = document.querySelector('.contact-text');
        if (text) text.textContent = data.contact.text;
    }

    // --- FOOTER ---
    if (data.footer) {
        const tagline = document.querySelector('.footer-col p');
        if (tagline) tagline.textContent = data.footer.tagline;
    }
}
