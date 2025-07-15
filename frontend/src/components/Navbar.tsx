import { useEffect, useRef, useState } from 'react';
import { logout } from '../service/LoginService';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [showPopup, setShowPopup] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setShowPopup(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg rounded-b-2xl p-4 flex justify-between items-center mb-8">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => (window.location.href = '/')}
      >
        <img src="/quiz-logo.png" alt="Quiz App Logo" className="w-10 h-10 mr-2 rounded" />
        <span className="font-extrabold text-2xl text-white drop-shadow">Quiz App</span>
      </div>
      <div className="space-x-4 flex items-center">
        <a href="/" className="text-white font-semibold hover:text-yellow-300 transition">Home</a>
        <a href="/leaderboard" className="text-white font-semibold hover:text-yellow-300 transition">Leaderboard</a>
        {user ? (
          <div className="relative" ref={profileRef}>
            <button
              className="ml-2 flex items-center justify-center w-10 h-10 rounded-full bg-yellow-100 text-indigo-700 font-bold text-lg border-2 border-white shadow"
              onClick={() => setShowPopup((v) => !v)}
              title={user.name || user.email}
            >
              <span role="img" aria-label="profile">👤</span>
            </button>
            {showPopup && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-50 py-2">
                <div className="px-4 py-2 text-indigo-700 font-semibold border-b border-gray-200 text-center">
                  {user.name || user.email}
                </div>
                <button
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <a href="/login" className="text-white font-semibold hover:text-yellow-300 transition">Login</a>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 