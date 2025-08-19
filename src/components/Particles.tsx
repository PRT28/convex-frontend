'use client'

import { useEffect } from "react";
import { useTheme } from './ThemeProvider';

export default function Particles() {
  const { theme, mounted } = useTheme();

  useEffect(() => {
    if (!mounted) return;

    // Remove any existing particles container
    const existingContainer = document.querySelector('.particles-container');
    if (existingContainer) {
      existingContainer.remove();
    }

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
        background: var(--particle-color);
        border-radius: 50%;
        opacity: ${Math.random() * 0.3 + 0.1};
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        box-shadow: 0 0 10px var(--particle-glow);
        animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
      `;
      
      particlesContainer.appendChild(particle);
    }

    // Add particle animation CSS with theme-aware colors
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --particle-color: ${theme === 'dark' ? 'var(--neon-green)' : '#00ff11ff'};
        --particle-glow: ${theme === 'dark' ? 'var(--green-glow)' : 'rgba(13, 182, 25, 1)'};
      }
      
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

    // Cleanup function
    return () => {
      const container = document.querySelector('.particles-container');
      if (container) {
        container.remove();
      }
    };
  }, [theme, mounted]);

  return null;
}
