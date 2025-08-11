// Convex AI Sales Automation - Futuristic Landing Page JavaScript
class ConvexLandingPage {
    constructor() {
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupAllFeatures();
            });
        } else {
            this.setupAllFeatures();
        }
    }

    setupAllFeatures() {
        this.setupNavigation();
        this.setupEmailForms();
        this.setupFAQ();
        this.setupScrollAnimations();
        this.setupPricingButtons();
        this.setupHoverEffects();
        this.setupParticleEffect();
        this.setupScrollToTop();
        
        console.log('🚀 Convex Landing Page initialized with futuristic green theme');
    }

    setupNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navbar = document.getElementById('navbar');
        
        // Mobile navigation toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                this.animateHamburger(navToggle, navMenu.classList.contains('active'));
            });
        }

        // Smooth scroll for navigation links - Fixed
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                
                if (href && href !== '#') {
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - 100;
                        
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                        
                        // Close mobile menu if open
                        if (navMenu && navMenu.classList.contains('active')) {
                            navMenu.classList.remove('active');
                            this.animateHamburger(navToggle, false);
                        }
                    }
                }
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', this.debounce(() => {
            if (navbar) {
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
        }, 10));

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu && navMenu.classList.contains('active')) {
                if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    navMenu.classList.remove('active');
                    this.animateHamburger(navToggle, false);
                }
            }
        });

        // Nav CTA buttons - Fixed
        const navCtaButtons = document.querySelectorAll('.nav-menu .btn--primary');
        navCtaButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showToast('🚀 Welcome to Convex! Your free trial is starting now.', 'success');
            });
        });
    }

    animateHamburger(toggle, isActive) {
        const hamburgers = toggle.querySelectorAll('.hamburger');
        hamburgers.forEach((line, index) => {
            if (isActive) {
                if (index === 0) line.style.transform = 'rotate(45deg) translate(8px, 8px)';
                if (index === 1) line.style.opacity = '0';
                if (index === 2) line.style.transform = 'rotate(-45deg) translate(8px, -8px)';
            } else {
                line.style.transform = 'none';
                line.style.opacity = '1';
            }
        });
    }

    setupEmailForms() {
        // Hero email form - Fixed
        const heroForm = document.getElementById('email-form');
        const emailInput = document.getElementById('hero-email');
        
        if (heroForm && emailInput) {
            // Ensure email input works properly
            emailInput.style.background = 'transparent';
            emailInput.style.border = 'none';
            emailInput.style.outline = 'none';
            emailInput.style.color = 'var(--pure-white)';
            emailInput.style.fontSize = '1rem';
            emailInput.style.padding = '16px';
            emailInput.style.width = '100%';
            
            // Add focus styles
            emailInput.addEventListener('focus', () => {
                emailInput.style.boxShadow = '0 0 20px var(--green-glow)';
                emailInput.parentElement.style.borderColor = 'var(--neon-green)';
            });
            
            emailInput.addEventListener('blur', () => {
                emailInput.style.boxShadow = 'none';
                emailInput.parentElement.style.borderColor = 'var(--glass-border)';
            });
            
            heroForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const email = emailInput.value.trim();
                
                if (this.validateEmail(email)) {
                    this.showToast('🎉 Thank you! Check your email for next steps to start your free trial.', 'success');
                    emailInput.value = '';
                    
                    // Success animation
                    emailInput.style.borderColor = 'var(--neon-green)';
                    emailInput.style.boxShadow = '0 0 20px var(--green-glow)';
                    
                    setTimeout(() => {
                        emailInput.style.borderColor = '';
                        emailInput.style.boxShadow = '';
                    }, 2000);
                } else {
                    this.showToast('Please enter a valid email address.', 'error');
                    
                    // Error animation
                    emailInput.style.borderColor = '#ff4444';
                    emailInput.style.animation = 'shake 0.5s ease-in-out';
                    
                    setTimeout(() => {
                        emailInput.style.borderColor = '';
                        emailInput.style.animation = '';
                    }, 1000);
                }
            });
        }

        // Final CTA button - Fixed
        const finalCta = document.getElementById('final-cta-btn');
        if (finalCta) {
            finalCta.addEventListener('click', (e) => {
                e.preventDefault();
                this.showToast('🎉 Welcome aboard! Your free trial is starting now.', 'success');
                
                // Add button success animation
                const originalText = finalCta.textContent;
                finalCta.textContent = 'Activated! ✨';
                finalCta.style.transform = 'scale(1.05)';
                
                setTimeout(() => {
                    finalCta.textContent = originalText;
                    finalCta.style.transform = 'scale(1)';
                }, 2000);
            });
        }
    }

    setupPricingButtons() {
        // Fixed pricing buttons
        const pricingButtons = document.querySelectorAll('.pricing-card .btn');
        
        pricingButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                const isContactSales = btn.textContent.includes('Contact Sales');
                const isGetStarted = btn.textContent.includes('Start Free Trial');
                
                if (isContactSales) {
                    this.showToast('📞 Sales team contacted! Expect a call within 24 hours.', 'success');
                    this.addButtonSuccessAnimation(btn, 'Contacted! 📞');
                } else if (isGetStarted) {
                    this.showToast('🚀 Welcome to Convex! Check your email for next steps.', 'success');
                    this.addButtonSuccessAnimation(btn, 'Welcome! 🚀');
                }
            });
        });
    }

    setupFAQ() {
        // Fixed FAQ functionality
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const icon = item.querySelector('.faq-icon');
            
            if (question && answer && icon) {
                question.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    const isActive = item.classList.contains('active');
                    
                    // Close all other FAQ items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                            const otherAnswer = otherItem.querySelector('.faq-answer');
                            const otherIcon = otherItem.querySelector('.faq-icon');
                            if (otherAnswer) {
                                otherAnswer.style.maxHeight = '0';
                            }
                            if (otherIcon) {
                                otherIcon.style.transform = 'rotate(0deg)';
                            }
                        }
                    });
                    
                    // Toggle current item
                    if (isActive) {
                        // Close current item
                        item.classList.remove('active');
                        answer.style.maxHeight = '0';
                        icon.style.transform = 'rotate(0deg)';
                        question.setAttribute('aria-expanded', 'false');
                    } else {
                        // Open current item
                        item.classList.add('active');
                        answer.style.maxHeight = answer.scrollHeight + 20 + 'px'; // Add extra space
                        icon.style.transform = 'rotate(45deg)';
                        question.setAttribute('aria-expanded', 'true');
                        
                        // Add glow effect when opening
                        item.style.boxShadow = '0 8px 32px var(--green-glow)';
                        item.style.borderColor = 'var(--neon-green)';
                        
                        setTimeout(() => {
                            item.style.boxShadow = '';
                            item.style.borderColor = '';
                        }, 1000);
                    }
                });
            }
        });
    }

    setupScrollAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Add animation classes to sections and elements
        const animateElements = document.querySelectorAll(`
            section:not(.hero),
            .feature-card,
            .step-card,
            .testimonial-card,
            .pricing-card,
            .stat-card
        `);

        animateElements.forEach((element, index) => {
            element.classList.add('animate-on-scroll');
            element.style.animationDelay = `${index * 0.1}s`;
            observer.observe(element);
        });

        // Hero parallax effect
        const hero = document.querySelector('.hero');
        const heroCard = document.querySelector('.hero-card');
        
        if (hero && heroCard) {
            window.addEventListener('scroll', this.debounce(() => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                
                if (scrolled <= window.innerHeight) {
                    hero.style.transform = `translateY(${rate}px)`;
                    heroCard.style.transform = `translateY(${scrolled * 0.1}px)`;
                }
            }, 10));
        }
    }

    setupHoverEffects() {
        // Feature cards hover effects
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.background = 'rgba(0, 255, 135, 0.1)';
                card.style.transform = 'translateY(-8px) scale(1.02)';
                
                const icon = card.querySelector('.feature-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.2)';
                    icon.style.filter = 'drop-shadow(0 0 20px var(--green-glow))';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.background = 'var(--glass-bg)';
                card.style.transform = 'translateY(0) scale(1)';
                
                const icon = card.querySelector('.feature-icon');
                if (icon) {
                    icon.style.transform = 'scale(1)';
                    icon.style.filter = 'drop-shadow(0 0 10px var(--green-glow))';
                }
            });
        });

        // Testimonial cards floating effect
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        testimonialCards.forEach((card, index) => {
            card.classList.add('floating');
            card.style.animationDelay = `${index * 0.5}s`;
        });

        // Button hover enhancements
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                if (btn.classList.contains('btn--primary')) {
                    btn.style.boxShadow = '0 12px 40px var(--green-glow)';
                    btn.style.transform = 'translateY(-3px) scale(1.02)';
                }
            });
            
            btn.addEventListener('mouseleave', () => {
                if (btn.classList.contains('btn--primary')) {
                    btn.style.boxShadow = '0 8px 32px var(--green-glow)';
                    btn.style.transform = 'translateY(0) scale(1)';
                }
            });
        });
    }

    setupParticleEffect() {
        // Create subtle floating particles
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            overflow: hidden;
        `;
        
        document.body.appendChild(particlesContainer);

        // Create particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: var(--neon-green);
                border-radius: 50%;
                opacity: ${Math.random() * 0.3 + 0.1};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                box-shadow: 0 0 10px var(--green-glow);
                animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
            `;
            
            particlesContainer.appendChild(particle);
        }

        // Add particle animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float-particle {
                0% { transform: translateY(100vh) translateX(0px); opacity: 0; }
                10% { opacity: 0.3; }
                90% { opacity: 0.1; }
                100% { transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px); opacity: 0; }
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-5px); }
                75% { transform: translateX(5px); }
            }
        `;
        document.head.appendChild(style);
    }

    setupScrollToTop() {
        const scrollButton = document.createElement('button');
        scrollButton.innerHTML = '↑';
        scrollButton.className = 'scroll-to-top';
        scrollButton.setAttribute('aria-label', 'Scroll to top');
        
        // Style the scroll to top button
        scrollButton.style.cssText = `
            position: fixed;
            bottom: 32px;
            right: 32px;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: var(--gradient-primary);
            color: var(--jet-black);
            border: none;
            cursor: pointer;
            font-size: 24px;
            font-weight: 800;
            box-shadow: 0 8px 32px var(--green-glow);
            transform: translateY(100px);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1000;
            backdrop-filter: blur(10px);
            border: 2px solid var(--neon-green);
        `;

        document.body.appendChild(scrollButton);

        // Show/hide based on scroll position
        window.addEventListener('scroll', this.debounce(() => {
            if (window.pageYOffset > 500) {
                scrollButton.style.transform = 'translateY(0) scale(1)';
            } else {
                scrollButton.style.transform = 'translateY(100px) scale(0.8)';
            }
        }, 100));

        // Scroll to top functionality
        scrollButton.addEventListener('click', () => {
            // Add click animation
            scrollButton.style.transform = 'translateY(0) scale(0.9)';
            setTimeout(() => {
                scrollButton.style.transform = 'translateY(0) scale(1)';
            }, 150);
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Hover effects
        scrollButton.addEventListener('mouseenter', () => {
            scrollButton.style.transform = window.pageYOffset > 500 ? 
                'translateY(-4px) scale(1.1)' : 'translateY(96px) scale(0.9)';
            scrollButton.style.boxShadow = '0 12px 40px var(--green-glow)';
        });

        scrollButton.addEventListener('mouseleave', () => {
            scrollButton.style.transform = window.pageYOffset > 500 ? 
                'translateY(0) scale(1)' : 'translateY(100px) scale(0.8)';
            scrollButton.style.boxShadow = '0 8px 32px var(--green-glow)';
        });
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showToast(message, type = 'success') {
        // Remove existing toast
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = message;

        // Toast styles based on type
        const styles = {
            success: {
                background: 'linear-gradient(135deg, var(--neon-green), var(--electric-lime))',
                color: 'var(--jet-black)',
                boxShadow: '0 12px 40px var(--green-glow)',
                border: '1px solid var(--neon-green)'
            },
            error: {
                background: 'linear-gradient(135deg, #ff4444, #cc0000)',
                color: 'white',
                boxShadow: '0 12px 40px rgba(255, 68, 68, 0.4)',
                border: '1px solid #ff4444'
            }
        };

        const toastStyle = styles[type] || styles.success;
        
        toast.style.cssText = `
            position: fixed;
            top: 120px;
            right: 32px;
            background: ${toastStyle.background};
            color: ${toastStyle.color};
            padding: 20px 32px;
            border-radius: 16px;
            box-shadow: ${toastStyle.boxShadow};
            border: ${toastStyle.border};
            z-index: 10000;
            transform: translateX(400px);
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            font-size: 16px;
            font-weight: 700;
            max-width: 400px;
            word-wrap: break-word;
            backdrop-filter: blur(20px);
            cursor: pointer;
        `;

        document.body.appendChild(toast);

        // Animate in
        requestAnimationFrame(() => {
            toast.style.transform = 'translateX(0)';
        });

        // Click to dismiss
        toast.addEventListener('click', () => {
            this.dismissToast(toast);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            this.dismissToast(toast);
        }, 5000);
    }

    dismissToast(toast) {
        if (document.body.contains(toast)) {
            toast.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (document.body.contains(toast)) {
                    document.body.removeChild(toast);
                }
            }, 400);
        }
    }

    addButtonSuccessAnimation(button, successText) {
        const originalText = button.textContent;
        const originalBg = button.style.background;
        
        button.textContent = successText;
        button.style.background = 'var(--gradient-primary)';
        button.style.transform = 'scale(1.05)';
        button.style.boxShadow = '0 15px 50px var(--green-glow)';
        button.disabled = true;
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = originalBg;
            button.style.transform = 'scale(1)';
            button.style.boxShadow = '';
            button.disabled = false;
        }, 2000);
    }

    // Utility function for debouncing
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize the landing page immediately
const convexLanding = new ConvexLandingPage();

// Additional event listeners for immediate setup
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎉 Convex landing page DOM loaded - setting up enhanced features');
    
    // Ensure all interactive elements are working
    setTimeout(() => {
        // Add typing effect to hero title
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            heroTitle.style.opacity = '1';
            heroTitle.style.animation = 'fadeInUp 1.5s ease-out';
        }

        // Stagger feature card animations
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
        });

        // Add glow to pricing featured card
        const featuredCard = document.querySelector('.pricing-card.featured');
        if (featuredCard) {
            featuredCard.style.animation = 'pulse 3s ease-in-out infinite';
        }

    }, 500);
});

// Keyboard navigation improvements
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            convexLanding.animateHamburger(navToggle, false);
        }
        
        // Close any open FAQ items
        const activeFAQ = document.querySelector('.faq-item.active');
        if (activeFAQ) {
            const question = activeFAQ.querySelector('.faq-question');
            if (question) question.click();
        }
    }
});

// Add loading state management
window.addEventListener('load', () => {
    // Add loaded class to body for any load-dependent animations
    document.body.classList.add('loaded');
    
    console.log('🎉 Convex landing page fully loaded with all interactive features!');
});