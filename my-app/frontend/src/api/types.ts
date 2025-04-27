export interface User {
  id: number;
  username: string;
  email?: string;  // Опционально, если используется
  notification_days: number;  // Добавляем отсутствующее поле
  created_at: string;
  // Другие поля по необходимости
}

export interface Olympiad {
  id: number;
  name: string;
  date: string;
  description?: string;
  registration_url?: string;
  source?: string;
}

// Добавляем интерфейс Token
export interface Token {
  access_token: string;
  token_type: string;
}

export interface UserCreate {
  username: string;
  password: string;
}

export interface UserUpdate {
  notification_days: number;
}

// Дополнительные типы для аутентификации
export interface LoginFormData {
  username: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: Token;
}