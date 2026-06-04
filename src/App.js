import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, NavLink, Navigate, Link } from 'react-router-dom';
import Rules from './pages/Rules';
import Characters from './pages/Characters';
import Task from './pages/Task';
import Question from './pages/Question';
import Map from './pages/Map';
import { translations } from './i18nData'; 
import './App.css';

// ==========================================
// 1. 首頁元件 (Home Component) - 傳入 t 讓文字連動
// ==========================================
const Home = ({ t }) => (
  <div className="hero-section">
    <div className="badge">{t.badge}</div>
    <h1 className="hero-title">{t.title1}<br /><span className="blue-text">{t.title2}</span></h1>
    <p className="hero-subtitle">{t.subtitle}</p>
    
    <div className="card-grid">
      <Link to="/rules" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="feature-card border-yellow" style={{ cursor: 'pointer' }}>
          <div className="card-icon-wrapper bg-yellow">
            <span className="card-icon">📖</span>
          </div>
          <div className="card-body">
            <h3>{t.navRules}</h3>
            <button className="card-btn">{t.btnLaunch}</button>
          </div>
        </div>
      </Link>

      {/* 人物圖鑑 */}
      <Link to="/characters" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="feature-card border-blue">
          <div className="card-icon-wrapper bg-blue">
            <span className="card-icon">👥</span>
          </div>
          <div className="card-body">
            <h3>{t.navCharacters}</h3>
            <button className="card-btn">{t.btnLaunch}</button>
          </div>
        </div>
      </Link>

      {/* 任務抽卡 */}
      <Link to="/task" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="feature-card border-green">
        <div className="card-icon-wrapper bg-green">
          <span className="card-icon">📋</span>
        </div>
        <div className="card-body">
          <h3>{t.navTask}</h3>
          <button className="card-btn">{t.btnLaunch}</button>
        </div>
      </div>
      </Link>

      {/* 問答題庫 */}
      <Link to="/question" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="feature-card border-purple">
        <div className="card-icon-wrapper bg-purple">
          <span className="card-icon">❓</span>
        </div>
        <div className="card-body">
          <h3>{t.navQuestion}</h3>
          <button className="card-btn">{t.btnLaunch}</button>
        </div>
      </div>
      </Link>

      {/* 建築景點 */}
      <Link to="/map" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="feature-card border-red">
        <div className="card-icon-wrapper bg-red">
          <span className="card-icon">📍</span>
        </div>
        <div className="card-body">
          <h3>{t.navMap}</h3>
          <button className="card-btn">{t.btnLaunch}</button>
        </div>
      </div>
      </Link>
    </div>
  </div>
);

// ==========================================
// 2. 其他預留分頁元件 (開發中提示)
// ==========================================
const PlaceholderPage = ({ title, t }) => (
  <div className="page-content">
    <h2>{title}</h2>
    <p>{t.developing}</p>
  </div>
);

// ==========================================
// 3. 主程式核心 (App Component)
// ==========================================
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // 語系狀態控制，預設為中文 'zh-TW'
  const [language, setLanguage] = useState('zh-TW');

  // 👇 2. 根據目前選取的語言，撈出對應的文字檔物件
  const t = translations[language];

  const closeMenu = () => setIsMenuOpen(false);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    console.log(`語系已切換為: ${e.target.value}`);
  };

  return (
    <Router>
      <div className="dashboard">
        
        {/* 手機版頂部工具列 */}
        <header className="mobile-header">
          <div className="mobile-logo">
            <img src="./logo.png" alt="Logo" />
          </div>
          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </header>

        {/* 手機版選單開啟時的背景遮罩 */}
        {isMenuOpen && <div className="sidebar-overlay" onClick={closeMenu}></div>}

        {/* 側邊欄 */}
        <aside className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
          <div className="logo-area">
            <img 
              src="/logo1.png" 
              alt="走鐘馬路 Logo" 
              style={{ width: '100%', maxWidth: '180px', height: 'auto', marginBottom: '10px' }} 
            />
          </div>

          {/* 👇 3. 把原本寫死的中文，換成 {t.xxx} */}
          <nav className="nav-links">
            <NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              <span className="icon">🏠</span> {t.navHome}
            </NavLink>
            <NavLink to="/rules" onClick={closeMenu} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              <span className="icon">📖</span> {t.navRules}
            </NavLink>
            <NavLink to="/characters" onClick={closeMenu} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              <span className="icon">👥</span> {t.navCharacters}
            </NavLink>
            <NavLink to="/task" onClick={closeMenu} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              <span className="icon">📋</span> {t.navTask}
            </NavLink>
            <NavLink to="/question" onClick={closeMenu} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              <span className="icon">❓</span> {t.navQuestion}
            </NavLink>
            <NavLink to="/map" onClick={closeMenu} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              <span className="icon">📍</span> {t.navMap}
            </NavLink>
          </nav>

          {/* 語言切換區塊 */}
          <div className="language-selector-wrapper">
            <div className="lang-label">
              <span className="icon">🌐</span> 語言 / Language
            </div>
            <select 
              className="language-select" 
              value={language} 
              onChange={handleLanguageChange}
            >
              <option value="zh-TW">繁體中文 (ZH)</option>
              <option value="en">English (EN)</option>
              <option value="ja">日本語 (JA)</option>
            </select>
          </div>

          <div className="system-info">
            <p>SYSTEM STATUS</p>
            <span className="status-tag">v1.2.0 - Stabilized</span>
          </div>
        </aside>

        {/* 右側變動內容區 */}
        <main className="content-area">
          <Routes>
            {/* 👇 4. 把目前的語系檔 t 傳入 Home 和 預留頁面 */}
            <Route path="/" element={<Home t={t} />} />
            
            {/* 注意：你原本寫好的 Rules 和 Characters 元件內部如果想連動，也要像 Home 一樣傳入 {t} 去改裡面的文字喔！ */}
            <Route path="/rules" element={<Rules t={t} />} />
            <Route path="/characters" element={<Characters t={t} />} />
            <Route path="/task" element={<Task t={t} />} />
            <Route path="/question" element={<Question t={t} />} />
            <Route path="/map" element={<Map t={t} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;