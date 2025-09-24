document.addEventListener('DOMContentLoaded', function() {
    // Preloader logic
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        const preloaderText = preloader.querySelector('.preloader-text');
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&@$*<>";
        let interval = null;

        if (preloaderText) {
            const originalText = preloaderText.dataset.text;

            const startPreloaderAnimation = () => {
                let iteration = 0;
                clearInterval(interval);

                interval = setInterval(() => {
                    preloaderText.innerText = originalText.split("")
                        .map((letter, index) => {
                            if(index < iteration) {
                                return originalText[index];
                            }
                            return letters[Math.floor(Math.random() * letters.length)];
                        })
                        .join("");
                    
                    if(iteration >= originalText.length){ 
                        clearInterval(interval);
                    }
                    
                    iteration += 1 / 3;
                }, 40);
            };
            
            startPreloaderAnimation();
        }

        window.addEventListener('load', () => {
            // Ensure the animation has time to be appreciated
            setTimeout(() => {
                preloader.classList.add('loaded');
                setTimeout(() => {
                    if (preloader) {
                        preloader.style.display = 'none';
                    }
                }, 900); // Match fade-out animation
            }, 2500); // Minimum total preloader time
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');
    
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navList.classList.toggle('active');
        
        // Toggle body overflow when menu is open
        if (navList.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navList.classList.contains('active')) {
                navToggle.classList.remove('active');
                navList.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // Scroll reveal animations
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about-image, .about-content, .service-card, .portfolio-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };

    // Run once on load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Smooth scrolling for anchor links
    function smoothScrollTo(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const ease = (t, b, c, d) => {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            };
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        requestAnimationFrame(animation);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                smoothScrollTo(targetPosition, 800);
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('form-contacto');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            // For this example, we'll just show an alert
            alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
            
            // Reset the form
            this.reset();
            
            // Reset labels position
            const labels = this.querySelectorAll('label');
            labels.forEach(label => {
                label.style.top = '1rem';
                label.style.left = '1rem';
                label.style.fontSize = '';
            });
        });
    }

    // Testimonials slider navigation
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    if (testimonialsSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        testimonialsSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - testimonialsSlider.offsetLeft;
            scrollLeft = testimonialsSlider.scrollLeft;
        });
        
        testimonialsSlider.addEventListener('mouseleave', () => {
            isDown = false;
        });
        
        testimonialsSlider.addEventListener('mouseup', () => {
            isDown = false;
        });
        
        testimonialsSlider.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialsSlider.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialsSlider.scrollLeft = scrollLeft - walk;
        });
    }

    // Parallax effect for hero background
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            heroBg.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
        });
    }

    // Floating particles animation
    const particles = document.querySelectorAll('.particle');
    particles.forEach(particle => {
        // Randomize initial position
        const randomX = Math.random() * 100;
        const randomY = Math.random() * 100;
        particle.style.left = `${randomX}%`;
        particle.style.top = `${randomY}%`;
        
        // Randomize animation duration
        const duration = 15 + Math.random() * 15;
        particle.style.animationDuration = `${duration}s`;
        
        // Randomize animation delay
        const delay = Math.random() * 5;
        particle.style.animationDelay = `${delay}s`;
    });

    // Neon hover effects for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.neon-icon');
            icon.style.animation = 'neon-icon-pulse 1.5s infinite alternate';
        });
        
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.neon-icon');
            icon.style.animation = '';
        });
    });

    // Dynamic glow effect for neon elements
    const neonElements = document.querySelectorAll('.neon-text, .neon-icon, .btn-neon');
    neonElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.filter = 'brightness(1.2)';
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.filter = '';
        });
    });

    // Lógica para el filtro del portfolio
    const filtersContainer = document.querySelector('.portfolio-filters');
    if (filtersContainer) {
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filtersContainer.addEventListener('click', function(e) {
            if (e.target.classList.contains('filter-btn')) {
                // Cambiar el botón activo
                filtersContainer.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');

                const filterValue = e.target.getAttribute('data-filter');

                // Mostrar u ocultar items
                portfolioItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    // Si el filtro es 'all' o la categoría coincide, muéstralo. Si no, ocúltalo.
                    if (filterValue === 'all' || filterValue === itemCategory) {
                        item.classList.remove('hide');
                    } else {
                        item.classList.add('hide');
                    }
                });
            }
        });
    }

    // --- Cookie Consent Logic ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept-btn');

    if (cookieBanner && acceptBtn) { // Make sure elements exist
        // Check if user has already accepted cookies
        if (!localStorage.getItem('cookies_accepted')) {
            // If not, show the banner after a short delay
            setTimeout(() => {
                cookieBanner.classList.add('show');
            }, 2000); // Wait 2 seconds before showing
        }

        acceptBtn.addEventListener('click', function() {
            // Hide the banner
            cookieBanner.classList.remove('show');
            
            // Set a value in localStorage to remember the choice
            localStorage.setItem('cookies_accepted', 'true');

            // Optional: Add a transitionend listener to set display:none after animation
            cookieBanner.addEventListener('transitionend', () => {
                if (!cookieBanner.classList.contains('show')) {
                    cookieBanner.style.display = 'none';
                }
            }, { once: true });
        });
    }
});