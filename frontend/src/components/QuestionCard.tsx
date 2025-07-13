import React from 'react';

type QuestionCardProps = {
  question: string;
  options: string[];
  selectedOption: string | null;
  onSelect: (option: string) => void;
};

const QuestionCard: React.FC<QuestionCardProps> = ({ question, options, selectedOption, onSelect }) => (
  <div className="mb-8 p-6 rounded-2xl shadow-xl bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 border-2 border-indigo-200">
    <h2 className="text-xl font-extrabold mb-6 text-indigo-700 drop-shadow">{question}</h2>
    <div className="space-y-3">
      {options.map((opt) => (
        <button
          key={opt}
          className={`w-full text-left p-3 rounded-xl border-2 font-semibold transition-all duration-150 shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-pink-300
            ${selectedOption === opt
              ? 'bg-gradient-to-r from-green-300 via-green-200 to-green-100 border-green-500 text-green-900 scale-105'
              : 'bg-white border-gray-300 hover:bg-indigo-50 hover:border-indigo-400'}
          `}
          onClick={() => onSelect(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

export default QuestionCard; 