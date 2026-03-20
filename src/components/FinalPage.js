import React from 'react';

const FinalPage = ({ onRestart }) => (
  <div className="final-page">
    <h1 className="final-title">Happy Happy Birthday Disha! 🎂🎉</h1>
    <p className="final-message">Wishing you a year filled with endless joy, love, and beautiful adventures! 💖✨</p>
    <div className="final-hearts">
      <span>🎈</span>
      <span>🎉</span>
      <span>🎊</span>
      <span>🎁</span>
    </div>

    <div className="balloons-container">
      <div className="balloon">🎈</div>
      <div className="balloon">🎈</div>
      <div className="balloon">🎈</div>
      <div className="balloon">🎈</div>
      <div className="balloon">🎈</div>
    </div>
    <div className="confetti-container">
      <div className="confetti-piece"></div>
      <div className="confetti-piece"></div>
      <div className="confetti-piece"></div>
      <div className="confetti-piece"></div>
      <div className="confetti-piece"></div>
      <div className="confetti-piece"></div>
      <div className="confetti-piece"></div>
      <div className="confetti-piece"></div>
      <div className="confetti-piece"></div>
      <div className="confetti-piece"></div>
    </div>

    <button onClick={onRestart} className="restart-btn">
      Start Over
    </button>
  </div>
);

export default FinalPage;