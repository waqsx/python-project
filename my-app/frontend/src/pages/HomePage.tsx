import React from 'react';
import { Container, Button, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Подключаем наши стили

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleOlympiadsClick = (): void => {
    navigate('/olympiads');
  };

  const handleProfileClick = (): void => {
    navigate('/profile');
  };

  const handleLoginClick = (): void => {
    navigate('/login');
  };

  const handleRegisterClick = (): void => {
    navigate('/register');
  };

  return (
    <div className="home-page">
      <Container className="hero-section">
        <h1 className="hero-title">Система уведомлений об олимпиадах</h1>
        <p className="hero-subtitle">
          Получайте персонализированные уведомления о предстоящих олимпиадах
        </p>
        
        <div className="cta-buttons">
          <Button
            variant="primary"
            size="lg"
            className="me-3 custom-btn"
            onClick={handleOlympiadsClick}
          >
            Все олимпиады
          </Button>
          <Button 
            variant="success"
            size="lg"
            className="me-3 custom-btn"
            onClick={handleProfileClick}
          >
            Личный кабинет
          </Button>
          
          <ButtonGroup className="auth-buttons">
            <Button
              variant="outline-primary"
              size="lg"
              className="custom-btn"
              onClick={handleLoginClick}
            >
              Вход
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="custom-btn"
              onClick={handleRegisterClick}
            >
              Регистрация
            </Button>
          </ButtonGroup>
        </div>
      </Container>

      <Container className="features-section">
        <div className="feature-card">
          <h3>📅 Актуальное расписание</h3>
          <p>Все олимпиады в одном календаре с удобными фильтрами</p>
        </div>
        <div className="feature-card">
          <h3>🔔 Умные уведомления</h3>
          <p>Напоминания за выбранное количество дней до мероприятия</p>
        </div>
        <div className="feature-card">
          <h3>📊 Персональная статистика</h3>
          <p>Отслеживайте свои достижения и прогресс</p>
        </div>
      </Container>
    </div>
  );
};

export default HomePage;