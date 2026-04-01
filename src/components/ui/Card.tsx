import { type CSSProperties, type ReactNode } from 'react';
import { cn } from '../../utils';

// ===== Reusable Card Component =====

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  style?: CSSProperties;
}

/** Glass-morphism card with optional hover animation */
export function Card({ children, className, hover = false, style }: CardProps) {
  return (
    <div
      style={style}
      className={cn(
        'glass-card p-6 transition-all duration-300',
        hover && 'hover:scale-[1.02] hover:shadow-xl cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}
