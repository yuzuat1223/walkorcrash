import React, { useState, useEffect } from 'react';
import { questionCardsData } from './QuestionData';
import { HiQuestionMarkCircle } from "react-icons/hi";
import './Question.css';

const Question = () => {
  const [gameState, setGameState] = useState('idle'); // 'idle', 'shuffling', 'ready', 'result'
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [flippedCardId, setFlippedCardId] = useState(null);
  
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [shuffledPool, setShuffledPool] = useState([]);

  // 初始化時加載前 12 張進行關卡展示
  useEffect(() => {
    setShuffledPool(questionCardsData.slice(0, 12));
  }, []);

  // 觸發經典交錯洗牌動畫
  const startShuffle = () => {
    if (gameState === 'shuffling') return;
    setGameState('shuffling');
    setActiveQuestion(null);
    setFlippedCardId(null);
    setUserAnswer(null);
    setIsCorrect(null);

    const randomPool = [...questionCardsData]
      .sort(() => 0.5 - Math.random())
      .slice(0, 12);
    setShuffledPool(randomPool);

    setTimeout(() => {
      setGameState('ready');
    }, 2200);
  };

  // 點擊抽取卡片
  const handleCardClick = (card) => {
    if (gameState !== 'ready') return;
    
    setActiveQuestion(card);
    setFlippedCardId(card.id);
    setGameState('result');
    setHoveredIndex(null);
  };

  // 提交答案
  const handleAnswerSubmit = (ans) => {
    if (userAnswer !== null) return;
    setUserAnswer(ans);
    setIsCorrect(ans === activeQuestion.ans);
  };

  // 挑戰下一題重置（關閉彈窗）
  const handleReset = () => {
    setFlippedCardId(null);
    setActiveQuestion(null);
    setUserAnswer(null);
    setIsCorrect(null);
    setGameState('idle');
  };

  return (
    <div className="question-container">
      {/* 標題區塊 */}
      <div className="title-area">
        <div className="title-main">
          <HiQuestionMarkCircle size={24} color="#8A2BE2" />
          <h1>問答題庫</h1>
        </div>
        <p>隨機抽取加密考題，解鎖情報權限</p>
      </div>

      {/* 主內容區 */}
      <div className="question-main-content">
        
        {/* 卡片展示舞台區 */}
        <div className="card-deck-container">
          <div className={`card-cluster ${gameState}`}>
            {shuffledPool.map((card, index) => {
              const midIndex = 5.5;
              const offset = index - midIndex;

              let currentZIndex = index;
              if (gameState === 'ready' && hoveredIndex === index) {
                currentZIndex = 99;
              }

              let cardStyle = {
                zIndex: currentZIndex,
                '--card-index': Math.abs(offset)
              };

              const rowTranslateX = offset * 44;

              if (gameState === 'idle') {
                cardStyle.transform = `rotate(${offset * 0.5}deg) translate(${offset * 1.5}px, 0px)`;
              } else if (gameState === 'shuffling') {
                const isEven = index % 2 === 0;
                cardStyle['--shuffle-x'] = isEven ? `${-140 - (index * 3)}px` : `${140 + (index * 3)}px`;
                cardStyle['--shuffle-r'] = isEven ? `${-12 + index}deg` : `${12 - index}deg`;
                cardStyle.animationDelay = `${index * 0.04}s`;
              } else if (gameState === 'ready') {
                if (hoveredIndex === index) {
                  cardStyle.transform = `translate(${rowTranslateX}px, -30px) scale(1.06)`;
                } else {
                  cardStyle.transform = `translate(${rowTranslateX}px, 0px) scale(1)`;
                }
              } else if (gameState === 'result') {
                cardStyle.opacity = 0;
                cardStyle.pointerEvents = 'none';
                cardStyle.transform = `translate(${rowTranslateX}px, 40px) scale(0.7)`;
              }

              return (
                <div 
                  key={card.id} 
                  className="deck-card-wrapper" 
                  style={cardStyle}
                  onMouseEnter={() => gameState === 'ready' && setHoveredIndex(index)}
                  onMouseLeave={() => gameState === 'ready' && setHoveredIndex(null)}
                  onClick={() => handleCardClick(card)}
                >
                  <div className="card-inner">
                    <div className="card-front">
                      <img src={card.imgFront} alt="考題鎖定" className="card-img" />
                      <div className="front-overlay">TOP SECRET</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 下方初始控制按鈕區 */}
        <div className="control-action-zone">
          {gameState === 'idle' && (
            <button className="dispatch-button" onClick={startShuffle}>
              <span>🎯</span> 開始題目洗牌
            </button>
          )}

          {gameState === 'shuffling' && (
            <button className="dispatch-button" disabled>
              <span>🔄</span> 正在解密題目庫...
            </button>
          )}

          {gameState === 'ready' && (
            <div className="select-tip-badge">
              📡 請感應並抽取場上任一特工卡進行答題
            </div>
          )}
        </div>
      </div>

      {/* 中央特工檔案解密大彈窗 */}
      {gameState === 'result' && activeQuestion && (
        <div className="q-modal-overlay">
          <div className="q-modal-window">
            
            {/* 彈窗頂部欄 */}
            <div className="q-modal-header">
              <span className="q-modal-title">🎉 檔案解密成功（特工內容）</span>
              <button className="q-modal-close" onClick={handleReset}>×</button>
            </div>

            {/* 彈窗主體：大尺寸圖片展示 */}
            <div className="q-modal-body">
              <div className="q-big-card-display">
                <img src={activeQuestion.imgBack} alt="解密題目" className="q-modal-img" />
              </div>
              
              <div className="q-modal-info">
                <h3>特工檔案 {activeQuestion.id < 10 ? `0${activeQuestion.id}` : activeQuestion.id}</h3>
                <p className="q-modal-subtext">⚡ 特工連線通道建立中，正在傳輸完整後勤數據...</p>
              </div>
            </div>

            {/* 💡 修正 2：新增錯誤/正確狀態的動態提示區塊 */}
            {userAnswer !== null && (
              <div className={`quiz-feedback-badge ${isCorrect ? 'feedback-success' : 'feedback-error'}`}>
                {isCorrect ? (
                  <span>✅ 回答正確！成功解鎖情報！</span>
                ) : (
                  <span>❌ 回答錯誤！標準答案為 【 {activeQuestion.ans} 】，請繼續努力！</span>
                )}
              </div>
            )}

            {/* 彈窗底部：答題介面與操作按鈕 */}
            <div className="q-modal-footer">
              {/* 💡 修正 1：將 activeQuestion.type === 'TF' 改為 'binary' */}
              {activeQuestion.type === 'binary' ? (
                <div className="quiz-btn-group">
                  <button 
                    className={`quiz-ans-btn option-o ${userAnswer === 'O' ? 'selected' : ''} ${userAnswer && activeQuestion.ans === 'O' ? 'correct-highlight' : ''}`}
                    onClick={() => handleAnswerSubmit('O')}
                    disabled={userAnswer !== null}
                  >
                    ⭕ 正確 (O)
                  </button>
                  <button 
                    className={`quiz-ans-btn option-x ${userAnswer === 'X' ? 'selected' : ''} ${userAnswer && activeQuestion.ans === 'X' ? 'correct-highlight' : ''}`}
                    onClick={() => handleAnswerSubmit('X')}
                    disabled={userAnswer !== null}
                  >
                    ❌ 錯誤 (X)
                  </button>
                </div>
              ) : (
                <div className="quiz-btn-group">
                  {['A', 'B', 'C'].map((opt) => (
                    <button 
                      key={opt}
                      className={`quiz-ans-btn option-abc ${userAnswer === opt ? 'selected' : ''} ${userAnswer && activeQuestion.ans === opt ? 'correct-highlight' : ''}`}
                      onClick={() => handleAnswerSubmit(opt)}
                      disabled={userAnswer !== null}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* 答完後浮現下一題按鈕 */}
              {userAnswer !== null && (
                <button className="q-modal-confirm-btn" onClick={handleReset}>
                  確認接收任務，挑戰下一題 🔄
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  ); 
};

export default Question;