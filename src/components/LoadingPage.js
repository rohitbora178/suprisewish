import React from 'react';

const LoadingPage = () => (
  <div className="loading-page">
    <h1 className="loading-title">Preparing Your Special Message...</h1>
    <div className="loading-spinner">
      <div className="heart">❤️</div>
      <div className="heart">💖</div>
      <div className="heart">💕</div>
      <div className="heart">💗</div>
    </div>
    <p className="loading-text">Just a moment, something wonderful is coming!</p>
  </div>
);

export default LoadingPage;