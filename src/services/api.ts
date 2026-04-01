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

// ===== Axios Instance =====
const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ===== Mock Data =====

const mockStats: StatsCard[] = [
  {
    id: '1',
    title: 'Total Requests',
    value: '2.4M',
    change: 12.5,
    changeLabel: 'vs last month',
    icon: 'activity',
  },
  {
    id: '2',
    title: 'Active Models',
    value: '18',
    change: 3,
    changeLabel: 'new this week',
    icon: 'brain',
  },
  {
    id: '3',
    title: 'Revenue',
    value: '$84,230',
    change: 8.2,
    changeLabel: 'vs last month',
    icon: 'dollar-sign',
  },
  {
    id: '4',
    title: 'Avg Latency',
    value: '142ms',
    change: -5.3,
    changeLabel: 'improvement',
    icon: 'zap',
  },
];

const mockRevenue: RevenueData[] = [
  { month: 'Jan', revenue: 42000, profit: 18000 },
  { month: 'Feb', revenue: 38000, profit: 15000 },
  { month: 'Mar', revenue: 51000, profit: 22000 },
  { month: 'Apr', revenue: 47000, profit: 20000 },
  { month: 'May', revenue: 63000, profit: 28000 },
  { month: 'Jun', revenue: 58000, profit: 25000 },
  { month: 'Jul', revenue: 72000, profit: 32000 },
  { month: 'Aug', revenue: 68000, profit: 30000 },
  { month: 'Sep', revenue: 79000, profit: 35000 },
  { month: 'Oct', revenue: 84000, profit: 38000 },
  { month: 'Nov', revenue: 91000, profit: 42000 },
  { month: 'Dec', revenue: 98000, profit: 45000 },
];

const mockTraffic: TrafficData[] = [
  { name: 'REST API', value: 45, color: '#6366f1' },
  { name: 'GraphQL', value: 25, color: '#8b5cf6' },
  { name: 'WebSocket', value: 18, color: '#a78bfa' },
  { name: 'gRPC', value: 12, color: '#c4b5fd' },
];

const mockPerformance: PerformanceData[] = [
  { day: 'Mon', requests: 4200, errors: 42, latency: 145 },
  { day: 'Tue', requests: 3800, errors: 38, latency: 132 },
  { day: 'Wed', requests: 5100, errors: 25, latency: 128 },
  { day: 'Thu', requests: 4700, errors: 55, latency: 155 },
  { day: 'Fri', requests: 6300, errors: 32, latency: 118 },
  { day: 'Sat', requests: 2800, errors: 18, latency: 110 },
  { day: 'Sun', requests: 2200, errors: 12, latency: 105 },
];

const mockModelUsage: ModelUsage[] = [
  { name: 'GPT-4 Turbo', usage: 45, cost: 12400, accuracy: 94.2 },
  { name: 'Claude 3.5', usage: 28, cost: 8200, accuracy: 93.8 },
  { name: 'Gemini Pro', usage: 15, cost: 4500, accuracy: 91.5 },
  { name: 'Llama 3.1', usage: 8, cost: 1200, accuracy: 89.3 },
  { name: 'Mistral L', usage: 4, cost: 800, accuracy: 88.1 },
];

const mockActivity: ActivityItem[] = [
  {
    id: '1',
    user: 'Sarah Chen',
    action: 'deployed',
    target: 'GPT-4 Fine-tuned Model v2.3',
    timestamp: '2 min ago',
    avatar: 'SC',
  },
  {
    id: '2',
    user: 'Alex Rivera',
    action: 'created',
    target: 'New training pipeline',
    timestamp: '15 min ago',
    avatar: 'AR',
  },
  {
    id: '3',
    user: 'Jordan Lee',
    action: 'updated',
    target: 'API rate limit config',
    timestamp: '1 hour ago',
    avatar: 'JL',
  },
  {
    id: '4',
    user: 'Maya Patel',
    action: 'resolved',
    target: 'Latency spike in prod',
    timestamp: '3 hours ago',
    avatar: 'MP',
  },
  {
    id: '5',
    user: 'Tom Wilson',
    action: 'started',
    target: 'Benchmark suite v4',
    timestamp: '5 hours ago',
    avatar: 'TW',
  },
];

// ===== API Functions =====
// These simulate network requests using mock data.
// Replace with real API calls when backend is ready.

export async function fetchStats(): Promise<StatsCard[]> {
  await delay(300);
  return mockStats;
}

export async function fetchRevenue(): Promise<RevenueData[]> {
  await delay(400);
  return mockRevenue;
}

export async function fetchTraffic(): Promise<TrafficData[]> {
  await delay(350);
  return mockTraffic;
}

export async function fetchPerformance(): Promise<PerformanceData[]> {
  await delay(300);
  return mockPerformance;
}

export async function fetchModelUsage(): Promise<ModelUsage[]> {
  await delay(250);
  return mockModelUsage;
}

export async function fetchActivity(): Promise<ActivityItem[]> {
  await delay(200);
  return mockActivity;
}

// Export the axios instance for future real API calls
export default apiClient;
