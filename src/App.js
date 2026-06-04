import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, NavLink, Navigate, Link } from 'react-router-dom';
import Rules from './pages/Rules';
import Characters from './pages/Characters';
import Task from './pages/Task';
import Question from './pages/Question';
import Map from './pages/Map';
import { translations } from './i18nData'; // 💡 確保這一行沒有被註解掉！
import { AiFillHome } from "react-icons/ai";
import { IoBook } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { GiPositionMarker } from "react-icons/gi";
import './App.css';

const Home = ({ t }) => (
  <div className="hero-section">
    <h1 className="hero-title">{t.title1}<br /><span className="blue-text">{t.title2}</span></h1>
    <p className="hero-subtitle">{t.subtitle}</p>
    
    <div className="card-grid">
      <Link to="/rules" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="feature-card border-yellow" style={{ cursor: 'pointer' }}>
          <div className="card-icon-wrapper bg-yellow">
            <span className="card-icon"><IoBook size={24} color="#D4AF37" /></span>
          </div>
          <div className="card-body">
            <h3>{t.navRules}</h3>
            <button className="card-btn">{t.btnLaunch}</button>
          </div>
        </div>
      </Link>

      <Link to="/characters" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="feature-card border-blue">
          <div className="card-icon-wrapper bg-blue">
            <span className="card-icon"><MdPeopleAlt size={24} color="#1E90FF" /></span>
          </div>
          <div className="card-body">
            <h3>{t.navCharacters}</h3>
            <button className="card-btn">{t.btnLaunch}</button>
          </div>
        </div>
      </Link>

      <Link to="/task" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="feature-card border-green">
          <div className="card-icon-wrapper bg-green">
            <span className="card-icon"><FaTasks size={24} color="#2E8B57" /></span>
          </div>
          <div className="card-body">
            <h3>{t.navTask}</h3>
            <button className="card-btn">{t.btnLaunch}</button>
          </div>
        </div>
      </Link>

      <Link to="/question" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="feature-card border-purple">
          <div className="card-icon-wrapper bg-purple">
            <span className="card-icon"><HiQuestionMarkCircle size={24} color="#8A2BE2" /></span>
          </div>
          <div className="card-body">
            <h3>{t.navQuestion}</h3>
            <button className="card-btn">{t.btnLaunch}</button>
          </div>
        </div>
      </Link>

      <Link to="/map" style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="feature-card border-red">
          <div className="card-icon-wrapper bg-red">
            <span className="card-icon"><GiPositionMarker size={24} color="#CD5C5C" /></span>
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

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('zh-TW');

  // 💡 這裡會讀取上方 import 進來的 translations 變數
  const t = translations[language] || {
    title1: "走鐘馬路", title2: "WALK OR CRASH", subtitle: "戰術指揮總部",
    navHome: "首頁", navRules: "規則介紹", navCharacters: "人物圖鑑",
    navTask: "任務抽卡", navQuestion: "問答題庫", navMap: "建築景點", btnLaunch: "進入系統"
  };

  const closeMenu = () => setIsMenuOpen(false);
  const handleLanguageChange = (e) => setLanguage(e.target.value);

  return (
    <Router>
      <div className="dashboard">
        <header className="mobile-header">
          <div className="mobile-logo">
            <img src={require('./pictures/logo.png')} alt="Logo" />
          </div>
          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </header>

        {isMenuOpen && <div className="sidebar-overlay" onClick={closeMenu}></div>}

        <aside className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
          <div className="logo-area">
            <img 
              src={require('./pictures/logo1.png')} 
              alt="走鐘馬路 Logo" 
              style={{ width: '100%', maxWidth: '180px', height: 'auto', marginBottom: '10px' }} 
            />
          </div>

          <nav className="nav-links">
            <NavLink to="/" onClick={closeMenu} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              <span className="icon"><AiFillHome /></span> {t.navHome}
            </NavLink>
            <NavLink to="/rules" onClick={closeMenu} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              <span className="icon"><IoBook /></span> {t.navRules}
            </NavLink>
            <NavLink to="/characters" onClick={closeMenu} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              <span className="icon"><MdPeopleAlt /></span> {t.navCharacters}
            </NavLink>
            <NavLink to="/task" onClick={closeMenu} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              <span className="icon"><FaTasks /></span> {t.navTask}
            </NavLink>
            <NavLink to="/question" onClick={closeMenu} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              <span className="icon"><HiQuestionMarkCircle /></span> {t.navQuestion}
            </NavLink>
            <NavLink to="/map" onClick={closeMenu} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
              <span className="icon"><GiPositionMarker /></span> {t.navMap}
            </NavLink>
          </nav>

          <div className="language-selector-wrapper">
            <div className="lang-label"><span className="icon">🌐</span> 語言 / Language</div>
            <select className="language-select" value={language} onChange={handleLanguageChange}>
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

        <main className="content-area">
          <Routes>
            <Route path="/" element={<Home t={t} />} />
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