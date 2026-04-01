// ===== Dashboard Types =====

/** Stats card data displayed on the dashboard */
export interface StatsCard {
  id: string;
  title: string;
  value: string;
  change: number; // percentage change (positive = up, negative = down)
  changeLabel: string;
  icon: string;
}

/** Revenue chart data point */
export interface RevenueData {
  month: string;
  revenue: number;
  profit: number;
}

/** Traffic source distribution */
export interface TrafficData {
  name: string;
  value: number;
  color: string;
}

/** Performance metric over time */
export interface PerformanceData {
  day: string;
  requests: number;
  errors: number;
  latency: number;
}

/** AI Model usage statistics */
export interface ModelUsage {
  name: string;
  usage: number;
  cost: number;
  accuracy: number;
}

/** Activity feed item */
export interface ActivityItem {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  avatar: string;
}

/** Sidebar navigation item */
export interface NavItem {
  label: string;
  path: string;
  icon: string;
}

/** API response wrapper */
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

/** Theme mode */
export type ThemeMode = 'light' | 'dark';
