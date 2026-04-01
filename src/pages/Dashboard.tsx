import { useCallback, useEffect } from 'react';
import { useFetch } from '../hooks';
import { useToast } from '../store/toastContext';
import { formatCurrency, formatNumber } from '../utils';
import {
  fetchStats,
  fetchRevenue,
  fetchTraffic,
  fetchPerformance,
  fetchModelUsage,
  fetchActivity,
} from '../services/api';

// Components
import { StatsCardItem } from '../components/common/StatsCard';
import { ActivityFeed } from '../components/common/ActivityFeed';
import { ModelTable } from '../components/common/ModelTable';
import { RevenueChart } from '../components/charts/RevenueChart';
import { TrafficChart } from '../components/charts/TrafficChart';
import { PerformanceChart } from '../components/charts/PerformanceChart';
import { Badge, Card, Skeleton } from '../components/ui';

// ===== Dashboard Page =====

export default function Dashboard() {
  const { addToast } = useToast();

  // Wrap fetchers in useCallback so useFetch doesn't re-trigger on every render
  const fetchStatsCb = useCallback(() => fetchStats(), []);
  const fetchRevenueCb = useCallback(() => fetchRevenue(), []);
  const fetchTrafficCb = useCallback(() => fetchTraffic(), []);
  const fetchPerformanceCb = useCallback(() => fetchPerformance(), []);
  const fetchModelUsageCb = useCallback(() => fetchModelUsage(), []);
  const fetchActivityCb = useCallback(() => fetchActivity(), []);

  const { data: stats, loading: statsLoading, error: statsError } = useFetch(fetchStatsCb);
  const { data: revenue, loading: revenueLoading, error: revenueError } = useFetch(fetchRevenueCb);
  const { data: traffic, loading: trafficLoading, error: trafficError } = useFetch(fetchTrafficCb);
  const { data: performance, loading: perfLoading, error: perfError } = useFetch(fetchPerformanceCb);
  const { data: models, loading: modelsLoading, error: modelsError } = useFetch(fetchModelUsageCb);
  const { data: activity, loading: activityLoading, error: activityError } = useFetch(fetchActivityCb);

  // Show error toasts when data fetching fails
  useEffect(() => {
    if (statsError) addToast(`Failed to load stats: ${statsError}`, 'error');
  }, [statsError, addToast]);

  useEffect(() => {
    if (revenueError) addToast(`Failed to load revenue data: ${revenueError}`, 'error');
  }, [revenueError, addToast]);

  useEffect(() => {
    if (trafficError) addToast(`Failed to load traffic data: ${trafficError}`, 'error');
  }, [trafficError, addToast]);

  useEffect(() => {
    if (perfError) addToast(`Failed to load performance data: ${perfError}`, 'error');
  }, [perfError, addToast]);

  useEffect(() => {
    if (modelsError) addToast(`Failed to load model data: ${modelsError}`, 'error');
  }, [modelsError, addToast]);

  useEffect(() => {
    if (activityError) addToast(`Failed to load activity data: ${activityError}`, 'error');
  }, [activityError, addToast]);

  const totalRequests = performance?.reduce((sum, item) => sum + item.requests, 0) ?? 0;
  const totalErrors = performance?.reduce((sum, item) => sum + item.errors, 0) ?? 0;
  const errorRate = totalRequests > 0 ? (totalErrors / totalRequests) * 100 : 0;
  const avgLatency =
    performance && performance.length > 0
      ? performance.reduce((sum, item) => sum + item.latency, 0) / performance.length
      : 0;

  const revenueSplit = revenue ? Math.max(1, Math.floor(revenue.length / 2)) : 1;
  const previousRevenue = revenue
    ? revenue.slice(0, revenueSplit).reduce((sum, item) => sum + item.revenue, 0)
    : 0;
  const currentRevenue = revenue
    ? revenue.slice(revenueSplit).reduce((sum, item) => sum + item.revenue, 0)
    : 0;
  const revenueDelta = previousRevenue > 0 ? ((currentRevenue - previousRevenue) / previousRevenue) * 100 : 0;

  const topTraffic =
    traffic && traffic.length > 0 ? [...traffic].sort((a, b) => b.value - a.value)[0] : null;

  const highestCostModel =
    models && models.length > 0 ? [...models].sort((a, b) => b.cost - a.cost)[0] : null;

  const recommendations: Array<{
    id: string;
    title: string;
    detail: string;
    variant: 'success' | 'danger' | 'warning' | 'info' | 'default';
    action: string;
  }> = [
    {
      id: '1',
      title: errorRate > 1.5 ? 'Error rate is above target' : 'Error rate is stable',
      detail:
        errorRate > 1.5
          ? `Current error rate is ${errorRate.toFixed(2)}%. Check recent deploys and API limits.`
          : `Current error rate is ${errorRate.toFixed(2)}%. Keep monitoring critical endpoints.`,
      variant: errorRate > 1.5 ? 'danger' : 'success',
      action: 'Open incident filters',
    },
    {
      id: '2',
      title: revenueDelta < 0 ? 'Revenue trend is down' : 'Revenue trend is healthy',
      detail:
        revenueDelta < 0
          ? `Revenue changed ${revenueDelta.toFixed(1)}% vs previous period. Review top-churn segments.`
          : `Revenue changed +${revenueDelta.toFixed(1)}% vs previous period. Scale top performing channels.`,
      variant: revenueDelta < 0 ? 'warning' : 'info',
      action: 'Review revenue breakdown',
    },
    {
      id: '3',
      title: highestCostModel ? `${highestCostModel.name} is highest cost` : 'Cost analysis pending',
      detail: highestCostModel
        ? `Current highest model cost is ${formatCurrency(highestCostModel.cost)}. Validate ROI with accuracy trend.`
        : 'Model cost data is not available yet.',
      variant: highestCostModel ? 'default' : 'warning',
      action: 'Inspect model usage',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Page header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Welcome back! Here's what's happening with your AI platform today.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800/60 text-xs font-medium text-gray-600 dark:text-gray-300">
          <span>Window:</span>
          <Badge variant="info">Last 12 points</Badge>
        </div>
      </div>

      {/* Situation summary: What happened? */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        <Card>
          <p className="text-xs uppercase tracking-wider text-gray-400">System Health</p>
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{errorRate.toFixed(2)}%</p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Global error rate</p>
        </Card>

        <Card>
          <p className="text-xs uppercase tracking-wider text-gray-400">Response Speed</p>
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{Math.round(avgLatency)}ms</p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Average latency</p>
        </Card>

        <Card>
          <p className="text-xs uppercase tracking-wider text-gray-400">Dominant Source</p>
          <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{topTraffic?.name ?? 'N/A'}</p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {topTraffic ? `${topTraffic.value}% traffic share` : 'No traffic data'}
          </p>
        </Card>
      </div>

      {/* KPI cards */}
      <div>
        <div className="mb-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">What Happened</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Top-level KPIs to quickly understand the current state.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {statsLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-40 rounded-2xl" />
              ))
            : stats && stats.length > 0
            ? stats.map((stat, index) => (
                <StatsCardItem key={stat.id} stat={stat} index={index} />
              ))
            : !statsError && (
                <div className="col-span-full p-4 text-center text-gray-500 dark:text-gray-400">
                  No stats available
                </div>
              )}
        </div>
      </div>

      {/* Diagnosis: Why it happened? */}
      <div>
        <div className="mb-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Why It Happened</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Use trend and distribution views to diagnose the cause.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {revenueLoading ? (
            <Skeleton className="h-96 rounded-2xl col-span-full lg:col-span-2" />
          ) : (
            revenue && <RevenueChart data={revenue} />
          )}

          {trafficLoading ? (
            <Skeleton className="h-96 rounded-2xl" />
          ) : (
            traffic && <TrafficChart data={traffic} />
          )}
        </div>
      </div>

      {/* Performance + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {perfLoading ? (
          <Skeleton className="h-96 rounded-2xl col-span-full lg:col-span-2" />
        ) : (
          performance && <PerformanceChart data={performance} />
        )}

        {activityLoading ? (
          <Skeleton className="h-96 rounded-2xl" />
        ) : (
          activity && <ActivityFeed activities={activity} />
        )}
      </div>

      {/* Action center: What to do next? */}
      <Card className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">What To Do Next</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Recommended actions based on current dashboard signals.
            </p>
          </div>
          <Badge variant={errorRate > 1.5 ? 'warning' : 'success'}>
            Monitoring {formatNumber(totalRequests)} requests
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="rounded-xl border border-gray-200 dark:border-gray-700 p-4 bg-white/40 dark:bg-surface-800/40"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{rec.title}</p>
                <Badge variant={rec.variant}>{rec.variant}</Badge>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{rec.detail}</p>
              <button className="mt-3 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline">
                {rec.action}
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Model usage table */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {modelsLoading ? (
          <Skeleton className="h-64 rounded-2xl" />
        ) : (
          models && <ModelTable models={models} />
        )}
      </div>
    </div>
  );
}
