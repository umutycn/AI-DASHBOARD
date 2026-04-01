import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import type { RevenueData } from '../../types';
import { Card } from '../ui/Card';

// ===== Revenue Area Chart =====

interface RevenueChartProps {
  data: RevenueData[];
  windowSize: 1 | 3 | 6 | 9 | 12;
  onWindowChange: (value: 1 | 3 | 6 | 9 | 12) => void;
}

/** Gradient area chart showing monthly revenue vs profit */
export function RevenueChart({ data, windowSize, onWindowChange }: RevenueChartProps) {
  return (
    <Card className="col-span-full lg:col-span-2">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Revenue Overview
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Monthly revenue &amp; profit trends
          </p>
        </div>
        <div>
          <label htmlFor="revenue-period-select" className="sr-only">
            Select time period
          </label>
          <select
            id="revenue-period-select"
            value={windowSize}
            onChange={(e) => onWindowChange(Number(e.target.value) as 1 | 3 | 6 | 9 | 12)}
            className="px-3 py-1.5 rounded-lg text-sm bg-gray-100 dark:bg-gray-800 border-0 text-gray-600 dark:text-gray-300 outline-none cursor-pointer"
            aria-label="Revenue period"
          >
            <option value={1}>Last 1 month</option>
            <option value={3}>Last 3 months</option>
            <option value={6}>Last 6 months</option>
            <option value={9}>Last 9 months</option>
            <option value={12}>Last 12 months</option>
          </select>
        </div>
      </div>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.3} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#9ca3af' }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `$${v / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                border: 'none',
                borderRadius: '12px',
                boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
                color: '#f1f5f9',
                fontSize: '13px',
              }}
              formatter={(value) => {
                const amount = Number(value ?? 0);
                return [`$${amount.toLocaleString()}`, ''];
              }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ fontSize: '12px', paddingBottom: '10px' }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="#6366f1"
              strokeWidth={2.5}
              fill="url(#revenueGradient)"
            />
            <Area
              type="monotone"
              dataKey="profit"
              name="Profit"
              stroke="#8b5cf6"
              strokeWidth={2.5}
              fill="url(#profitGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
