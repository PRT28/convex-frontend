'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Get initial theme
  const getInitialTheme = (): Theme => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('convex-theme') as Theme;
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        return savedTheme;
      }
      
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    }
    return 'light';
  };

  // Apply theme to document
  const applyTheme = (newTheme: Theme) => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-color-scheme', newTheme);
      
      // Update meta theme-color for mobile browsers
      let metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', newTheme === 'dark' ? '#040D12' : '#E8F5E8');
      } else {
        const meta = document.createElement('meta');
        meta.name = 'theme-color';
        meta.content = newTheme === 'dark' ? '#040D12' : '#E8F5E8';
        document.head.appendChild(meta);
      }
    }
  };

  // Show toast notification
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    if (typeof document === 'undefined') return;

    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = message;

    const styles = {
      success: {
        background: 'var(--gradient-primary)',
        color: theme === 'dark' ? 'var(--jet-black)' : 'var(--pure-white)',
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

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('convex-theme', newTheme);
    }
    
    const themeMsg = newTheme === 'dark' ? 
      '🌙 Dark theme activated!' : 
      '☀️ Light theme activated!';
    showToast(themeMsg, 'success');
  };

  // Initialize theme on mount
  useEffect(() => {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);

    // Listen for system theme changes
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        if (!localStorage.getItem('convex-theme')) {
          const systemTheme = e.matches ? 'dark' : 'light';
          setTheme(systemTheme);
          applyTheme(systemTheme);
        }
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, []);

  // Apply theme when it changes
  useEffect(() => {
    if (mounted) {
      applyTheme(theme);
    }
  }, [theme, mounted]);

  const value = {
    theme,
    toggleTheme,
    mounted
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
