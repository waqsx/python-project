import { Outlet } from 'react-router-dom'; // Добавьте этот импорт

const Layout = () => {
  return (
    <div className="app-layout">
      {/* Шапка сайта */}
      <header>
        <nav>Навигационное меню</nav>
      </header>
      
      {/* Основное содержимое - ОБЯЗАТЕЛЬНЫЙ Outlet */}
      <main>
        <Outlet />
      </main>
      
      {/* Подвал сайта */}
      <footer>© 2024 Мое приложение</footer>
    </div>
  );
};

export default Layout;