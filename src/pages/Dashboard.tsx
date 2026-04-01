import { useCallback, useEffect } from 'react';
import { useFetch } from '../hooks';
import { useToast } from '../store/toastContext';
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
import { Skeleton } from '../components/ui/Skeleton';

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

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-fade-in">
      {/* Page header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Welcome back! Here's what's happening with your AI platform today.
        </p>
      </div>

      {/* Stats cards row */}
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

      {/* Charts row 1: Revenue + Traffic */}
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

      {/* Charts row 2: Performance + Activity */}
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
