import { useState, useEffect } from 'react';
import type { ThemeMode } from '../types';

/**
 * Custom hook to manage dark/light theme.
 * Persists preference to localStorage and syncs with the <html> class.
 */
export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('ai-dashboard-theme') as ThemeMode | null;
    if (saved) return saved;
    // Default to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('ai-dashboard-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
}
