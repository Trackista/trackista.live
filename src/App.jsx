import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import logo from './components/img/logo.png';
import ScreenerPage from './components/ScreenerPage';
import ScreenerPage1 from './components/ScreenerPage1';
import ChartPage from './components/ChartPage';
import DensityPage from './components/DensityPage';
import CommunityPage from './components/CommunityPage';

export default function App(){
  const [currentPage, setCurrentPage] = useState(() => {
    // Проверяем redirect path из error.html
    const redirectPath = localStorage.getItem('trackista-redirect-path');
    if (redirectPath) {
      localStorage.removeItem('trackista-redirect-path');
      const page = redirectPath.replace('/', '');
      const validPages = ['charts', 'screener', 'screener1', 'density', 'community'];
      if (validPages.includes(page)) {
        return page;
      }
    }
    
    // Сначала проверяем URL, затем localStorage
    const path = window.location.pathname.replace('/', '') || 'charts';
    const validPages = ['charts', 'screener', 'screener1', 'density', 'community'];
    const pageFromUrl = validPages.includes(path) ? path : null;
    
    return pageFromUrl || localStorage.getItem('trackista-current-page') || 'charts';
  });

  // Обработка изменений URL (для кнопок браузера)
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.replace('/', '') || 'charts';
      const validPages = ['charts', 'screener', 'screener1', 'density', 'community'];
      if (validPages.includes(path)) {
        setCurrentPage(path);
        localStorage.setItem('trackista-current-page', path);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  
  // Функция для закрытия мобильного меню
  const closeMobileMenu = () => {
    const navbarCollapse = document.querySelector('#navbarNav');
    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
      const bsCollapse = new window.bootstrap.Collapse(navbarCollapse, {
        toggle: false
      });
      bsCollapse.hide();
    }
  };
  
  // Функция для переключения страницы и закрытия меню
  const handlePageChange = (page) => {
    console.log(`Переключение на страницу: ${page}`);
    setCurrentPage(page);
    // Сохраняем текущую страницу в localStorage
    localStorage.setItem('trackista-current-page', page);
    // Обновляем URL без перезагрузки страницы
    const newUrl = page === 'charts' ? '/' : `/${page}`;
    window.history.pushState(null, '', newUrl);
    closeMobileMenu();
  };
  
  // Отладочная информация
  console.log('Текущая страница:', currentPage);
  
  return (
    <div className="app-container">
      {/* Навигационное меню */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <a 
            className="navbar-brand d-flex align-items-center" 
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handlePageChange('charts');
            }}
            style={{ cursor: 'pointer' }}
          >
            {/* Мобильная версия - компактный логотип */}
            <img 
              src={logo} 
              alt="Trackista" 
              className="me-2 d-lg-none" 
              style={{ width: '40px', height: '40px' }}
            />
            <span 
              className="d-lg-none" 
              style={{ fontSize: '1.2rem', fontWeight: 'bold' }}
            >
              Trackista
            </span>
            
            {/* Десктопная версия - полный логотип */}
            <img 
              src={logo} 
              alt="Trackista" 
              className="me-3 d-none d-lg-block" 
              style={{ width: '60px', height: '60px' }}
            />
            <span 
              className="d-none d-lg-block" 
              style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
            >
              Trackista
            </span>
          </a>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Десктопная навигация - показывается только на больших экранах */}
            <ul className="navbar-nav me-auto d-none d-lg-flex">
              <li className="nav-item">
                <button 
                  className={`nav-link btn btn-link text-decoration-none ${currentPage === 'charts' ? 'active text-warning' : 'text-white'}`}
                  onClick={() => handlePageChange('charts')}
                >
                  Графики
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link btn btn-link text-decoration-none ${currentPage === 'screener' ? 'active text-warning' : 'text-white'}`}
                  onClick={() => handlePageChange('screener')}
                >
                  Скринер
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link btn btn-link text-decoration-none ${currentPage === 'screener1' ? 'active text-warning' : 'text-white'}`}
                  onClick={() => handlePageChange('screener1')}
                >
                  Скринер1
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link btn btn-link text-decoration-none ${currentPage === 'density' ? 'active text-warning' : 'text-white'}`}
                  onClick={() => handlePageChange('density')}
                >
                  Плотность
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link btn btn-link text-decoration-none ${currentPage === 'community' ? 'active text-warning' : 'text-white'}`}
                  onClick={() => handlePageChange('community')}
                >
                  Сообщество
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link btn btn-link text-decoration-none ${currentPage === 'signals' ? 'active text-warning' : 'text-white'}`}
                  onClick={() => handlePageChange('signals')}
                >
                  Сигналы
                </button>
              </li>
            </ul>
            
            {/* Мобильная навигация - компактная версия с иконками */}
            <ul className="navbar-nav me-auto d-lg-none">
              <li className="nav-item">
                <button 
                  className={`nav-link btn btn-link text-decoration-none ${currentPage === 'charts' ? 'active text-warning' : 'text-white'}`}
                  onClick={() => handlePageChange('charts')}
                >
                  📈 Графики
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link btn btn-link text-decoration-none ${currentPage === 'screener' ? 'active text-warning' : 'text-white'}`}
                  onClick={() => handlePageChange('screener')}
                >
                  🔍 Скринер
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link btn btn-link text-decoration-none ${currentPage === 'screener1' ? 'active text-warning' : 'text-white'}`}
                  onClick={() => handlePageChange('screener1')}
                >
                  🔎 Скринер1
                </button>
              </li>
              <li className="nav-item">
                <button 
                  className={`nav-link btn btn-link text-decoration-none ${currentPage === 'density' ? 'active text-warning' : 'text-white'}`}
                  onClick={() => handlePageChange('density')}
                >
                  📊 Плотность
                </button>
              </li>
            </ul>
            
            {/* Login - только на десктопе */}
            <ul className="navbar-nav d-none d-lg-flex">
              <li className="nav-item">
                <a className="nav-link" href="#">Login</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Основной контент */}
      <div style={{ paddingTop: '80px' }}>
        {currentPage === 'charts' && <ChartPage />}
        {currentPage === 'screener' && <ScreenerPage />}
        {currentPage === 'screener1' && <ScreenerPage1 />}
        {currentPage === 'density' && <DensityPage />}
        {currentPage === 'community' && <CommunityPage />}
        {currentPage === 'signals' && <CommunityPage />}
      </div>
    </div>
  );
}
