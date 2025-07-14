import { API_URL } from './api';

export const saveScore = async (category: string, score: number, token: string) => {
  const res = await fetch(`${API_URL}/score`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify({ category, score }),
  });
  if (!res.ok) throw new Error('Failed to save score');
  return res.json();
};

export const fetchLeaderboard = async () => {
  const res = await fetch(`${API_URL}/scores/leaderboard`);
  if (!res.ok) throw new Error('Failed to fetch leaderboard');
  return res.json();
}; 