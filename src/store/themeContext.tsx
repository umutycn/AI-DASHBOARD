import { createContext, useContext, type ReactNode } from 'react';
import { useTheme } from '../hooks/useTheme';
import type { ThemeMode } from '../types';

// ===== Theme Context =====
// Provides theme state and toggle function to the entire app tree.

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/** Theme provider component — wrap around <App /> */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/** Hook to consume theme context */
export function useThemeContext(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}
