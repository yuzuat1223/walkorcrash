import React, { useState } from 'react';
import './Rules.css';

const Rules = () => {
  // 規則資料設定（總共 7 個階段）
  const rulesData = [
    {
      id: 1,
      title: '規則傳遞',
      subtitle: '數據傳輸中：第 1 / 7 階段',
      image: '/pictures/rules/s1.png', 
    },
    {
      id: 2,
      title: '規則傳遞',
      subtitle: '數據傳輸中：第 2 / 7 階段',
      image: '/pictures/rules/s2.png',
    },
    {
      id: 3,
      title: '規則傳遞',
      subtitle: '數據傳輸中：第 3 / 7 階段',
      image: '/pictures/rules/s3.png',
    },
    {
      id: 4,
      title: '規則傳遞',
      subtitle: '數據傳輸中：第 4 / 7 階段',
      image: '/pictures/rules/s4.png',
    },
    {
      id: 5,
      title: '規則傳遞',
      subtitle: '數據傳輸中：第 5 / 7 階段',
      image: '/pictures/rules/s5.png',
    },
    {
      id: 6,
      title: '規則傳遞',
      subtitle: '數據傳輸中：第 6 / 7 階段',
      image: '/pictures/rules/s6.png',
    },
    {
      id: 7,
      title: '規則傳遞',
      subtitle: '數據傳輸中：第 7 / 7 階段',
      image: '/pictures/rules/s7.png',
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentRule = rulesData[currentIndex] || rulesData[0];

  const handleNext = () => {
    if (currentIndex < rulesData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="rules-container">
      {/* 頂部標題與左右小切換鈕 */}
      <div className="rules-header">
        <div className="header-left">
          <div className="header-icon">📖</div>
          <div className="header-text">
            <h2>{currentRule.title}</h2>
            <p className="subtitle">{currentRule.subtitle}</p>
          </div>
        </div>
        <div className="header-nav-arrows">
          <button 
            className={`arrow-btn ${currentIndex === 0 ? 'disabled' : ''}`} 
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            〈
          </button>
          <button 
            className={`arrow-btn ${currentIndex === rulesData.length - 1 ? 'disabled' : ''}`} 
            onClick={handleNext}
            disabled={currentIndex === rulesData.length - 1}
          >
            〉
          </button>
        </div>
      </div>

      {/* 中央主主機板塊模擬視窗 */}
      <div className="rules-window">
        {/* 視窗左上角三色小圓點與右上角系統字樣 */}
        <div className="window-top-bar">
          <div className="window-dots">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
          </div>
          <div className="window-protocol">PROTOCOL_V2.0_SECURE</div>
        </div>

        {/* 視窗內部主要內容區（電波特效直接裝在這裡，讓它滿版） */}
        <div className="window-content glitch-wrapper">
          {/* 電視掃描線與螢幕閃爍濾鏡 */}
          <div className="tv-scanlines"></div>
          <div className="tv-flicker"></div>

          {/* 滿版圖片區 */}
          <div className="visual-area-full">
            <img 
              src={currentRule.image} 
              alt="Rule Visual" 
              className="rule-illustration glitch-img"
              onError={(e) => {
                e.target.style.display = 'none';
              }} 
            />
          </div>
        </div>

        {/* 視窗底部狀態列 */}
        <div className="window-footer">
          <div className="status-active">
            <span className="status-dot"></span> SYSTEM ACTIVE
          </div>
          <div className="packet-info">DECRYPTING_PACKET_0{currentRule.id}</div>
        </div>
      </div>

      {/* 下方分頁圓點進度條 */}
      <div className="dots-indicator">
        {rulesData.map((_, index) => (
          <span 
            key={index} 
            className={`indicator-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>

      {/* 最下方控制按鈕群 */}
      <div className="control-actions">
        <button 
          className={`btn-preview ${currentIndex === 0 ? 'hidden' : ''}`}
          onClick={handlePrev}
        >
          〈 PREVIEW
        </button>
        
        <button 
          className="btn-deploy"
          onClick={currentIndex === rulesData.length - 1 ? null : handleNext}
        >
          {currentIndex === rulesData.length - 1 ? 'PROTOCOL COMPLETE 〉' : 'DEPLOY NEXT 〉'}
        </button>
      </div>
    </div>
  );
};

export default Rules;