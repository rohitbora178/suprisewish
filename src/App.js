import React, { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import "./App.css";

function App() {
  const [page, setPage] = useState(0);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [tempEmoji, setTempEmoji] = useState(null);
  const [currentStar, setCurrentStar] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const emojis = {
    1: '😢',
    2: '😐',
    3: '😊',
    4: '😄',
    5: '😍'
  };

  const handleSubmit = () => {
    if (rating === 0) {
      setErrorMessage('Please click on Stars to Rate');
      return;
    }
    if (reviewText.trim() === '') {
      setErrorMessage('Please write a message before submitting');
      return;
    }
    setErrorMessage('');
    setIsSubmitting(true);
    setShowSuccess(false);
    sendEmail();
  };

  const handleRatingChange = (star) => {
    setCurrentStar(star);
    setTempEmoji(emojis[star]);
    setTimeout(() => {
      setTempEmoji(null);
      setRating(star);
    }, 1000);
  };

  const sendEmail = async () => {
    try {
      await emailjs.send(
        'service_lvvgut5',
        'template_jzsl8ha',
        {
          rating: rating,
          message: reviewText,
          to_email: 'rohitbora178@gmail.com',
          name: `Rating: ${rating} stars`, // Add name for template
          time: new Date().toLocaleString() // Add current time
        },
        '1peIaKL7OaR0TBd0f'
      );
      setIsSubmitting(false);
      setShowSuccess(true);
      // Clear the form after successful submission
      setRating(0);
      setReviewText('');
      setTimeout(() => {
        setShowSuccess(false);
        setPage(5);
      }, 3000);
    } catch (error) {
      setIsSubmitting(false);
      setErrorMessage('Failed to send review. Please try again.');
      alert('Failed to send review. Please try again.');
      console.error('Email send error:', error);
    }
  };

  useEffect(() => {
    if (page === 1) {
      const timer = setTimeout(() => setPage(2), 3000);
      return () => clearTimeout(timer);
    }
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case 0:
        return (
          <div className="surprise-box">
            <h1>🎁 A Surprise For You</h1>
            <p className="subtitle">Tap the gift to open your message</p>
            <button onClick={() => setPage(1)} className="btn">
              Open the Gift
            </button>
            <div className="sparkles">
              <span>✨</span>
              <span>✨</span>
              <span>✨</span>
            </div>
          </div>
        );
      case 1:
        return (
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
      case 2:
        return (
          <div className="card">
            <div className="cardHeader">
              <img
                className="cardImage"
                src="/llb.jpg"
                alt="Disha"
              />
            </div>

            <h1 className="title">🎂 Happy Birthday Disha 🎂</h1>
            <h3 className="date">03 / 04 / 2026</h3>

            <p className="message">
              Dear Disha,

              <br /><br />

              Today is a very special day because it is the day a wonderful
              person came into this world. I just wanted to take a moment to
              wish you a very joyful and beautiful birthday.

              <br /><br />

              You are truly a very important person in my life. Your presence,
              your smile, and the way you bring positivity to the people around
              you means more than words can explain. There are some people we
              meet in life who quietly become special to our hearts, and you
              are one of those rare people.

              <br /><br />

              I also want to say something honestly from my heart. I sincerely
              apologize for the mistakes I made in the past. If anything I did
              ever hurt you or made you uncomfortable, please know it was never
              my intention. I truly regret those moments.

              <br /><br />

              What I genuinely wish for is something simple and pure — your
              good friendship. Nothing more, nothing less. Having you as a
              friend is already something valuable to me.

              <br /><br />

              On your birthday, I just hope your day is filled with happiness,
              laughter, success, and beautiful moments. May your life always be
              surrounded by positivity, achievements, and the kind of joy that
              makes your smile shine even brighter.

              <br /><br />

              I hope when you read this message, it brings a small smile to your
              face. That alone would make me really happy.

              <br /><br />

              Once again, Happy Birthday Disha. 🎉
              May your dreams come true and may life always be kind to you.

              <br /><br />

              Keep smiling always. 😊
            </p>

            <button onClick={() => setPage(3)} className="next-btn">
              See Memories
            </button>

            <div className="hearts">
              <span>❤️</span>
              <span>💖</span>
              <span>💕</span>
              <span>💗</span>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="memories-page">
            <h1 className="memories-title">🌳 Our Memories Tree</h1>
            <div className="memories-content">
              <p>
                Our story began simply — a chat on Snapchat that slowly became
                the part of the day we both looked forward to.
              </p>
              <p>
                From Snapchat we moved to Instagram, and then the conversations
                became deeper, sincere, and more meaningful. Before long we
                weren’t just talking – we were sharing our dreams, our
                laughter, and our quiet moments.
              </p>

              <div className="branch">
                <h2>🌱 Our First Meeting — 18 January 2025</h2>
                <img src="https://b.zmtcdn.com/data/pictures/7/6507967/2529c13e9a33a2a9ffd531f1a79cbe99.jpg?fit=around|960:500&crop=960:500;*,*" alt="First Meeting" className="branch-img" />
                <p>
                  I still remember waiting outside Wadeshwar on FC Road. You
                  walked toward me in a light pink top, blue jeans, and white
                  shoes. The moment felt like time slowed down.
                </p>
                <p>
                  You sat behind me on my bike, and we rode to Tales & Spirits
                  where we tried sushi with chopsticks (and laughed when we
                  failed). It was simple, shy, and perfect.
                </p>
              </div>

              <div className="branch">
                <h2>🎬 Movie Time</h2>
                <img src="https://english.cdn.zeenews.com/sites/default/files/styles/zm_500x286/public/2025/03/19/1703292-jh234-2025-03-19t202030.184.png" alt="Movie Time" className="branch-img" />
                <p>
                  We watched “Azaad” together. We laughed, whispered, and just
                  enjoyed being together. That simple movie night became one of
                  my favorite memories.
                </p>
              </div>

              <div className="branch">
                <h2>☕ Coffee & Sarasbaug</h2>
                <img src="https://images.trvl-media.com/place/6170139/c08972a7-a194-4133-9dd6-139fac768c8a.jpg" alt="Coffee & Sarasbaug" className="branch-img" />
                <p>
                  After the movie, we went to Pavilion Mall for coffee, then
                  walked to Sarasbaug. You shared your thoughts and I listened
                  — it felt like we were learning each other in the most
                  natural way.
                </p>
                <p>
                  We ended the evening with Chinese Bhel, and when I dropped you
                  at the metro, you held my hand for the very first time.
                </p>
              </div>

              <div className="branch">
                <h2>🧡 Second Meeting</h2>
                <img src="https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/2018/05/07175849/08052018_kingofgame_bowling_01.jpg" alt="Second Meeting" className="branch-img" />
                <p>
                  You called and said, “I’m coming to Pune today.” We met at Kumar
                  Pacific Mall, played games, visited Shankar Maharaj Math, ate
                  Kalyan Bhel, and had ice cream. It was another day filled with
                  laughter and small moments.
                </p>
              </div>

              <div className="branch">
                <h2>🎂 Third Meeting — Your Birthday</h2>
                <img src="https://media-cdn.tripadvisor.com/media/photo-s/09/1f/b3/97/wadeshwar.jpg" alt="Third Meeting" className="branch-img" />
                <p>
                  You looked so beautiful in a white top. I brought your favorite
                  cheesecake, and we celebrated quietly. We even took a photo
                  (which we sadly don’t have anymore) — but the memory is still
                  alive.
                </p>
                <p>
                  That day we ate dosa, laughed, and talked. Even after you
                  went home, our chats kept the connection alive.
                </p>
              </div>

              <div className="memory-gallery">
                <h2>📸 More Memories</h2>
                <div className="gallery-grid">
                  <img src="/collage.jpg" alt="Memory 10" className="gallery-img" loading="lazy" />
                  <img src="/bhel.jpg" alt="Memory 10" className="gallery-img" loading="lazy" />
                  <img src="/kalyan.jpg" alt="Memory 10" className="gallery-img" loading="lazy" />
                  <img src="/math.jpg" alt="Memory 10" className="gallery-img" loading="lazy" />
                  <img src="https://content.jdmagicbox.com/comp/pune/z4/020pxx20.xx20.180921192240.c1z4/catalogue/cream-craver-pune-restaurants-rlva2djfuc.jpg" alt="Memory 1" className="gallery-img" loading="lazy" />
                  <img src="/shri.jpg" alt="Memory 10" className="gallery-img" loading="lazy" />
                  <img src="https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/2018/03/12230236/11032018_JWmarriott_06.jpg" alt="Memory 6" className="gallery-img" loading="lazy" />
                  <img src="https://www.crazycheesy.com/wp-content/uploads/2023/01/c1.jpg" alt="Memory 7" className="gallery-img" loading="lazy" />
                  <img src="https://images.moneycontrol.com/static-mcnews/2018/10/DMart-e1539415670772-770x433.jpg?impolicy=website&width=770&height=431" alt="Memory 2" className="gallery-img" loading="lazy" />
                  <img src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/e8/5f/29/excellent-food-and-service.jpg?w=900&h=500&s=1" alt="Memory 4" className="gallery-img" loading="lazy" />
                  <img src="https://images.jdmagicbox.com/comp/pune/h7/020pxx20.xx20.191017072226.a4h7/catalogue/theobroma-kothrud-pune-cake-shops-bxbjauajlk.jpg" alt="Memory 3" className="gallery-img" loading="lazy" />
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvvD37MHjmcVGCSEFs_O7D1jy7uL4BZWSKYw&s" alt="Memory 10" className="gallery-img" loading="lazy" />
                  <img src="https://im.whatshot.in/img/2018/Nov/jm-1-cropped-1541744951.jpg" alt="Memory 9" className="gallery-img" loading="lazy" />
                  <img src="https://i.ytimg.com/vi/7vhwmRxD2v8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC1Te6vSGttcdqTyFpiKEHXVrEWcg" alt="Memory 10" className="gallery-img" loading="lazy" />
                  <img src="https://d2kihw5e8drjh5.cloudfront.net/eyJidWNrZXQiOiJ1dGEtaW1hZ2VzIiwia2V5IjoicGxhY2VfaW1nLzFiNTc1M2I0NDBkOTRkMTBhN2IxYjE1YWE2OTBiYTFkIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo2NDAsImhlaWdodCI6NjQwLCJmaXQiOiJpbnNpZGUifSwicm90YXRlIjpudWxsLCJ0b0Zvcm1hdCI6ICJ3ZWJwIn19" alt="Memory 5" className="gallery-img" loading="lazy" />
                  <img src="/milk.jpg" alt="Memory 10" className="gallery-img" loading="lazy" />
                  <img src="/coffe.jpg" alt="Memory 10" className="gallery-img" loading="lazy" />
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCwaqPpFbSQc68w2As8EtjPWTpz7rEN6Cl4w&s" alt="Memory 8" className="gallery-img" loading="lazy" />
                  <img src="/juice.jpg" alt="Memory 10" className="gallery-img" loading="lazy" />
                </div>
              </div>
            </div>

            <button onClick={() => setPage(4)} className="next-btn">
              Continue
            </button>
          </div>
        );
      case 4:
        return (
          <div className="review-page">
            <h1 className="review-title">💖 Share Your Thoughts 💖</h1>
            <p className="review-message">
              Thank you for reliving our beautiful memories together! Your feedback means the world to me. Please take a moment to share your rating and any thoughts you have.
            </p>
            <div className="rating-section">
              <h3>How would you rate our memories?</h3>
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
              <h3>Any message for me?</h3>
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
              Submit & Continue
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
                  <h2>{isSubmitting ? 'Sending your review...' : 'Review Sent Successfully!'}</h2>
                  <p>
                    {isSubmitting
                      ? 'Hang tight while we send your feedback...'
                      : 'Your feedback means the world to me. Thank you! 💖'}
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
      case 5:
        return (
          <div className="final-page">
            <h1 className="final-title">Happy Happy Birthday Disha! 🎂🎉</h1>
            <p className="final-message">Wishing you a year filled with endless joy, love, and beautiful adventures! 💖✨</p>
            <div className="final-hearts">
              <span>🎈</span>
              <span>🎉</span>
              <span>🎊</span>
              <span>🎁</span>
            </div>
            <button onClick={() => setPage(0)} className="restart-btn">
              Start Over
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      {renderPage()}
    </div>
  );
}

export default App;
