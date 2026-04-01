import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { PerformanceData } from '../../types';
import { Card } from '../ui/Card';

// ===== Performance Bar Chart =====

interface PerformanceChartProps {
  data: PerformanceData[];
}

/** Grouped bar chart showing daily requests vs errors */
export function PerformanceChart({ data }: PerformanceChartProps) {
  return (
    <Card className="col-span-full lg:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Weekly Performance
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Requests &amp; error rates this week
          </p>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: 'none',
                borderRadius: '12px',
                color: '#f1f5f9',
                fontSize: '13px',
              }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ fontSize: '12px', paddingBottom: '10px' }}
            />
            <Bar
              dataKey="requests"
              name="Requests"
              fill="#6366f1"
              radius={[6, 6, 0, 0]}
              barSize={20}
            />
            <Bar
              dataKey="errors"
              name="Errors"
              fill="#ef4444"
              radius={[6, 6, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
