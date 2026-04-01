import type { RevenueData } from '../../types';

const REVENUE_POINTS = 12;

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min: number, max: number, decimals = 2): number {
  const value = Math.random() * (max - min) + min;
  return Number(value.toFixed(decimals));
}

export function getRevenueChartMockData(): RevenueData[] {
  return Array.from({ length: REVENUE_POINTS }, (_, index) => {
    const month = `P${String(index + 1).padStart(2, '0')}`;
    const baseline = 35_000 + index * randInt(2_500, 6_500);
    const revenue = baseline + randInt(-4_000, 8_000);
    const profit = Math.max(6_000, Math.floor(revenue * randFloat(0.32, 0.56)));

    return {
      month,
      revenue,
      profit,
    };
  });
}
