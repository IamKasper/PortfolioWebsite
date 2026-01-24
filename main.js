// Portfolio Website - GSAP Animations
(function() {
    'use strict';

    // Active navigation state
    const currentPage = document.body.dataset.page;
    if (currentPage) {
        const activeLink = document.querySelector(`[data-nav="${currentPage}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    // Wait for GSAP to load
    function initAnimations() {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
            setTimeout(initAnimations, 50);
            return;
        }

        gsap.registerPlugin(ScrollTrigger);

        // Loading animation - only show on first visit
        const loader = document.querySelector('.loader');
        const hasVisited = sessionStorage.getItem('hasVisited');

        if (loader && !hasVisited) {
            sessionStorage.setItem('hasVisited', 'true');
            gsap.to(loader, {
                opacity: 0,
                duration: 0.5,
                delay: 0.3,
                onComplete: () => {
                    loader.style.display = 'none';
                    animatePageContent();
                }
            });
        } else {
            if (loader) loader.style.display = 'none';
            animatePageContent();
        }
    }

    function animatePageContent() {
        // Hero section animations (home page)
        const hero = document.querySelector('.hero');
        if (hero) {
            const heroTl = gsap.timeline();
            heroTl.from('.hero h1', {
                y: 40,
                opacity: 0,
                duration: 0.5,
                ease: 'power3.out'
            })
            .from('.hero p', {
                y: 30,
                opacity: 0,
                duration: 0.4,
                ease: 'power3.out'
            }, '-=0.25')
            .from('.cta-button', {
                y: 20,
                opacity: 0,
                duration: 0.35,
                ease: 'power3.out'
            }, '-=0.2');
        }

        // About page intro animations
        const aboutIntro = document.querySelector('.about-intro');
        if (aboutIntro) {
            const aboutTl = gsap.timeline();
            aboutTl.from('.about-intro h1', {
                y: 40,
                opacity: 0,
                duration: 0.5,
                ease: 'power3.out'
            })
            .from('.about-intro p', {
                y: 30,
                opacity: 0,
                duration: 0.4,
                stagger: 0.1,
                ease: 'power3.out'
            }, '-=0.25');
        }

        // Projects page intro animations
        const projectsIntro = document.querySelector('.projects-intro');
        if (projectsIntro) {
            const projectsTl = gsap.timeline();
            projectsTl.from('.projects-intro h1', {
                y: 40,
                opacity: 0,
                duration: 0.5,
                ease: 'power3.out'
            })
            .from('.projects-intro p', {
                y: 30,
                opacity: 0,
                duration: 0.4,
                ease: 'power3.out'
            }, '-=0.25');
        }

        // Section title animations
        gsap.utils.toArray('.section-title').forEach(title => {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: title,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                y: 40,
                opacity: 0,
                duration: 0.6,
                ease: 'power3.out'
            });
        });

        // Cascade card entrance animation
        const projectCards = document.querySelectorAll('.project-card');
        if (projectCards.length > 0) {
            // Get all cards in view on page load
            const cardsInView = [];
            const cardsOutOfView = [];

            projectCards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const isInView = rect.top < window.innerHeight;

                if (isInView) {
                    cardsInView.push({ card, index });
                } else {
                    cardsOutOfView.push({ card, index });
                }
            });

            // Animate cards in view - cascade up, left to right timing
            gsap.fromTo(cardsInView.map(c => c.card),
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    stagger: 0.15,
                    ease: 'power3.out',
                    clearProps: 'transform'
                }
            );

            // Scroll trigger for cards out of view - cascade up, left to right timing
            if (cardsOutOfView.length > 0) {
                const outOfViewCards = cardsOutOfView.map(c => c.card);
                gsap.set(outOfViewCards, { y: 100, opacity: 0 });

                ScrollTrigger.batch(outOfViewCards, {
                    start: 'top 85%',
                    onEnter: batch => {
                        gsap.to(batch, {
                            y: 0,
                            opacity: 1,
                            duration: 0.7,
                            stagger: 0.15,
                            ease: 'power3.out',
                            clearProps: 'transform'
                        });
                    },
                    once: true
                });
            }
        }

        // Skills list cascade animation (about page)
        const skillItems = document.querySelectorAll('.skills-list li');
        if (skillItems.length > 0) {
            gsap.from(skillItems, {
                scrollTrigger: {
                    trigger: '.skills-list',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                y: 30,
                opacity: 0,
                scale: 0.9,
                duration: 0.5,
                stagger: {
                    amount: 0.6,
                    grid: 'auto',
                    from: 'start'
                },
                ease: 'power2.out'
            });
        }

        // Footer animation
        const footer = document.querySelector('.site-footer');
        if (footer) {
            gsap.from(footer, {
                scrollTrigger: {
                    trigger: footer,
                    start: 'top 95%',
                    toggleActions: 'play none none none'
                },
                y: 30,
                opacity: 0,
                duration: 0.6,
                ease: 'power2.out'
            });
        }

        // Header subtle animation on page load
        gsap.from('.site-header', {
            y: -15,
            opacity: 0,
            duration: 0.35,
            ease: 'power2.out'
        });

        // Navigation links stagger
        gsap.from('.nav__link', {
            y: -8,
            opacity: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: 'power2.out'
        });
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAnimations);
    } else {
        initAnimations();
    }
})();
