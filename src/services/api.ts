import axios from 'axios';
import type {
  StatsCard,
  RevenueData,
  TrafficData,
  PerformanceData,
  ModelUsage,
  ActivityItem,
} from '../types';
import { delay } from '../utils';
import { getStatsCardMockData } from '../components/common/StatsCard.mock';
import { getRevenueChartMockData } from '../components/charts/RevenueChart.mock';
import { getTrafficChartMockData } from '../components/charts/TrafficChart.mock';
import { getPerformanceChartMockData } from '../components/charts/PerformanceChart.mock';
import { getModelTableMockData } from '../components/common/ModelTable.mock';
import { getActivityFeedMockData } from '../components/common/ActivityFeed.mock';

// ===== Axios Instance =====
const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ===== API Functions =====
// These simulate network requests using mock data.
// Replace with real API calls when backend is ready.

const revenueData = getRevenueChartMockData();
const trafficData = getTrafficChartMockData();
const performanceData = getPerformanceChartMockData();
const modelUsageData = getModelTableMockData();
const activityData = getActivityFeedMockData();

const dashboardMockData = {
  stats: getStatsCardMockData({
    revenue: revenueData,
    performance: performanceData,
    modelUsage: modelUsageData,
  }),
  revenue: revenueData,
  traffic: trafficData,
  performance: performanceData,
  modelUsage: modelUsageData,
  activity: activityData,
};

export async function fetchStats(): Promise<StatsCard[]> {
  await delay(300);
  return dashboardMockData.stats;
}

export async function fetchRevenue(): Promise<RevenueData[]> {
  await delay(400);
  return dashboardMockData.revenue;
}

export async function fetchTraffic(): Promise<TrafficData[]> {
  await delay(350);
  return dashboardMockData.traffic;
}

export async function fetchPerformance(): Promise<PerformanceData[]> {
  await delay(300);
  return dashboardMockData.performance;
}

export async function fetchModelUsage(): Promise<ModelUsage[]> {
  await delay(250);
  return dashboardMockData.modelUsage;
}

export async function fetchActivity(): Promise<ActivityItem[]> {
  await delay(200);
  return dashboardMockData.activity;
}

// Export the axios instance for future real API calls
export default apiClient;
