'use client';

import { useTheme } from './ThemeProvider';

const ThemeToggle = () => {
  const { theme, toggleTheme, mounted } = useTheme();

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="theme-toggle" id="theme-toggle">
        <span className="theme-toggle-label">Theme</span>
        <div className="theme-toggle-switch">
          <div className="theme-toggle-slider">
            <span className="theme-toggle-icon">☀️</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="theme-toggle" id="theme-toggle">
      <span className="theme-toggle-label">Theme</span>
      <div 
        className="theme-toggle-switch" 
        id="theme-switch"
        onClick={toggleTheme}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleTheme();
          }
        }}
      >
        <div 
          className="theme-toggle-slider"
          style={{
            transform: theme === 'dark' ? 'translateX(26px)' : 'translateX(0px)'
          }}
        >
          <span className="theme-toggle-icon">
            {theme === 'dark' ? '🌙' : '☀️'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;
