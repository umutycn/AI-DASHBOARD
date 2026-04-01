import type { TrafficData } from '../../types';

const COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd'];
const TRAFFIC_POINTS = 12;

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getTrafficChartMockData(): TrafficData[] {
  const raw = Array.from({ length: TRAFFIC_POINTS }, (_, index) => ({
    name: `Source ${String(index + 1).padStart(2, '0')}`,
    value: randInt(8, 45),
  }));

  const total = raw.reduce((acc, item) => acc + item.value, 0);

  return raw.map((item, index) => ({
    name: item.name,
    value: Math.max(1, Math.round((item.value / total) * 100)),
    color: COLORS[index % COLORS.length],
  }));
}
