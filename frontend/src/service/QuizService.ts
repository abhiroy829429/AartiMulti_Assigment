import { API_URL } from './api';

export const fetchCategories = async () => {
  const res = await fetch(`${API_URL}/questions/categories`);
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
};

export const fetchQuestions = async (category: string) => {
  const res = await fetch(`${API_URL}/questions/${category}`);
  if (!res.ok) throw new Error('Failed to fetch questions');
  return res.json();
}; 