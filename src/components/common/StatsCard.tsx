import {
  Activity,
  Brain,
  DollarSign,
  Zap,
  TrendingUp,
  TrendingDown,
} from 'lucide-react';
import type { StatsCard as StatsCardType } from '../../types';
import { Card } from '../ui/Card';

// ===== Stats Card Component =====

interface StatsCardProps {
  stat: StatsCardType;
  index: number;
}

/** Map icon string names to Lucide components */
const iconMap: Record<string, React.ElementType> = {
  activity: Activity,
  brain: Brain,
  'dollar-sign': DollarSign,
  zap: Zap,
};

/** Gradient backgrounds for each card */
const gradients = [
  'from-brand-500 to-indigo-600',
  'from-purple-500 to-fuchsia-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-orange-600',
];

/** Individual stat card with icon, value, and change indicator */
export function StatsCardItem({ stat, index }: StatsCardProps) {
  const IconComponent = iconMap[stat.icon] || Activity;
  const isPositive = stat.change >= 0;

  return (
    <Card hover className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
      <div className="flex items-start justify-between">
        {/* Icon */}
        <div
          className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${gradients[index % gradients.length]} shadow-lg`}
        >
          <IconComponent className="w-6 h-6 text-white" />
        </div>

        {/* Change badge */}
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
            isPositive
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400'
              : 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400'
          }`}
          aria-label={`${Math.abs(stat.change)}% ${isPositive ? 'increase' : 'decrease'}`}
        >
          {isPositive ? (
            <TrendingUp className="w-3 h-3" aria-hidden="true" />
          ) : (
            <TrendingDown className="w-3 h-3" aria-hidden="true" />
          )}
          <span>{Math.abs(stat.change)}%</span>
        </div>
      </div>

      {/* Value */}
      <div className="mt-4">
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {stat.value}
        </p>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {stat.title}
        </p>
      </div>

      {/* Change label */}
      <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
        {stat.changeLabel}
      </p>
    </Card>
  );
}
