import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleOlympiadsClick = (): void => {
    navigate('/olympiads');
  };

  const handleProfileClick = (): void => {
    navigate('/profile');
  };

  return (
    <Container className="mt-5 text-center">
      <h1>Система уведомлений об олимпиадах</h1>
      <p className="lead">Получайте уведомления о предстоящих олимпиадах</p>
      
      <div className="mt-4">
        <Button
          variant="primary" 
          className="me-3"
          onClick={handleOlympiadsClick}
        >
          Все олимпиады
        </Button>
        <Button 
          variant="success"
          onClick={handleProfileClick}
        >
          Личный кабинет
        </Button>
      </div>
    </Container>
  );
};

export default HomePage;