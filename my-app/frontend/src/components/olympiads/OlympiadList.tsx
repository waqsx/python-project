import React, { useEffect, useState } from 'react';
import { Spinner, Alert, Button } from 'react-bootstrap';
import { useAuth } from '../../contexts/Auth/AuthContext';
import { getOlympiads } from '../../api/olympiads';
import { Olympiad } from '../../api/types';
import OlympiadCard from './OlympiadCard';
import { useNavigate } from 'react-router-dom';
import './OlympiadList.css';

const OlympiadList: React.FC = () => {
  const navigate = useNavigate();
  const { token, isAuthenticated, user } = useAuth();
  const [olympiads, setOlympiads] = useState<Olympiad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOlympiads = async () => {
      try {
        // Проверяем наличие токена
        if (!token) {
          setLoading(false);
          return;
        }

        const days = isAuthenticated ? user?.notification_days || 7 : 7;
        const data = await getOlympiads(token, days);
        setOlympiads(data);
      } catch (err) {
        setError('Не удалось загрузить список олимпиад');
        console.error('Ошибка загрузки:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOlympiads();
  }, [token, isAuthenticated, user?.notification_days]);

  // Если нет токена (пользователь не авторизован)
  if (!token) {
    return (
      <div className="auth-required-message">
        <Alert variant="warning" className="text-center">
          Для просмотра олимпиад необходимо авторизоваться
        </Alert>
        <div className="d-flex justify-content-center gap-3 mt-3">
          <Button variant="primary" onClick={() => navigate('/login')}>
            Войти
          </Button>
          <Button variant="outline-primary" onClick={() => navigate('/register')}>
            Зарегистрироваться
          </Button>
        </div>
      </div>
    );
  }

  // Состояние загрузки
  if (loading) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Загрузка олимпиад...</p>
      </div>
    );
  }

  // Обработка ошибок
  if (error) {
    return (
      <Alert variant="danger">
        {error}
        <div className="mt-2">
          <Button variant="outline-danger" size="sm" onClick={() => window.location.reload()}>
            Попробовать снова
          </Button>
        </div>
      </Alert>
    );
  }

  // Если олимпиад нет
  if (olympiads.length === 0) {
    return (
      <Alert variant="info">
        Нет предстоящих олимпиад в выбранном периоде
        {isAuthenticated && user?.notification_days && (
          <span> (на {user.notification_days} дней)</span>
        )}
      </Alert>
    );
  }

  // Основное отображение списка олимпиад
  return (
    <div className="olympiads-grid">
      {olympiads.map((olympiad) => (
        <OlympiadCard key={olympiad.id} olympiad={olympiad} />
      ))}
    </div>
  );
};

export default OlympiadList;