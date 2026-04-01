import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import type { TrafficData } from '../../types';
import { Card } from '../ui/Card';

// ===== Traffic Distribution Pie Chart =====

interface TrafficChartProps {
  data: TrafficData[];
}

/** Donut chart showing API traffic distribution by source */
export function TrafficChart({ data }: TrafficChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Traffic Sources
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          API traffic distribution
        </p>
      </div>

      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: 'none',
                borderRadius: '12px',
                color: '#f1f5f9',
                fontSize: '13px',
              }}
              formatter={(value) => [`${Number(value ?? 0)}%`, '']}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="space-y-2.5 mt-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {item.name}
              </span>
            </div>
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              {((item.value / total) * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
