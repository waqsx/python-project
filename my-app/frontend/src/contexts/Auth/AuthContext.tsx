import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Token } from '../../api/types';
import { getCurrentUser, login as loginApi, register as registerApi } from '../../api/auth';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const userData = await getCurrentUser(token);
          setUser(userData);
        } catch (err) {
          console.error('Failed to load user', err);
          logout();
        }
      }
      setLoading(false);
    };
    
    loadUser();
  }, [token]);

  const login = async (username: string, password: string) => {
    try {
      const { access_token } = await loginApi(username, password);
      localStorage.setItem('token', access_token);
      setToken(access_token);
      const userData = await getCurrentUser(access_token);
      setUser(userData);
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const register = async (username: string, password: string) => {
    try {
      await registerApi({ username, password });
      await login(username, password); // Автовход после регистрации
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...userData });
    }
  };

  const value = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    loading,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};