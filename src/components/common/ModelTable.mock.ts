import type { ModelUsage } from '../../types';

const MODELS: Array<{ name: string; baseAccuracy: number }> = [
  { name: 'GPT-4 Turbo', baseAccuracy: 94 },
  { name: 'Claude 3.5', baseAccuracy: 93 },
  { name: 'Gemini Pro', baseAccuracy: 91 },
  { name: 'Llama 3.1', baseAccuracy: 89 },
  { name: 'Mistral L', baseAccuracy: 88 },
];
const MODEL_ROWS = 12;

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randFloat(min: number, max: number, decimals = 1): number {
  const value = Math.random() * (max - min) + min;
  return Number(value.toFixed(decimals));
}

export function getModelTableMockData(): ModelUsage[] {
  const data = Array.from({ length: MODEL_ROWS }, (_, index) => {
    const template = MODELS[index % MODELS.length];
    const version = randInt(1, 12);

    return {
      name: `${template.name} v${version}.${String(index + 1).padStart(2, '0')}`,
    usage: randInt(4, 48),
    cost: randInt(600, 16_500),
      accuracy: randFloat(template.baseAccuracy - 2.2, template.baseAccuracy + 1.6),
    };
  });

  data.sort((a, b) => b.usage - a.usage);
  return data;
}
