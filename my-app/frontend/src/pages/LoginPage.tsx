import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useAuth } from '../contexts/Auth/AuthContext';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await login(username, password);
    } catch (err) {
      setError('Неверное имя пользователя или пароль');
      setLoading(false);
    }
  };

  return (
    <Container className="auth-container">
      <div className="auth-form">
        <h2 className="text-center mb-4">Вход в систему</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Имя пользователя</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit" 
            className="w-100"
            disabled={loading}
          >
            {loading ? <Spinner size="sm" /> : 'Войти'}
          </Button>
        </Form>

        <div className="text-center mt-3">
          <p>
            Нет аккаунта?{' '}
            <Button variant="link" onClick={() => navigate('/register')}>
              Зарегистрироваться
            </Button>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default LoginPage;