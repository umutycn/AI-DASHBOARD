import { cn } from '../../utils';

// ===== Badge Component =====

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'danger' | 'warning' | 'info' | 'default';
  className?: string;
}

const variantClasses: Record<string, string> = {
  success: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400',
  danger: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400',
  warning: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400',
  info: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400',
  default: 'bg-gray-100 text-gray-700 dark:bg-gray-500/15 dark:text-gray-400',
};

/** Colored badge for status indicators */
export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
