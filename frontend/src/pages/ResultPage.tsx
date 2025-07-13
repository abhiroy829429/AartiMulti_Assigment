import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { API_URL } from '../api';
import Button from '../components/Button';
import Navbar from '../components/Navbar';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total, selected, questions, category } = location.state || {};
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [saveError, setSaveError] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const token = localStorage.getItem('token');
    if (user && token && score !== undefined && category) {
      setSaveStatus('saving');
      fetch(`${API_URL}/score`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({ category, score }),
      })
        .then(res => res.json().then(data => ({ ok: res.ok, data })))
        .then(({ ok, data }) => {
          if (!ok) throw new Error(data.message || 'Error saving score');
          setSaveStatus('success');
        })
        .catch(err => {
          setSaveStatus('error');
          setSaveError(err.message);
        });
    }
  }, [score, category]);

  if (!questions || !selected) {
    return (
      <div>
        <Navbar />
        <div className="p-8 text-red-600">No result data. Please take a quiz first.</div>
      </div>
    );
  }

  const percentage = Math.round((score / total) * 100);

  // Circular progress SVG
  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = Math.max(0, Math.min(percentage, 100));
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-3xl shadow-2xl border border-gray-100">
        <h1 className="text-3xl font-extrabold mb-6 text-center tracking-tight">Quiz Results</h1>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="flex-1 space-y-2">
            <div className="text-lg font-semibold">Category: <span className="font-bold text-indigo-700">{category}</span></div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-5 h-5 text-green-600">{/* check icon */}
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </span>
              <span>Total Correct: <span className="text-green-600 font-bold">{score}</span></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-block w-5 h-5 text-red-600">{/* cross icon */}
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </span>
              <span>Total Incorrect: <span className="text-red-600 font-bold">{total - score}</span></span>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <svg height={radius * 2} width={radius * 2} className="block">
                <circle
                  stroke="#e5e7eb"
                  fill="transparent"
                  strokeWidth={stroke}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
                <circle
                  stroke="#6366f1"
                  fill="transparent"
                  strokeWidth={stroke}
                  strokeDasharray={circumference + ' ' + circumference}
                  style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.5s' }}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-indigo-700">{isNaN(percentage) ? '0%' : `${percentage}%`}</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Score</div>
          </div>
        </div>
        <div className="mb-4 min-h-6">
          {saveStatus === 'saving' && <div className="text-blue-600">Saving score...</div>}
          {saveStatus === 'success' && <div className="text-green-600">Score saved!</div>}
          {saveStatus === 'error' && <div className="text-red-600">{saveError}</div>}
        </div>
        <hr className="my-6 border-gray-200" />
        <h2 className="text-xl font-bold mb-4">Review Answers</h2>
        <div className="space-y-4">
          {questions.map((q: any, idx: number) => {
            const isCorrect = selected[idx] === q.correctAnswer;
            return (
              <div key={idx} className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center bg-gray-50 ${isCorrect ? 'border-green-200' : 'border-red-200'}`}>
                <div className="flex-1">
                  <div className="font-medium mb-1">Q{idx + 1}: {q.question}</div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-block w-5 h-5 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>{isCorrect ? (
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    ) : (
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    )}</span>
                    <span>Your answer: <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>{selected[idx] || 'No answer'}</span></span>
                  </div>
                  <div>Correct answer: <span className="text-green-700 font-semibold">{q.correctAnswer}</span></div>
                  {q.explanation && <div className="text-gray-600 text-sm mt-1">Explanation: {q.explanation}</div>}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-4 mt-10">
          <Button onClick={() => navigate('/quiz')} className="w-full md:w-auto">Retry</Button>
          <Button onClick={() => navigate('/')} className="w-full md:w-auto">Return to Home</Button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage; 