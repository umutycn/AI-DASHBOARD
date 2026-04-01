import { useState, useCallback } from 'react';
import { Menu, Moon, Sun, Search, Bell } from 'lucide-react';
import { useThemeContext } from '../../store/themeContext';

// ===== Top Navbar =====

interface NavbarProps {
  onToggleSidebar: () => void;
}

export function Navbar({ onToggleSidebar }: NavbarProps) {
  const { theme, toggleTheme } = useThemeContext();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      // TODO: Implement search functionality (filter models, activities, etc.)
    },
    []
  );

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-6 bg-white/80 dark:bg-surface-800/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50">
      {/* Left: hamburger + search */}
      <div className="flex items-center gap-3">
        <button
          id="sidebar-toggle"
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden transition-colors"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search bar */}
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800/50 border border-transparent focus-within:border-brand-500/50 transition-colors">
          <Search className="w-4 h-4 text-gray-400" />
          <label htmlFor="search-input" className="sr-only">
            Search dashboard
          </label>
          <input
            id="search-input"
            type="text"
            placeholder="Search anything..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="bg-transparent text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 outline-none w-48 lg:w-64"
            aria-label="Search"
          />
          <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono text-gray-400 bg-gray-200 dark:bg-gray-700">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <button
          id="theme-toggle"
          onClick={toggleTheme}
          className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-amber-400" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

        {/* Notifications */}
        <button
          id="notifications-btn"
          className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-surface-800" />
        </button>

        {/* User avatar */}
        <button
          id="user-menu"
          className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
            U
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              Admin
            </p>
            <p className="text-[10px] text-gray-400">Pro Plan</p>
          </div>
        </button>
      </div>
    </header>
  );
}
