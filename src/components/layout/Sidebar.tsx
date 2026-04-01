import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  Brain,
  Settings,
  Users,
  Bell,
  Database,
  Shield,
  Sparkles,
} from 'lucide-react';
import { cn } from '../../utils';

// ===== Sidebar Navigation =====

/** Navigation items with their icons */
const navItems = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  { label: 'AI Models', path: '/models', icon: Brain },
  { label: 'Datasets', path: '/datasets', icon: Database },
  { label: 'Team', path: '/team', icon: Users },
  { label: 'Security', path: '/security', icon: Shield },
  { label: 'Notifications', path: '/notifications', icon: Bell },
  { label: 'Settings', path: '/settings', icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-full w-64 flex flex-col',
          'bg-white/90 dark:bg-surface-800/90 backdrop-blur-2xl',
          'border-r border-gray-200/50 dark:border-gray-700/50',
          'transition-transform duration-300 ease-out',
          'lg:translate-x-0 lg:static lg:z-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl animate-gradient-border">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold gradient-text">AI Dashboard</h1>
            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
              Analytics Platform
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <p className="px-4 mb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Main Menu
          </p>
          {navItems.slice(0, 4).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                cn('sidebar-link', isActive && 'active')
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}

          <p className="px-4 mt-6 mb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Management
          </p>
          {navItems.slice(4).map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                cn('sidebar-link', isActive && 'active')
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom card */}
        <div className="p-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-brand-500/10 to-purple-500/10 border border-brand-500/20">
            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              Upgrade to Pro
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Unlock advanced features and higher rate limits.
            </p>
            <button className="mt-3 w-full py-2 px-3 text-xs font-semibold rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
