import type { ActivityItem } from '../../types';

const ACTIONS = ['deployed', 'created', 'updated', 'resolved', 'started', 'stopped', 'reviewed'];
const USERS = [
  { name: 'Sarah Chen', avatar: 'SC' },
  { name: 'Alex Rivera', avatar: 'AR' },
  { name: 'Jordan Lee', avatar: 'JL' },
  { name: 'Maya Patel', avatar: 'MP' },
  { name: 'Tom Wilson', avatar: 'TW' },
  { name: 'Nora Kim', avatar: 'NK' },
];
const TARGETS = [
  'GPT-4 Fine-tuned Model',
  'Inference pipeline config',
  'API rate limit settings',
  'Production latency alert',
  'Prompt safety policy',
  'Model benchmark suite',
];
const ACTIVITY_ITEMS = 12;

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: T[]): T {
  return arr[randInt(0, arr.length - 1)];
}

export function getActivityFeedMockData(): ActivityItem[] {
  return Array.from({ length: ACTIVITY_ITEMS }, (_, idx) => {
    const person = pick(USERS);
    const mins = randInt(1, 45);
    const hours = randInt(1, 23);
    const days = randInt(1, 12);
    const timestamp =
      idx < 4
        ? `${mins} min ago`
        : idx < 9
        ? `${hours} hour${hours > 1 ? 's' : ''} ago`
        : `${days} day${days > 1 ? 's' : ''} ago`;

    return {
      id: `${idx + 1}`,
      user: person.name,
      action: pick(ACTIONS),
      target: pick(TARGETS),
      timestamp,
      avatar: person.avatar,
    };
  });
}
