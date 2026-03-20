import React, { useState } from 'react';
import { emojis } from '../constants/emojis';

const ReviewPage = ({ onNext, onSubmit, isSubmitting, showSuccess, errorMessage }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [tempEmoji, setTempEmoji] = useState(null);
  const [currentStar, setCurrentStar] = useState(0);

  const handleRatingChange = (star) => {
    setCurrentStar(star);
    setTempEmoji(emojis[star]);
    setTimeout(() => {
      setTempEmoji(null);
      setRating(star);
    }, 1000);
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert('Please click on Stars to Rate');
      return;
    }
    if (reviewText.trim() === '') {
      alert('Please write a message before submitting');
      return;
    }
    onSubmit({ rating, reviewText });
  };

  return (
    <div className="review-page">
      <h1 className="review-title">💖 Share Your Birthday Thoughts 💖</h1>
      <p className="review-message">
        Thank you for spending this special moment with me! Your thoughts and feelings mean everything to me on your birthday. Please take a moment to share how you're feeling and leave me a personal message.
      </p>

      <div className="rating-section">
        <h3>How are you feeling on your special day?</h3>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <label key={star} className="star-label">
              <input
                type="radio"
                name="rating"
                value={star}
                onChange={() => handleRatingChange(star)}
                checked={rating === star}
              />
              <span className={`star ${rating > star ? 'filled' : ''} ${(rating === star || (tempEmoji && currentStar === star)) ? 'emoji' : ''}`}>
                {tempEmoji && currentStar === star ? tempEmoji : rating === star ? emojis[star] : '⭐'}
              </span>
            </label>
          ))}
        </div>
      </div>
      <div className="review-text-section">
        <h3>Leave a message for me</h3>
        <textarea
          className="review-textarea"
          placeholder="Write your thoughts here..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows="4"
        />
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <button onClick={handleSubmit} className="submit-btn">
        Send My Message →
      </button>
      <div className="review-hearts">
        <span>💕</span>
        <span>💖</span>
        <span>💗</span>
      </div>
      {(isSubmitting || showSuccess) && (
        <div className="success-overlay">
          <div className="success-box">
            <div className="success-icon">{isSubmitting ? '⏳' : '✅'}</div>
            <h2>{isSubmitting ? 'Sending your message...' : 'Message Sent Successfully!'}</h2>
            <p>
              {isSubmitting
                ? 'Please wait while I receive your special birthday message...'
                : 'Your message means the world to me. Thank you for sharing your thoughts! 💖'}
            </p>
            <div className="success-hearts">
              <span>🎉</span>
              <span>✨</span>
              <span>💫</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewPage;