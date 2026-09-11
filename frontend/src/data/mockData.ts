import type { HistoryItem } from '../types';

export const mockHistory: HistoryItem[] = [
  {
    id: 1,
    username: 'john_12345',
    prediction: 'Likely Fake',
    fake_probability: 0.89,
    created_at: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
  },
  {
    id: 2,
    username: 'real_sarah_j',
    prediction: 'Likely Real',
    fake_probability: 0.12,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    id: 3,
    username: 'crypto_giveaway_bot99',
    prediction: 'Likely Fake',
    fake_probability: 0.98,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
  },
  {
    id: 4,
    username: 'photography_by_mike',
    prediction: 'Uncertain',
    fake_probability: 0.55,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
  },
];
