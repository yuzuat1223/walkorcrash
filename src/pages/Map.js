// Map.js
import React, { useState } from 'react';
import { mapCardsData } from './MapData';
import { GiPositionMarker } from "react-icons/gi";
import './Map.css';

const Map = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const openModal = (card) => {
    setSelectedCard(card);
  };

  const closeModal = () => {
    setSelectedCard(null);
  };

  return (
    <div className="map-container">
      {/* 頂部標題區 */}
      <div className="title-area">
        <div className="title-main">
          <GiPositionMarker size={24} color="#CD5C5C" />
          <h1>建築景點</h1>
        </div>
        <p>了解各大場景與建築的詳細資訊</p>
      </div>

      {/* 主內容卡片網格 */}
      <div className="map-main-content">
        <div className="map-grid">
          {mapCardsData.map((card) => (
            <div key={card.id} className="map-card" onClick={() => openModal(card)}>
              <span className="card-sector">{card.sector}</span>
              
              {/* 卡片上半部：對應的地點圖片 */}
              <div className="card-image-area">
                <img 
                  src={card.img} 
                  alt={card.title} 
                  className="card-img" 
                  onError={(e) => { e.target.style.opacity = '0.2'; }} // 防破圖備用樣式
                />
              </div>

              {/* 卡片下半部：標題與簡介 */}
              <div className="card-info-area">
                <h3 className="card-title">
                  <svg className="info-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21C16 16.8 19 13.2222 19 9.66667C19 5.43248 15.866 2 12 2C8.13401 2 5 5.43248 5 9.66667C5 13.2222 8 16.8 12 21Z" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="12" cy="9.5" r="2" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  {card.title}
                </h3>
                <p className="card-desc">{card.desc}</p>
              </div>

              <div className="card-footer">
                <span className="tap-text">TAP FOR DETAILS</span>
                <span className="arrow-icon">➔</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 詳細情報彈窗 (Modal) */}
      {selectedCard && (
        <div className="intel-modal-overlay" onClick={closeModal}>
          <div className="intel-modal-content" onClick={(e) => e.stopPropagation()}>
            
            {/* 右上角關閉按鈕 */}
            <button className="intel-close-btn" onClick={closeModal}>&times;</button>

            {/* 左側：顯示選定地點的「大尺寸對應圖片」 */}
            <div className="intel-modal-left">
              <div className="intel-big-image-wrapper">
                <img 
                  src={selectedCard.img} 
                  alt={selectedCard.title} 
                  className="intel-big-img" 
                />
                {/* 可以選配一層精美的掃描線或全息投影效果 */}
                <div className="hologram-overlay"></div>
              </div>
            </div>

            {/* 右側：詳細文字情報 */}
            <div className="intel-modal-right">
              <span className="intel-subtitle">DETAILED INTEL</span>
              
              <h2 className="intel-title">
                <span className="intel-title-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="22" height="22">
                    <path d="M12 21C16 16.8 19 13.2222 19 9.66667C19 5.43248 15.866 2 12 2C8.13401 2 5 5.43248 5 9.66667C5 13.2222 8 16.8 12 21Z" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </span>
                {selectedCard.title}
              </h2>

              <div className="intel-divider"></div>

              <div className="intel-desc-box">
                <p>{selectedCard.desc}</p>
              </div>

              <div className="intel-location-tag">
                <span className="dot">●</span> SECTOR LOCATION: <span className="loc-text">{selectedCard.sector.replace('SECTOR: ', '')}</span>
              </div>

              <button className="intel-return-btn" onClick={closeModal}>
                回情報列表
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  ); 
};

export default Map;