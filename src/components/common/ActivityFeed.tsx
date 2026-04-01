import type { ActivityItem } from '../../types';
import { Card } from '../ui/Card';

// ===== Activity Feed Component =====

interface ActivityFeedProps {
  activities: ActivityItem[];
}

/** Vertical activity feed with avatar initials and timestamps */
export function ActivityFeed({ activities }: ActivityFeedProps) {
  /** Color palette for avatars */
  const avatarColors = [
    'from-brand-500 to-purple-500',
    'from-emerald-500 to-teal-500',
    'from-amber-500 to-orange-500',
    'from-pink-500 to-rose-500',
    'from-cyan-500 to-blue-500',
  ];

  return (
    <Card>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Recent Activity
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Latest team actions
          </p>
        </div>
        <button className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline">
          View all
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((item, i) => (
          <div
            key={item.id}
            className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            {/* Avatar */}
            <div
              className={`flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold`}
            >
              {item.avatar}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {item.user}
                </span>{' '}
                <span className="text-gray-500 dark:text-gray-400">
                  {item.action}
                </span>{' '}
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {item.target}
                </span>
              </p>
              <p className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
                {item.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
