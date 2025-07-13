
const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <nav className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg rounded-b-2xl p-4 flex justify-between items-center mb-8">
      <div className="font-extrabold text-2xl text-white drop-shadow">Quiz App</div>
      <div className="space-x-4 flex items-center">
        <a href="/" className="text-white font-semibold hover:text-yellow-300 transition">Home</a>
        <a href="/leaderboard" className="text-white font-semibold hover:text-yellow-300 transition">Leaderboard</a>
        {user ? (
          <>
            <span className="text-yellow-100 font-semibold bg-black/20 px-2 py-1 rounded-lg">{user.name || user.email}</span>
            <button onClick={handleLogout} className="ml-2 text-red-200 hover:text-white font-bold transition">Logout</button>
          </>
        ) : (
          <a href="/login" className="text-white font-semibold hover:text-yellow-300 transition">Login</a>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 