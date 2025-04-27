import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import OlympiadsPage from './pages/OlympiadsPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/olympiads" element={<OlympiadsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
      </Routes>
    </Router>
  );
};

export default App;