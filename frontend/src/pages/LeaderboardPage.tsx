import { useEffect, useState } from 'react';
import { API_URL } from '../api';
import Button from '../components/Button';
import Navbar from '../components/Navbar';

const LeaderboardPage = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setSelectedCategory(data[0] || '');
      });
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;
    setLoading(true);
    fetch(`${API_URL}/leaderboard/${selectedCategory}`)
      .then((res) => res.json())
      .then((data) => {
        setLeaderboard(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load leaderboard');
        setLoading(false);
      });
  }, [selectedCategory]);

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
        <div className="mb-4 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={selectedCategory === cat ? 'bg-indigo-700' : ''}
            >
              {cat}
            </Button>
          ))}
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <table className="w-full mt-4 text-left">
            <thead>
              <tr>
                <th className="py-2">Rank</th>
                <th className="py-2">User</th>
                <th className="py-2">Score</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-4">No scores yet.</td></tr>
              ) : (
                leaderboard.map((entry, idx) => (
                  <tr key={entry._id} className="border-t">
                    <td className="py-2">{idx + 1}</td>
                    <td className="py-2">{entry.userId?.name || entry.userId?.email || 'Anonymous'}</td>
                    <td className="py-2">{entry.score}</td>
                    <td className="py-2">{new Date(entry.date).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage; 