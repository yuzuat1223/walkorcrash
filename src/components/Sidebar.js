import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // 💡 【關鍵修正】請確保補上這一行來引入你的側邊欄樣式檔！
import { AiFillHome } from "react-icons/ai";
import { IoBook } from "react-icons/io5";
import { MdPeopleAlt } from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { HiQuestionMarkCircle } from "react-icons/hi";
import { GiPositionMarker } from "react-icons/gi";

const Sidebar = () => {
  // 💡 已為 menuItems 陣列中的每個 icon 組件配上與 App.js 字卡呼應的特別顏色
  const menuItems = [
    { path: '/', label: '首頁', icon: <AiFillHome color="#5b99ff" /> },               
    { path: '/rules', label: '規則介紹', icon: <IoBook color="#D4AF37" /> },           
    { path: '/characters', label: '人物圖鑑', icon: <MdPeopleAlt color="#1E90FF" /> }, 
    { path: '/quests', label: '任務抽卡', icon: <FaTasks color="#2E8B57" /> },         
    { path: '/faq', label: '問答題庫', icon: <HiQuestionMarkCircle color="#8A2BE2" /> }, 
    { path: '/map', label: '建築景點', icon: <GiPositionMarker color="#CD5C5C" /> },   
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