import type { ModelUsage, PerformanceData, RevenueData, StatsCard } from '../../types';
import { formatNumber } from '../../utils';

interface StatsSourceData {
  revenue: RevenueData[];
  performance: PerformanceData[];
  modelUsage: ModelUsage[];
}

function pctChange(current: number, previous: number): number {
  if (previous === 0) return 0;
  return Number((((current - previous) / previous) * 100).toFixed(1));
}

function sumRevenue(items: RevenueData[]): number {
  return items.reduce((sum, item) => sum + item.revenue, 0);
}

function sumRequests(items: PerformanceData[]): number {
  return items.reduce((sum, item) => sum + item.requests, 0);
}

function avgLatency(items: PerformanceData[]): number {
  if (items.length === 0) return 0;
  const total = items.reduce((sum, item) => sum + item.latency, 0);
  return total / items.length;
}

export function getStatsCardMockData({ revenue, performance, modelUsage }: StatsSourceData): StatsCard[] {
  const revenueSplit = Math.max(1, Math.floor(revenue.length / 2));
  const perfSplit = Math.max(1, Math.floor(performance.length / 2));

  const currentRevenue = sumRevenue(revenue.slice(revenueSplit));
  const previousRevenue = sumRevenue(revenue.slice(0, revenueSplit));

  const currentRequests = sumRequests(performance.slice(perfSplit));
  const previousRequests = sumRequests(performance.slice(0, perfSplit));

  const currentLatency = avgLatency(performance.slice(perfSplit));
  const previousLatency = avgLatency(performance.slice(0, perfSplit));

  const activeModels = modelUsage.filter((m) => m.usage >= 10).length;
  const previousActiveModels = modelUsage.filter((m) => m.usage >= 20).length || 1;

  return [
    {
      id: '1',
      title: 'Total Requests',
      value: formatNumber(currentRequests),
      change: pctChange(currentRequests, previousRequests),
      changeLabel: 'vs previous period',
      icon: 'activity',
    },
    {
      id: '2',
      title: 'Active Models',
      value: `${activeModels}`,
      change: pctChange(activeModels, previousActiveModels),
      changeLabel: 'vs usage threshold baseline',
      icon: 'brain',
    },
    {
      id: '3',
      title: 'Revenue',
      value: `$${Math.round(currentRevenue).toLocaleString()}`,
      change: pctChange(currentRevenue, previousRevenue),
      changeLabel: 'vs previous period',
      icon: 'dollar-sign',
    },
    {
      id: '4',
      title: 'Avg Latency',
      value: `${Math.round(currentLatency)}ms`,
      change: Number((((previousLatency - currentLatency) / (previousLatency || 1)) * 100).toFixed(1)),
      changeLabel: 'improvement vs previous period',
      icon: 'zap',
    },
  ];
}
