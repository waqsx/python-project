import axios from 'axios';
import { User, Token, UserCreate } from './types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const register = async (userData: UserCreate): Promise<User> => {
  const response = await axios.post(`${API_URL}/api/v1/auth/register`, userData);
  return response.data;
};

export const login = async (username: string, password: string): Promise<Token> => {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  
  const response = await axios.post(`${API_URL}/api/v1/auth/token`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const getCurrentUser = async (token: string): Promise<User> => {
  const response = await axios.get(`${API_URL}/api/v1/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};