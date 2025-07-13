import React from 'react';

type CategoryCardProps = {
  name: string;
  onClick: () => void;
};

const emojiMap: Record<string, string> = {
  HTML: '🌐',
  CSS: '🎨',
  JavaScript: '✨',
  React: '⚛️',
  General: '🧠',
};

const CategoryCard: React.FC<CategoryCardProps> = ({ name, onClick }) => (
  <div
    className="cursor-pointer bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 hover:from-blue-300 hover:to-pink-200 rounded-2xl p-6 shadow-xl mb-4 text-center transition-transform transform hover:scale-105 border-2 border-indigo-200"
    onClick={onClick}
  >
    <span className="text-3xl mr-2 align-middle">{emojiMap[name] || '📝'}</span>
    <span className="font-extrabold text-xl text-indigo-700 align-middle drop-shadow">{name}</span>
  </div>
);

export default CategoryCard; 