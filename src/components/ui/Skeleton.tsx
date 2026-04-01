import { cn } from '../../utils';

// ===== Loading Skeleton Component =====

interface SkeletonProps {
  className?: string;
  count?: number;
}

/** Animated skeleton placeholder for loading states */
export function Skeleton({ className, count = 1 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700/50',
            className
          )}
        />
      ))}
    </>
  );
}
