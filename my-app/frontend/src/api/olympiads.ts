import axios from 'axios';
import { Olympiad } from './types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Переименуем fetchOlympiads в getOlympiads для соответствия импорту
export const getOlympiads = async (token: string, days?: number): Promise<Olympiad[]> => {
  const response = await axios.get(`${API_URL}/api/v1/olympiads`, {
    headers: { Authorization: `Bearer ${token}` },
    params: { days }
  });
  return response.data;
};

// Остальные функции можно оставить как есть
export const getAllOlympiads = async (token: string): Promise<Olympiad[]> => {
  const response = await axios.get(`${API_URL}/api/v1/olympiads/all`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const parseOlympiads = async (token: string): Promise<void> => {
  await axios.post(`${API_URL}/api/v1/olympiads/parse`, {}, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};