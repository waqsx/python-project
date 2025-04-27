import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../contexts/Auth/AuthContext';

const ProfilePage: React.FC = () => {
  const { user, isAuthenticated, logout, updateUser } = useAuth();
  const [notificationDays, setNotificationDays] = useState(7);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (user?.notification_days) {
      setNotificationDays(user.notification_days);
    }
  }, [user]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleSave = async () => {
    setLoading(true);
    try {
      // Здесь будет вызов API для сохранения настроек
      updateUser({ notification_days: notificationDays });
      setSuccess('Настройки сохранены');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="profile-page">
      <h1 className="mb-4">Личный кабинет</h1>
      
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Имя пользователя</Form.Label>
          <Form.Control 
            type="text" 
            value={user?.username || ''} 
            readOnly 
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Уведомлять за (дней до олимпиады)</Form.Label>
          <Form.Control
            type="number"
            min="1"
            max="30"
            value={notificationDays}
            onChange={(e) => setNotificationDays(Number(e.target.value))}
          />
        </Form.Group>

        {success && <Alert variant="success">{success}</Alert>}

        <div className="d-flex gap-2">
          <Button 
            variant="primary" 
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? <Spinner size="sm" /> : 'Сохранить'}
          </Button>
          
          <Button variant="outline-danger" onClick={logout}>
            Выйти
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default ProfilePage;