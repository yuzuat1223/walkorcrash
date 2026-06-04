import React, { useState } from 'react';
import { taskCardsData } from './TaskData';
import { FaTasks } from "react-icons/fa";
import './Task.css';

const Task = () => {
  const [gameState, setGameState] = useState('idle'); 
  const [drawnCard, setDrawnCard] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);
  
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [flippedCardId, setFlippedCardId] = useState(null);

  const startShuffle = () => {
    if (gameState === 'shuffling') return;
    setGameState('shuffling');
    setDrawnCard(null);
    setFlippedCardId(null);

    setTimeout(() => {
      setGameState('ready');
    }, 2200);
  };

  const handleCardClick = (card) => {
    if (gameState !== 'ready') return;
    
    setDrawnCard(card);
    setFlippedCardId(card.id);
    setGameState('result');
    setHoveredIndex(null); 

    setTimeout(() => {
      setShowResultModal(true);
    }, 800);
  };

  const closeModal = () => {
    setShowResultModal(false);
    setFlippedCardId(null);
    setGameState('idle');
  };

  return (
  <div className="task-container">
    {/* 標題區塊 */}
    <div className="title-area">
      <div className="title-main">
        <FaTasks size={24} color="#2E8B57" />
        <h1>任務抽卡</h1>
      </div>
      <p>橫向檔案瀏覽，點擊中間卡片解鎖技能戰術</p>
    </div>

    {/* 主內容區 */}
    <div className="task-main-content">
      
      {/* 卡片展示舞台 */}
      <div className="card-deck-container">
        <div className={`card-cluster ${gameState}`}>
          {taskCardsData.map((card, index) => {
            // 精準抓取 12 張卡片的中間點（5.5）
            const midIndex = 5.5;
            const offset = index - midIndex;

            let currentZIndex = index;
            if (flippedCardId === card.id) {
              currentZIndex = 100;
            } else if (gameState === 'ready' && hoveredIndex === index) {
              currentZIndex = 99;
            }

            // 綁定 CSS 變數，用於控制一字排開的流暢進場動畫延遲
            let cardStyle = {
              zIndex: currentZIndex,
              '--card-index': Math.abs(offset) // 越靠外側的卡片越晚排開，形成往兩側推開的效果
            };

            // 🛠️ 關鍵調整：將間距從 48 放大到 64，卡片才不會重疊
            const rowTranslateX = offset * 64; 

            if (gameState === 'idle') {
              cardStyle.transform = `rotate(${offset * 0.4}deg) translate(${offset * 1.5}px, 0px)`;
            } else if (gameState === 'shuffling') {
              const isEven = index % 2 === 0;
              cardStyle['--shuffle-x'] = isEven ? `${-180 - (index * 4)}px` : `${180 + (index * 4)}px`;
              cardStyle['--shuffle-r'] = isEven ? `${-15 + index}deg` : `${15 - index}deg`;
              cardStyle.animationDelay = `${index * 0.04}s`;
            } else if (gameState === 'ready') {
              // 抽卡就位狀態下的 Hover 懸停浮起效果
              if (hoveredIndex === index) {
                cardStyle.transform = `translate(${rowTranslateX}px, -30px) scale(1.06)`;
              } else {
                cardStyle.transform = `translate(${rowTranslateX}px, 0px) scale(1)`;
              }
            } else if (gameState === 'result') {
              if (flippedCardId === card.id) {
                cardStyle.transform = `translate(${rowTranslateX}px, -40px) scale(1.1)`;
              } else {
                cardStyle.transform = 'translate(0px, 15px) scale(0.85)';
                cardStyle.opacity = 0.15;
              }
            }

            const isFlipped = flippedCardId === card.id;

            return (
              <div 
                key={card.id} 
                className="deck-card-wrapper" 
                style={cardStyle}
                onMouseEnter={() => gameState === 'ready' && setHoveredIndex(index)}
                onMouseLeave={() => gameState === 'ready' && setHoveredIndex(null)}
                onClick={() => handleCardClick(card)}
              >
                <div className={`card-inner ${isFlipped ? 'is-flipped' : ''}`}>
                  <div className="card-front">
                    <img src={card.imgFront} alt="正面預覽" className="card-img" />
                    {/* <div className="front-overlay">READY</div> */}
                  </div>
                  <div className="card-back">
                    <img src={card.imgBack} alt="背面內容" className="card-img" />
                    {/* <div className="back-overlay">UNLOCKED</div> */}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 控制按鈕 */}
      <button 
        className={`dispatch-button ${gameState !== 'idle' ? 'disabled' : ''}`} 
        onClick={startShuffle}
        disabled={gameState !== 'idle'}
      >
        <span className="target-icon">🎯</span>
        {gameState === 'idle' && '開始任務分派'}
        {gameState === 'shuffling' && '正在洗牌中...'}
        {gameState !== 'idle' && gameState !== 'shuffling' && '請選擇卡牌'}
      </button>
    </div>

    {/* 結果彈窗 */}
    {showResultModal && drawnCard && (
      <div className="result-modal-overlay" onClick={closeModal}>
        <div className="result-modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>🎉 檔案解密成功（特工內容）</h3>
            <button className="close-btn" onClick={closeModal}>&times;</button>
          </div>
          <div className="modal-body">
            <div className="result-card-img-wrapper">
              <div 
                className="result-card-img glitch-signal-effect" 
                style={{ 
                  backgroundImage: `url(${drawnCard.imgBack})`,
                  width: '100%',
                  height: '100%',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }} 
              />
            </div>
            <h4 className="result-card-name">{drawnCard.name}</h4>
            <p className="result-desc">⚡ 特工連線通道建立中，正在傳輸完整後勤數據...</p>
          </div>
          <div className="modal-footer">
            <button className="confirm-btn" onClick={closeModal}>確認接收任務</button>
          </div>
        </div>
      </div>
    )}
  </div>
); 
};

export default Task;