import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import QuestionCard from '../components/QuestionCard';
import { API_URL } from '../service/api';

const QUESTION_TIME = 20; // seconds

const QuizPage = () => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<(string | null)[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(QUESTION_TIME);
  const timerRef = useRef<number | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const category = location.state?.category || 'HTML';

  useEffect(() => {
    setLoading(true);
    console.log(API_URL);
    fetch(`${API_URL}/questions/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setSelected(Array(data.length).fill(null));
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load questions');
        setLoading(false);
      });
  }, [category]);

  // Timer logic
  useEffect(() => {
    setTimer(QUESTION_TIME);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [current, questions.length]);

  useEffect(() => {
    if (timer === 0) {
      if (current < questions.length - 1) {
        setCurrent((c) => c + 1);
      } else {
        handleSubmit();
      }
    }
    // eslint-disable-next-line
  }, [timer]);

  const handleSelect = (option: string) => {
    setSelected((prev) => prev.map((sel, idx) => (idx === current ? option : sel)));
  };

  const handleNext = () => {
    setCurrent((c) => Math.min(c + 1, questions.length - 1));
  };
  const handlePrev = () => {
    setCurrent((c) => Math.max(c - 1, 0));
  };
  const handleSkip = () => {
    setCurrent((c) => Math.min(c + 1, questions.length - 1));
  };

  const handleSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selected[idx] === q.correctAnswer) correct++;
    });
    navigate('/result', {
      state: {
        score: correct,
        total: questions.length,
        selected,
        questions,
        category,
      },
    });
  };

  if (loading) return <div><Navbar /><div className="p-8">Loading...</div></div>;
  if (error) return <div><Navbar /><div className="p-8 text-red-600">{error}</div></div>;
  if (!questions.length) return <div><Navbar /><div className="p-8">No questions found.</div></div>;

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <div className="mb-2 text-sm text-gray-500 flex justify-between items-center">
          <span>Question {current + 1} of {questions.length}</span>
          <span className={timer <= 5 ? 'text-red-600 font-bold' : 'text-gray-700'}>Time left: {timer}s</span>
        </div>
        <QuestionCard
          question={questions[current].question}
          options={questions[current].options}
          selectedOption={selected[current]}
          onSelect={handleSelect}
        />
        <div className="flex justify-between mt-4 gap-2">
          <Button onClick={handlePrev} className="flex items-center gap-1" disabled={current === 0}>
            <span className="text-lg">&#8592;</span> Previous
          </Button>
          <Button onClick={handleSkip} className="flex items-center gap-1" disabled={current === questions.length - 1}>
            <span className="text-lg">⏭️</span> Skip
          </Button>
          <Button onClick={handleNext} className="flex items-center gap-1" disabled={current === questions.length - 1}>
            Next <span className="text-lg">&#8594;</span>
          </Button>
        </div>
        <div className="mt-6 text-right">
          <Button onClick={handleSubmit}>Submit Quiz</Button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage; 