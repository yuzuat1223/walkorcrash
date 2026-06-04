import React, { useState } from "react";
import { MdPeopleAlt } from "react-icons/md";
import "./Characters.css";

const characters = [
  { id: 1, name: "苗真", front: require("../pictures/front/C_1A.png"), back: require("../pictures/back/C_1B.png") },
  { id: 2, name: "郝任", front: require("../pictures/front/C_2A.png"), back: require("../pictures/back/C_2B.png") },
  { id: 3, name: "南桓", front: require("../pictures/front/C_3A.png"), back: require("../pictures/back/C_3B.png") },
  { id: 4, name: "李賀", front: require("../pictures/front/C_4A.png"), back: require("../pictures/back/C_4B.png") },
  { id: 5, name: "宜思", front: require("../pictures/front/C_5A.png"), back: require("../pictures/back/C_5B.png") },
  { id: 6, name: "劉鴻", front: require("../pictures/front/C_6A.png"), back: require("../pictures/back/C_6B.png") },
  { id: 7, name: "酒伊", front: require("../pictures/front/C_7A.png"), back: require("../pictures/back/C_7B.png") },
  { id: 8, name: "世濟", front: require("../pictures/front/C_8A.png"), back: require("../pictures/back/C_8B.png") },
  { id: 9, name: "哲興", front: require("../pictures/front/C_9A.png"), back: require("../pictures/back/C_9B.png") },
];

export default function Characters() {
  const [centerIndex, setCenterIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const prevCard = () => {
    setFlipped(false);
    setCenterIndex((prev) => (prev === 0 ? characters.length - 1 : prev - 1));
  };

  const nextCard = () => {
    setFlipped(false);
    setCenterIndex((prev) => (prev === characters.length - 1 ? 0 : prev + 1));
  };

  const getVisibleCards = () => {
    const result = [];
    for (let i = -2; i <= 2; i++) {
      let index = (centerIndex + i + characters.length) % characters.length;
      result.push({
        ...characters[index],
        position: i,
      });
    }
    return result;
  };

  return (
    <div className="characters-page">
      <div className="title-area">
        <div className="title-main">
          {/* 人像 Icon (SVG) */}
          <MdPeopleAlt size={24} color="#1E90FF" />
          <h1>人物圖鑑</h1>
        </div>
        <p>環狀目錄瀏覽，點擊中間卡片解鎖技能戰術</p>
      </div>

      <button className="nav-btn left" onClick={prevCard}>
        ❮
      </button>

      <div className="carousel">
        {getVisibleCards().map((card) => (
          <div key={card.id} className={`card-wrapper pos-${card.position}`}>
            <div
              className={`character-card ${card.position === 0 && flipped ? "flipped" : ""}`}
              onClick={() => card.position === 0 && setFlipped(!flipped)}
            >
              <div className="card-face card-front">
                <img src={card.front} alt={card.name} />
              </div>

              <div className="card-face card-back">
                <img src={card.back} alt={`${card.name} 背面`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="nav-btn right" onClick={nextCard}>
        ❯
      </button>
    </div>
  );
}