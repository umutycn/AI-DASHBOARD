import type { PerformanceData } from '../../types';

const PERFORMANCE_POINTS = 12;

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getPerformanceChartMockData(): PerformanceData[] {
  return Array.from({ length: PERFORMANCE_POINTS }, (_, index) => {
    const day = `D${String(index + 1).padStart(2, '0')}`;
    const requests = randInt(2_000, 8_500);
    const errors = randInt(8, Math.max(15, Math.floor(requests * 0.015)));
    const latency = randInt(95, 210);

    return { day, requests, errors, latency };
  });
}
