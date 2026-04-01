import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './store/themeContext';
import { ToastProvider } from './store/toastContext';
import App from './App';
import './index.css';

// ===== Application Entry Point =====
// Wraps the app with StrictMode, ThemeProvider, and ToastProvider for global management.

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>
);
