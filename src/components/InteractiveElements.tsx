'use client';

import { useEffect } from 'react';

const InteractiveElements = () => {
  useEffect(() => {
    // Email form validation
    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    // Show toast notification
    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
      const existingToast = document.querySelector('.toast');
      if (existingToast) existingToast.remove();

      const toast = document.createElement('div');
      toast.className = 'toast';
      toast.innerHTML = message;

      const styles = {
        success: {
          background: 'var(--gradient-primary)',
          color: 'var(--pure-white)',
          boxShadow: '0 12px 40px var(--green-glow)',
          border: '1px solid var(--color-primary)'
        },
        error: {
          background: 'linear-gradient(135deg, #ff4444, #cc0000)',
          color: 'white',
          boxShadow: '0 12px 40px rgba(255, 68, 68, 0.4)',
          border: '1px solid #ff4444'
        }
      };

      const toastStyle = styles[type];
      
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

      requestAnimationFrame(() => {
        toast.style.transform = 'translateX(0)';
      });

      const dismissToast = () => {
        if (document.body.contains(toast)) {
          toast.style.transform = 'translateX(400px)';
          setTimeout(() => {
            if (document.body.contains(toast)) {
              document.body.removeChild(toast);
            }
          }, 400);
        }
      };

      toast.addEventListener('click', dismissToast);
      setTimeout(dismissToast, 5000);
    };

    // Setup email form
    const setupEmailForms = () => {
      const heroForm = document.getElementById('email-form');
      const emailInput = document.getElementById('hero-email') as HTMLInputElement;
      
      if (heroForm && emailInput) {
        heroForm.addEventListener('submit', (e) => {
          e.preventDefault();
          
          const email = emailInput.value.trim();
          
          if (validateEmail(email)) {
            showToast('🎉 Thank you! Check your email for next steps to start your free trial.', 'success');
            emailInput.value = '';
          } else {
            showToast('Please enter a valid email address.', 'error');
            emailInput.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
              emailInput.style.animation = '';
            }, 1000);
          }
        });
      }

      // Final CTA button
      const finalCta = document.getElementById('final-cta-btn');
      if (finalCta) {
        finalCta.addEventListener('click', (e) => {
          e.preventDefault();
          showToast('🎉 Welcome aboard! Your free trial is starting now.', 'success');
          
          const originalText = finalCta.textContent;
          finalCta.textContent = 'Activated! ✨';
          finalCta.style.transform = 'scale(1.05)';
          
          setTimeout(() => {
            finalCta.textContent = originalText || '';
            finalCta.style.transform = 'scale(1)';
          }, 2000);
        });
      }
    };

    // Setup pricing buttons
    const setupPricingButtons = () => {
      const pricingButtons = document.querySelectorAll('.pricing-card .btn');
      
      pricingButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          
          const isContactSales = btn.textContent?.includes('Contact Sales');
          const isGetStarted = btn.textContent?.includes('Start Free Trial');
          
          if (isContactSales) {
            showToast('📞 Sales team contacted! Expect a call within 24 hours.', 'success');
          } else if (isGetStarted) {
            showToast('🚀 Welcome to Convex! Check your email for next steps.', 'success');
          }
        });
      });
    };

    // Setup FAQ
    const setupFAQ = () => {
      const faqItems = document.querySelectorAll('.faq-item');
      
      faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer') as HTMLElement;
        const icon = item.querySelector('.faq-icon') as HTMLElement;
        
        if (question && answer && icon) {
          question.addEventListener('click', (e) => {
            e.preventDefault();
            
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
              if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
                const otherAnswer = otherItem.querySelector('.faq-answer') as HTMLElement;
                const otherIcon = otherItem.querySelector('.faq-icon') as HTMLElement;
                if (otherAnswer) otherAnswer.style.maxHeight = '0';
                if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
              }
            });
            
            // Toggle current item
            if (isActive) {
              item.classList.remove('active');
              answer.style.maxHeight = '0';
              icon.style.transform = 'rotate(0deg)';
              question.setAttribute('aria-expanded', 'false');
            } else {
              item.classList.add('active');
              answer.style.maxHeight = answer.scrollHeight + 20 + 'px';
              icon.style.transform = 'rotate(45deg)';
              question.setAttribute('aria-expanded', 'true');
            }
          });
        }
      });
    };

    // Setup mobile navigation
    const setupNavigation = () => {
      const navToggle = document.getElementById('nav-toggle');
      const navMenuLinks = document.getElementById('nav-menu-links');
      const navbar = document.getElementById('navbar');
      
      const animateHamburger = (toggle: HTMLElement, isActive: boolean) => {
        const hamburgers = toggle.querySelectorAll('.hamburger') as NodeListOf<HTMLElement>;
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
      };

      // Mobile navigation toggle
      if (navToggle && navMenuLinks) {
        navToggle.addEventListener('click', () => {
          navMenuLinks.classList.toggle('active');
          animateHamburger(navToggle, navMenuLinks.classList.contains('active'));
        });
      }

      // Smooth scroll for navigation links
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
              if (navMenuLinks && navMenuLinks.classList.contains('active')) {
                navMenuLinks.classList.remove('active');
                if (navToggle) animateHamburger(navToggle, false);
              }
            }
          }
        });
      });

      // Navbar scroll effect
      const handleScroll = () => {
        if (navbar) {
          if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
          } else {
            navbar.classList.remove('scrolled');
          }
        }
      };

      window.addEventListener('scroll', handleScroll);

      // Close mobile menu when clicking outside
      document.addEventListener('click', (e) => {
        if (navMenuLinks && navMenuLinks.classList.contains('active')) {
          if (navToggle && !navToggle.contains(e.target as Node) && !navMenuLinks.contains(e.target as Node)) {
            navMenuLinks.classList.remove('active');
            animateHamburger(navToggle, false);
          }
        }
      });

      // Nav CTA buttons
      const navCtaButtons = document.querySelectorAll('.nav-menu .btn--primary');
      navCtaButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          showToast('🚀 Welcome to Convex! Your free trial is starting now.', 'success');
        });
      });
    };

    // Setup scroll animations
    const setupScrollAnimations = () => {
      if (!window.IntersectionObserver) return;
      
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
        (element as HTMLElement).style.animationDelay = `${index * 0.1}s`;
        observer.observe(element);
      });
    };

    // Setup scroll to top button
    const setupScrollToTop = () => {
      const scrollButton = document.createElement('button');
      scrollButton.innerHTML = '↑';
      scrollButton.className = 'scroll-to-top';
      scrollButton.setAttribute('aria-label', 'Scroll to top');
      
      scrollButton.style.cssText = `
        position: fixed;
        bottom: 32px;
        right: 32px;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: var(--gradient-primary);
        color: var(--pure-white);
        border: none;
        cursor: pointer;
        font-size: 24px;
        font-weight: 800;
        box-shadow: 0 8px 32px var(--green-glow);
        transform: translateY(100px);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 1000;
        backdrop-filter: blur(10px);
        border: 2px solid var(--color-primary);
      `;

      document.body.appendChild(scrollButton);

      const handleScroll = () => {
        if (window.pageYOffset > 500) {
          scrollButton.style.transform = 'translateY(0) scale(1)';
        } else {
          scrollButton.style.transform = 'translateY(100px) scale(0.8)';
        }
      };

      window.addEventListener('scroll', handleScroll);

      scrollButton.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    };

    // Initialize all interactive elements
    setupEmailForms();
    setupPricingButtons();
    setupFAQ();
    setupNavigation();
    setupScrollAnimations();
    setupScrollToTop();

    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const navMenuLinks = document.getElementById('nav-menu-links');
        const navToggle = document.getElementById('nav-toggle');
        if (navMenuLinks && navMenuLinks.classList.contains('active')) {
          navMenuLinks.classList.remove('active');
        }
        
        const activeFAQ = document.querySelector('.faq-item.active');
        if (activeFAQ) {
          const question = activeFAQ.querySelector('.faq-question') as HTMLElement;
          if (question) question.click();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null;
};

export default InteractiveElements;
