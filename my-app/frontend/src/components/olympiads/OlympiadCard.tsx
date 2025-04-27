import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Olympiad } from '../../api/types';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import './OlympiadCard.css'; // Стили для карточки

interface OlympiadCardProps {
  olympiad: Olympiad;
}

const OlympiadCard: React.FC<OlympiadCardProps> = ({ olympiad }) => {
  // Форматируем дату на русском языке
  const formattedDate = format(new Date(olympiad.date), 'dd MMMM yyyy', { locale: ru });
  
  // Определяем, является ли олимпиада ближайшей (в течение 7 дней)
  const isUpcoming = new Date(olympiad.date).getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000;

  return (
    <Card className="olympiad-card h-100">
      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <Card.Title className="mb-0">{olympiad.name}</Card.Title>
          {isUpcoming && <Badge bg="danger">Скоро</Badge>}
        </div>
        
        <Card.Subtitle className="mb-2 text-muted">
          <i className="bi bi-calendar-event me-2"></i>
          {formattedDate}
        </Card.Subtitle>
        
        {olympiad.source && (
          <Badge bg="info" className="mb-3 align-self-start">
            {olympiad.source}
          </Badge>
        )}
        
        <Card.Text className="flex-grow-1">
          {olympiad.description || 'Описание отсутствует'}
        </Card.Text>
        
        {olympiad.registration_url && (
          <Button 
            variant="primary" 
            href={olympiad.registration_url} 
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto"
          >
            <i className="bi bi-box-arrow-up-right me-2"></i>
            Регистрация
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default OlympiadCard;