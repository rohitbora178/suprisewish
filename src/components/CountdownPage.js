import React from 'react';

const CountdownPage = ({ countdown }) => (
  <div className="countdown-page">
    <div className="countdown-container">
      <h2 className="countdown-text">Get Ready!</h2>
      <div className="countdown-number">{countdown}</div>
      <p className="countdown-message">Your special moment is here...</p>
    </div>
  </div>
);

export default CountdownPage;