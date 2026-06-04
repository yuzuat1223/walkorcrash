import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { path: '/', label: '首頁', icon: '🏠' },
    { path: '/rules', label: '規則介紹', icon: '📖' },
    { path: '/characters', label: '人物圖鑑', icon: '👥' },
    { path: '/quests', label: '任務抽卡', icon: '📋' },
    { path: '/faq', label: '問答題庫', icon: '❓' },
    { path: '/map', label: '建築景點', icon: '📍' },
  ];

  return (
    <aside className="sidebar">
      <div className="logo-section">
        <h1 className="logo-text">走鐘馬路</h1>
        <p className="logo-sub">WALK OR CRASH</p>
      </div>

      <nav className="nav-menu">
        {menuItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path}
            className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}
          >
            <span className="icon">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="system-status">
        <p>SYSTEM STATUS</p>
        <span>v1.2.0 - Stabilized</span>
      </div>
    </aside>
  );
};

export default Sidebar;