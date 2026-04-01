import type { PerformanceData } from '../../types';

const PERFORMANCE_POINTS = 12;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getPerformanceChartMockData(): PerformanceData[] {
  return Array.from({ length: PERFORMANCE_POINTS }, (_, index) => {
    const day = MONTHS[index % MONTHS.length];
    const requests = randInt(2_000, 8_500);
    const errors = randInt(8, Math.max(15, Math.floor(requests * 0.015)));
    const latency = randInt(95, 210);

    return { day, requests, errors, latency };
  });
}
