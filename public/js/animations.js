// Advanced animations for Yuki Sunaga Windsurfing Site
// Ocean-themed animations and interactive effects

document.addEventListener('DOMContentLoaded', function() {
    initOceanAnimations();
    initTextAnimations();
    initHoverEffects();
    initScrollBasedAnimations();
});

// Ocean-themed animations
function initOceanAnimations() {
    // Wave animation for decorative elements
    createWaveAnimations();

    // Water ripple effects
    initRippleEffects();

    // Floating animation for profile images
    initFloatingElements();

    // Wind effect for text elements
    initWindEffects();

    // Value cards special animations
    initValueCardAnimations();
}

// Create wave animations
function createWaveAnimations() {
    // Add wave decorations to sections
    const waveElements = document.querySelectorAll('.section-header');

    waveElements.forEach((element, index) => {
        const wave = document.createElement('div');
        wave.className = 'wave-decoration';
        wave.innerHTML = `
            <svg viewBox="0 0 200 20" class="wave-svg">
                <path d="M0,10 Q50,0 100,10 T200,10 L200,20 L0,20 Z" fill="currentColor" opacity="0.1">
                    <animate attributeName="d"
                        values="M0,10 Q50,0 100,10 T200,10 L200,20 L0,20 Z;
                                M0,10 Q50,20 100,10 T200,10 L200,20 L0,20 Z;
                                M0,10 Q50,0 100,10 T200,10 L200,20 L0,20 Z"
                        dur="${3 + index * 0.5}s"
                        repeatCount="indefinite"/>
                </path>
            </svg>
        `;

        // Style the wave decoration
        wave.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 20px;
            color: var(--ocean-blue-light);
            pointer-events: none;
            z-index: -1;
        `;

        // Make section-header relative for wave positioning
        element.style.position = 'relative';
        element.appendChild(wave);
    });

    // Add CSS for wave animations
    const waveStyles = `
        .wave-svg {
            width: 100%;
            height: 100%;
        }

        @keyframes waveFlow {
            0% { transform: translateX(0) scaleY(1); }
            50% { transform: translateX(-20px) scaleY(1.2); }
            100% { transform: translateX(0) scaleY(1); }
        }

        .wave-decoration {
            animation: waveFlow 4s ease-in-out infinite;
        }
    `;

    addStyles('wave-animations', waveStyles);
}

// Ripple effects on click
function initRippleEffects() {
    const rippleElements = document.querySelectorAll('.cta-button, .cta-btn, .nav-link');

    rippleElements.forEach(element => {
        element.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });

    function createRipple(event, element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 600ms linear;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            pointer-events: none;
        `;

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    // Ripple animation CSS
    const rippleStyles = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;

    addStyles('ripple-effects', rippleStyles);
}

// Floating elements animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.profile-image, .hero-credentials .credential, .value-card');

    floatingElements.forEach((element, index) => {
        const delay = index * 0.3;
        const duration = 4 + (index * 0.2);

        // Add subtle floating animation for value cards
        if (element.classList.contains('value-card')) {
            element.style.animation = `floatGentle ${duration}s ease-in-out ${delay}s infinite alternate`;
        } else {
            element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
        }
    });

    const floatingStyles = `
        @keyframes float {
            from {
                transform: translateY(0px) rotate(0deg);
            }
            to {
                transform: translateY(-10px) rotate(1deg);
            }
        }

        @keyframes floatGentle {
            from {
                transform: translateY(0px);
            }
            to {
                transform: translateY(-6px);
            }
        }

        .value-card {
            transition: transform 0.3s ease;
        }

        .value-card:hover {
            animation-play-state: paused;
            transform: translateY(-8px) scale(1.02);
        }
    `;

    addStyles('floating-elements', floatingStyles);
}

// Wind effects for text elements
function initWindEffects() {
    const windElements = document.querySelectorAll('.hero-title-sub, .section-title');

    windElements.forEach((element, index) => {
        // Add subtle text shadow animation to simulate wind effect
        element.style.animation = `windSway ${4 + index * 0.5}s ease-in-out infinite`;
    });

    const windStyles = `
        @keyframes windSway {
            0%, 100% {
                text-shadow: 2px 2px 4px rgba(0, 102, 204, 0.1);
                transform: translateX(0);
            }
            25% {
                text-shadow: -1px 3px 4px rgba(0, 102, 204, 0.15);
                transform: translateX(1px);
            }
            75% {
                text-shadow: 3px 1px 4px rgba(0, 102, 204, 0.15);
                transform: translateX(-1px);
            }
        }
    `;

    addStyles('wind-effects', windStyles);
}

// Value cards special animations
function initValueCardAnimations() {
    const valueCards = document.querySelectorAll('.value-card');

    // Staggered entrance animation
    const valueObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const valueSection = entry.target.closest('.value');
                if (valueSection) {
                    const cards = valueSection.querySelectorAll('.value-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('value-card-animated');
                        }, index * 150);
                    });
                }
                valueObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    if (valueCards.length > 0) {
        valueObserver.observe(valueCards[0]);
    }

    // Add CSS for value cards animation
    const valueCardStyles = `
        .value-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }

        .value-card-animated {
            opacity: 1;
            transform: translateY(0);
        }

        .value-card.primary {
            transform: translateY(50px) scale(0.95);
            transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .value-card.primary.value-card-animated {
            transform: translateY(0) scale(1);
        }

        .value-card:nth-child(1) { transition-delay: 0s; }
        .value-card:nth-child(2) { transition-delay: 0.1s; }
        .value-card:nth-child(3) { transition-delay: 0.2s; }
        .value-card:nth-child(4) { transition-delay: 0.3s; }

        @media (prefers-reduced-motion: reduce) {
            .value-card {
                opacity: 1;
                transform: none;
                transition: none;
            }
        }
    `;

    addStyles('value-card-animations', valueCardStyles);
}

// Text animations
function initTextAnimations() {
    // Typewriter effect for hero subtitle
    initTypewriter();

    // Text reveal animations
    initTextReveal();

    // Highlighted text effects
    initHighlightedText();
}

// Typewriter effect
function initTypewriter() {
    const typewriterElements = document.querySelectorAll('.hero-description');

    typewriterElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid rgba(255, 255, 255, 0.7)';
        element.style.animation = 'blink 1s infinite';

        let index = 0;
        function typeWriter() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    element.style.borderRight = 'none';
                    element.style.animation = 'none';
                }, 1000);
            }
        }

        // Start typewriter after hero elements are visible
        setTimeout(typeWriter, 2000);
    });

    const typewriterStyles = `
        @keyframes blink {
            0%, 50% { border-color: rgba(255, 255, 255, 0.7); }
            51%, 100% { border-color: transparent; }
        }
    `;

    addStyles('typewriter', typewriterStyles);
}

// Text reveal animations
function initTextReveal() {
    const revealElements = document.querySelectorAll('.timeline-title, .feature-title, .value-title');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('text-revealed');
            }
        });
    }, { threshold: 0.5 });

    revealElements.forEach(element => {
        element.classList.add('text-reveal');
        revealObserver.observe(element);
    });

    const textRevealStyles = `
        .text-reveal {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .text-revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;

    addStyles('text-reveal', textRevealStyles);
}

// Highlighted text effects
function initHighlightedText() {
    const highlightWords = ['オリンピック', '2度', '不屈', '20年', 'ウインドサーフィン'];

    function highlightTextInElements() {
        const textElements = document.querySelectorAll('p, h1, h2, h3, h4, li');

        textElements.forEach(element => {
            let html = element.innerHTML;

            highlightWords.forEach(word => {
                const regex = new RegExp(`(${word})`, 'g');
                html = html.replace(regex, '<span class="highlighted-text">$1</span>');
            });

            element.innerHTML = html;
        });
    }

    highlightTextInElements();

    const highlightStyles = `
        .highlighted-text {
            background: linear-gradient(120deg, rgba(255, 107, 53, 0.1) 0%, rgba(0, 102, 204, 0.1) 100%);
            border-radius: 3px;
            padding: 2px 4px;
            font-weight: 600;
            color: var(--ocean-blue-primary);
            position: relative;
            transition: all 0.3s ease;
        }

        .highlighted-text:hover {
            background: rgba(255, 107, 53, 0.2);
            transform: translateY(-1px);
        }

        .highlighted-text::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, var(--ocean-blue-primary), var(--sunset-orange));
            transform: scaleX(0);
            transition: transform 0.3s ease;
        }

        .highlighted-text:hover::after {
            transform: scaleX(1);
        }
    `;

    addStyles('highlighted-text', highlightStyles);
}

// Hover effects
function initHoverEffects() {
    // Card tilt effects
    initCardTiltEffects();

    // Image zoom effects
    initImageZoomEffects();

    // Button magnetic effects
    initMagneticButtons();
}

// Card tilt effects
function initCardTiltEffects() {
    const tiltCards = document.querySelectorAll('.feature-card, .value-card, .lifestyle-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', handleTilt);
        card.addEventListener('mouseleave', resetTilt);
    });

    function handleTilt(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        const rotateX = (mouseY - centerY) / 10;
        const rotateY = (centerX - mouseX) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        card.style.boxShadow = `${rotateY}px ${rotateX}px 20px rgba(0, 102, 204, 0.2)`;
    }

    function resetTilt(e) {
        const card = e.currentTarget;
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        card.style.boxShadow = 'var(--shadow-soft)';
    }
}

// Image zoom effects
function initImageZoomEffects() {
    const zoomImages = document.querySelectorAll('.gallery-image, .profile-image');

    zoomImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.5s ease';
        });

        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Magnetic button effects
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.cta-button, .cta-btn');

    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0px, 0px)';
        });
    });
}

// Scroll-based animations
function initScrollBasedAnimations() {
    // Progress bars for achievements
    initProgressBars();

    // Parallax elements
    initParallaxElements();

    // Scroll-triggered counters
    initScrollCounters();

    // Section transitions
    initSectionTransitions();
}

// Progress bars for achievements
function initProgressBars() {
    const progressElements = document.querySelectorAll('.timeline-item');

    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.setProperty('--progress', '100%');
            }
        });
    }, { threshold: 0.5 });

    progressElements.forEach(element => {
        progressObserver.observe(element);
    });

    const progressStyles = `
        .timeline-item {
            --progress: 0%;
        }

        .timeline-item::before {
            transition: all 1s ease 0.5s;
        }

        .timeline-item[style*="--progress: 100%"]::before {
            box-shadow: 0 0 20px var(--ocean-blue-primary);
        }
    `;

    addStyles('progress-bars', progressStyles);
}

// Parallax elements
function initParallaxElements() {
    const parallaxElements = document.querySelectorAll('.profile-image-decoration, .value-card');

    function updateParallax() {
        const scrollTop = window.pageYOffset;

        parallaxElements.forEach((element, index) => {
            const rect = element.getBoundingClientRect();
            const speed = 0.1 + (index * 0.05);

            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const yPos = -(scrollTop * speed);
                element.style.transform = `translateY(${yPos}px)`;
            }
        });
    }

    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', () => {
        requestTick();
        ticking = false;
    });
}

// Enhanced scroll counters
function initScrollCounters() {
    const counterElements = document.querySelectorAll('.stat-number, .highlight-number');

    counterElements.forEach(counter => {
        const finalValue = counter.textContent;
        counter.setAttribute('data-final', finalValue);
        counter.textContent = '0';

        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.7 });

        counterObserver.observe(counter);
    });

    function animateCounter(element) {
        const finalValue = element.getAttribute('data-final');
        const numericValue = parseInt(finalValue.replace(/\D/g, ''));
        const suffix = finalValue.replace(/[\d]/g, '');
        const duration = 2000;
        const step = numericValue / (duration / 16);

        let current = 0;

        function updateCounter() {
            current += step;

            if (current >= numericValue) {
                element.textContent = finalValue;
            } else {
                element.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
            }
        }

        updateCounter();
    }
}

// Section transitions
function initSectionTransitions() {
    const sections = document.querySelectorAll('section');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');

                // Add staggered animations to child elements
                const childElements = entry.target.querySelectorAll('.animate-on-scroll');
                childElements.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animated');
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });

    const sectionTransitionStyles = `
        .section-hidden {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 1s ease, transform 1s ease;
        }

        .section-visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;

    addStyles('section-transitions', sectionTransitionStyles);
}

// Utility function to add styles
function addStyles(id, styles) {
    if (!document.getElementById(id)) {
        const styleSheet = document.createElement('style');
        styleSheet.id = id;
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
}

// Performance optimization for animations
function optimizeAnimations() {
    // Disable animations for users who prefer reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }

    // Use Intersection Observer for performance
    if (!('IntersectionObserver' in window)) {
        // Fallback for browsers without Intersection Observer
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        animateElements.forEach(el => {
            el.classList.add('animated');
        });
    }
}

// Initialize performance optimizations
optimizeAnimations();

// Easter egg: Konami Code for special ocean animation
(function() {
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;

    document.addEventListener('keydown', function(e) {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                triggerOceanEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function triggerOceanEasterEgg() {
        // Create special ocean wave animation across the screen
        const waves = document.createElement('div');
        waves.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            z-index: 9999;
            background: linear-gradient(45deg,
                rgba(0, 102, 204, 0.1) 0%,
                rgba(77, 148, 255, 0.1) 50%,
                rgba(0, 102, 204, 0.1) 100%);
            animation: oceanWave 3s ease-in-out;
        `;

        document.body.appendChild(waves);

        setTimeout(() => {
            if (document.body.contains(waves)) {
                document.body.removeChild(waves);
            }
        }, 3000);

        // Add special wave animation
        const waveAnimation = `
            @keyframes oceanWave {
                0% {
                    opacity: 0;
                    transform: translateY(100vh) scale(0);
                }
                50% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-100vh) scale(0);
                }
            }
        `;

        addStyles('ocean-easter-egg', waveAnimation);

        // Show congratulatory message
        const message = document.createElement('div');
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 102, 204, 0.95);
            color: white;
            padding: 2rem;
            border-radius: 15px;
            text-align: center;
            z-index: 10000;
            font-size: 1.2rem;
            font-weight: 600;
            animation: fadeInOut 3s ease-in-out;
        `;

        message.innerHTML = `
            <h3>🌊 海の秘密を発見しました！ 🌊</h3>
            <p>須長由季選手への特別なオマージュです</p>
        `;

        document.body.appendChild(message);

        setTimeout(() => {
            if (document.body.contains(message)) {
                document.body.removeChild(message);
            }
        }, 3000);

        const fadeAnimation = `
            @keyframes fadeInOut {
                0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                20%, 80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            }
        `;

        addStyles('fade-in-out', fadeAnimation);
    }
})();