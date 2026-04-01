import type { ModelUsage } from '../../types';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

// ===== AI Model Usage Table =====

interface ModelTableProps {
  models: ModelUsage[];
}

/** Table displaying AI model usage stats with progress bars */
export function ModelTable({ models }: ModelTableProps) {
  /** Determine accuracy badge variant */
  const getAccuracyVariant = (accuracy: number) => {
    if (accuracy >= 93) return 'success';
    if (accuracy >= 90) return 'info';
    if (accuracy >= 85) return 'warning';
    return 'danger';
  };

  return (
    <Card className="col-span-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            AI Model Usage
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Active model performance &amp; cost breakdown
          </p>
        </div>
        <button className="px-4 py-2 text-sm font-medium rounded-xl bg-brand-600 text-white hover:bg-brand-700 transition-colors shadow-sm">
          Manage Models
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full" role="table" aria-label="AI model usage statistics">
          <thead>
            <tr className="border-b border-gray-100 dark:border-gray-800">
              <th
                scope="col"
                className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
              >
                Model
              </th>
              <th
                scope="col"
                className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
              >
                Usage
              </th>
              <th
                scope="col"
                className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
              >
                Cost
              </th>
              <th
                scope="col"
                className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
              >
                Accuracy
              </th>
            </tr>
          </thead>
          <tbody>
            {models.map((model) => (
              <tr
                key={model.name}
                className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
              >
                {/* Model name */}
                <td className="py-3.5 px-4">
                  <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                    {model.name}
                  </span>
                </td>

                {/* Usage bar */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-brand-500 to-purple-500 rounded-full transition-all duration-500"
                        style={{ width: `${model.usage}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-10 text-right">
                      {model.usage}%
                    </span>
                  </div>
                </td>

                {/* Cost */}
                <td className="py-3.5 px-4">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    ${model.cost.toLocaleString()}
                  </span>
                </td>

                {/* Accuracy badge */}
                <td className="py-3.5 px-4">
                  <Badge variant={getAccuracyVariant(model.accuracy)}>
                    {model.accuracy}%
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
