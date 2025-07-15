import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import CategoryCard from '../components/CategoryCard';
import Navbar from '../components/Navbar';

const categories = [
  'HTML',
  'JavaScript',
  'Git',
  'CSS',
  'React',
];

const HomePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const handleCategoryClick = (category: string) => {
    navigate('/quiz', { state: { category } });
  };

  const handleLogin = () => {
    localStorage.setItem('loginToTrack', 'true');
    navigate('/login');
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Select a Quiz Category</h1>
        <div className="mb-6">
          {categories.map((cat) => (
            <CategoryCard key={cat} name={cat} onClick={() => handleCategoryClick(cat)} />
          ))}
        </div>
        {!user && (
          <Button onClick={handleLogin} className="w-full mt-2">Login to track your scores</Button>
        )}
      </div>
    </div>
  );
};

export default HomePage; 