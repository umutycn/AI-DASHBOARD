import type { TrafficData } from '../../types';

const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd'];
const TRAFFIC_POINTS = 12;
const TRAFFIC_CHANNELS = [
  'Web App',
  'Mobile App',
  'Public API',
  'Partner API',
  'Internal Tools',
  'Admin Panel',
  'Webhook Inbound',
  'Batch Jobs',
  'SDK Clients',
  'CLI Access',
  'Integrations',
  'Support Console',
];

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getTrafficChartMockData(): TrafficData[] {
  const raw = Array.from({ length: TRAFFIC_POINTS }, (_, index) => ({
    name: TRAFFIC_CHANNELS[index % TRAFFIC_CHANNELS.length],
    value: randInt(8, 45),
  }));

  const total = raw.reduce((acc, item) => acc + item.value, 0);

  return raw.map((item, index) => ({
    name: item.name,
    value: Math.max(1, Math.round((item.value / total) * 100)),
    color: COLORS[index % COLORS.length],
  }));
}
