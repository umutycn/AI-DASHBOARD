import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import { ToastProvider } from '../store/toastContext';
import { ThemeProvider } from '../store/themeContext';
import * as api from '../services/api';

// Mock API responses
vi.mock('../services/api', () => ({
  fetchStats: vi.fn(),
  fetchRevenue: vi.fn(),
  fetchTraffic: vi.fn(),
  fetchPerformance: vi.fn(),
  fetchModelUsage: vi.fn(),
  fetchActivity: vi.fn(),
}));

const mockStats = [
  {
    id: '1',
    title: 'Total Requests',
    value: '2.4M',
    change: 12.5,
    changeLabel: 'vs last month',
    icon: 'activity',
  },
];

const mockRevenue = [
  { month: 'Jan', revenue: 42000, profit: 18000 },
];

const mockTraffic = [
  { name: 'REST API', value: 45, color: '#6366f1' },
];

const mockPerformance = [
  { day: 'Mon', requests: 4200, errors: 42, latency: 145 },
];

const mockModels = [
  { name: 'GPT-4 Turbo', usage: 45, cost: 12400, accuracy: 94.2 },
];

const mockActivity = [
  {
    id: '1',
    user: 'Sarah Chen',
    action: 'deployed',
    target: 'GPT-4 Fine-tuned Model v2.3',
    timestamp: '2 min ago',
    avatar: 'SC',
  },
];

// Wrapper component with all necessary providers
const DashboardWrapper = () => (
  <BrowserRouter>
    <ThemeProvider>
      <ToastProvider>
        <Dashboard />
      </ToastProvider>
    </ThemeProvider>
  </BrowserRouter>
);

describe('Dashboard Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Mock API calls to return data
    vi.mocked(api.fetchStats).mockResolvedValue(mockStats);
    vi.mocked(api.fetchRevenue).mockResolvedValue(mockRevenue);
    vi.mocked(api.fetchTraffic).mockResolvedValue(mockTraffic);
    vi.mocked(api.fetchPerformance).mockResolvedValue(mockPerformance);
    vi.mocked(api.fetchModelUsage).mockResolvedValue(mockModels);
    vi.mocked(api.fetchActivity).mockResolvedValue(mockActivity);
  });

  it('renders dashboard title and description', () => {
    render(<DashboardWrapper />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(
      screen.getByText(/Welcome back! Here's what's happening with your AI platform today./)
    ).toBeInTheDocument();
  });

  it('displays loading skeletons initially', () => {
    render(<DashboardWrapper />);

    // Loading state is shown briefly before data loads
    const skeletons = document.querySelectorAll('[class*="animate"]');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('loads and displays stats data', async () => {
    render(<DashboardWrapper />);

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Total Requests')).toBeInTheDocument();
    });

    expect(screen.getByText('2.4M')).toBeInTheDocument();
  });

  it('calls all API endpoints on mount', async () => {
    render(<DashboardWrapper />);

    // Wait for all API calls to complete
    await waitFor(() => {
      expect(api.fetchStats).toHaveBeenCalled();
      expect(api.fetchRevenue).toHaveBeenCalled();
      expect(api.fetchTraffic).toHaveBeenCalled();
      expect(api.fetchPerformance).toHaveBeenCalled();
      expect(api.fetchModelUsage).toHaveBeenCalled();
      expect(api.fetchActivity).toHaveBeenCalled();
    });
  });

  it('displays revenue chart title', async () => {
    render(<DashboardWrapper />);

    await waitFor(() => {
      expect(screen.getByText('Revenue Overview')).toBeInTheDocument();
    });
  });

  it('displays activity feed title', async () => {
    render(<DashboardWrapper />);

    await waitFor(() => {
      expect(screen.getByText('Recent Activity')).toBeInTheDocument();
    });
  });

  it('displays model table title', async () => {
    render(<DashboardWrapper />);

    await waitFor(() => {
      expect(screen.getByText('AI Model Usage')).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    const error = new Error('API Error');
    vi.mocked(api.fetchStats).mockRejectedValue(error);

    render(<DashboardWrapper />);

    // Component should still render even if one API fails
    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
    });
  });
});
