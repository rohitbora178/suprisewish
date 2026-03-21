import React, { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import "./App.css";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please refresh the page.</h1>;
    }

    return this.props.children;
  }
}

function App() {
  const [page, setPage] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [tempEmoji, setTempEmoji] = useState(null);
  const [currentStar, setCurrentStar] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [galleryExpanded, setGalleryExpanded] = useState(false);
  const [reactionEmoji, setReactionEmoji] = useState(null);

  const emojis = {
    1: '😢',
    2: '😐',
    3: '😊',
    4: '😄',
    5: '😍'
  };

  const reactionMeanings = {
    '😍': 'Loved',
    '🥰': 'Adored',
    '💕': 'Heartfelt',
    '😊': 'Happy',
    '🎉': 'Excited',
    '✨': 'Magical',
    '💖': 'Blessed',
    '😂': 'Joyful',
  };

  const galleryImages = [
    { src: "/collage.jpg", alt: "Memory 10" },
    { src: "/bhel.jpg", alt: "Memory 10" },
    { src: "/kalyan.jpg", alt: "Memory 10" },
    { src: "/math.jpg", alt: "Memory 10" },
    { src: "https://content.jdmagicbox.com/comp/pune/z4/020pxx20.xx20.180921192240.c1z4/catalogue/cream-craver-pune-restaurants-rlva2djfuc.jpg", alt: "Memory 1" },
    { src: "/shri.jpg", alt: "Memory 10" },
    { src: "https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/2018/03/12230236/11032018_JWmarriott_06.jpg", alt: "Memory 6" },
    { src: "https://www.crazycheesy.com/wp-content/uploads/2023/01/c1.jpg", alt: "Memory 7" },
    { src: "https://images.moneycontrol.com/static-mcnews/2018/10/DMart-e1539415670772-770x433.jpg?impolicy=website&width=770&height=431", alt: "Memory 2" },
    { src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/e8/5f/29/excellent-food-and-service.jpg?w=900&h=500&s=1", alt: "Memory 4" },
    { src: "https://images.jdmagicbox.com/comp/pune/h7/020pxx20.xx20.191017072226.a4h7/catalogue/theobroma-kothrud-pune-cake-shops-bxbjauajlk.jpg", alt: "Memory 3" },
    { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvvD37MHjmcVGCSEFs_O7D1jy7uL4BZWSKYw&s", alt: "Memory 10" },
    { src: "https://im.whatshot.in/img/2018/Nov/jm-1-cropped-1541744951.jpg", alt: "Memory 9" },
    { src: "https://i.ytimg.com/vi/7vhwmRxD2v8/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC1Te6vSGttcdqTyFpiKEHXVrEWcg", alt: "Memory 10" },
    { src: "https://d2kihw5e8drjh5.cloudfront.net/eyJidWNrZXQiOiJ1dGEtaW1hZ2VzIiwia2V5IjoicGxhY2VfaW1nLzFiNTc1M2I0NDBkOTRkMTBhN2IxYjE1YWE2OTBiYTFkIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo2NDAsImhlaWdodCI6NjQwLCJmaXQiOiJpbnNpZGUifSwicm90YXRlIjpudWxsLCJ0b0Zvcm1hdCI6ICJ3ZWJwIn19", alt: "Memory 5" },
    { src: "/milk.jpg", alt: "Memory 10" },
    { src: "/coffe.jpg", alt: "Memory 10" },
    { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCwaqPpFbSQc68w2As8EtjPWTpz7rEN6Cl4w&s", alt: "Memory 8" },
    { src: "/juice.jpg", alt: "Memory 10" }
  ];

  // Image component with fallback and skeleton loading
  const ImageWithFallback = ({ src, alt, fallbackSrc = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2NjYyIvPjwvc3ZnPg==', ...props }) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [loading, setLoading] = useState(true);
    const imgRef = React.useRef(null);

    // Reset loading state whenever the image source changes
    useEffect(() => {
      setImgSrc(src);
      setLoading(true);
    }, [src]);

    // If the image is already cached (complete) when the component mounts,
    // make sure we turn off the skeleton.
    useEffect(() => {
      const img = imgRef.current;
      if (img && img.complete && img.naturalWidth > 0) {
        setLoading(false);
      }
    }, [src]);

    const onError = () => {
      setImgSrc(fallbackSrc);
      setLoading(false);
    };

    const onLoad = () => setLoading(false);

    return (
      <div style={{ position: 'relative' }}>
        {loading && (
          <Skeleton
            height={props.height || 200}
            width={props.width || 300}
            style={{ position: 'absolute', top: 0, left: 0 }}
          />
        )}
        <img
          ref={imgRef}
          src={imgSrc}
          alt={alt}
          onError={onError}
          onLoad={onLoad}
          style={{
            width: props.width || '100%',
            height: props.height || 'auto',
            opacity: loading ? 0 : 1,
            transition: 'opacity 250ms ease-in-out'
          }}
          {...props}
        />
      </div>
    );
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
          reaction: reactionEmoji ? `${reactionEmoji} ${reactionMeanings[reactionEmoji]}` : 'No reaction',
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
      setErrorMessage('Failed to send message. Please check your connection and try again.');
      console.error('Email send error:', error);
    }
  };

  useEffect(() => {
    if (page === 1) {
      const timer = setTimeout(() => setPage(1.5), 3000);
      return () => clearTimeout(timer);
    }
  }, [page]);

  useEffect(() => {
    if (page === 1.5 && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (page === 1.5 && countdown === 0) {
      const timer = setTimeout(() => {
        setPage(2);
        setCountdown(3);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [page, countdown]);

  const renderPage = () => {
    switch (page) {
      case 0:
        return (
          <div className="surprise-box">
            <h1 className="subTitle-con">🎁 A Surprise For You</h1>
            <p className="subtitle">Tap the gift to open your message</p>

            <button className="button" onClick={() => setPage(1)}>
              <svg
                className="button-cosm"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                fill="#000000"
                width="128"
                height="128"
                viewBox="0 0 256 256"
                id="Flat"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M243.07324,157.43945c-1.2334-1.47949-23.18847-27.34619-60.46972-41.05859-1.67579-17.97412-8.25293-34.36328-18.93653-46.87158C149.41309,52.8208,128.78027,44,104,44,54.51074,44,22.10059,88.57715,20.74512,90.4751a3.99987,3.99987,0,0,0,6.50781,4.65234C27.5625,94.6958,58.68359,52,104,52c22.36816,0,40.89648,7.85107,53.584,22.70508,8.915,10.437,14.65625,23.9541,16.65528,38.894A133.54185,133.54185,0,0,0,136,108c-25.10742,0-46.09473,6.48486-60.69434,18.75391-12.65234,10.63379-19.91015,25.39355-19.91015,40.49463a43.61545,43.61545,0,0,0,12.69336,31.21923C76.98438,207.3208,89.40234,212,104,212c23.98047,0,44.37305-9.4668,58.97461-27.37744,12.74512-15.6333,20.05566-37.145,20.05566-59.01953,0-.1128-.001-.22559-.001-.33838,33.62988,13.48486,53.62207,36.96631,53.89746,37.2959a4.00015,4.00015,0,0,0,6.14648-5.1211ZM104,204c-27.89746,0-40.60449-19.05078-40.60449-36.75146C63.39551,142.56592,86.11621,116,136,116a124.37834,124.37834,0,0,1,38.97266,6.32617q.05712,1.63038.05761,3.27686C175.03027,177.07129,139.29785,204,104,204Z"
                ></path>
              </svg>
              <svg
                className="highlight"
                viewBox="0 0 144.75738 77.18431"
                preserveAspectRatio="none"
              >
                <g transform="translate(-171.52826,-126.11624)">
                  <g
                    fill="none"
                    stroke-width="17"
                    stroke-linecap="round"
                    stroke-miterlimit="10"
                  >
                    <path
                      d="M180.02826,169.45123c0,0 12.65228,-25.55115 24.2441,-25.66863c6.39271,-0.06479 -5.89143,46.12943 4.90937,50.63857c10.22345,4.2681 24.14292,-52.38336 37.86455,-59.80493c3.31715,-1.79413 -5.35094,45.88889 -0.78872,58.34589c5.19371,14.18125 33.36934,-58.38221 36.43049,-56.91633c4.67078,2.23667 -0.06338,44.42744 5.22574,47.53647c6.04041,3.55065 19.87185,-20.77286 19.87185,-20.77286"
                    ></path>
                  </g>
                </g>
              </svg>
              Click here to Open
            </button>

            <svg height="0" width="0">
              <filter id="handDrawnNoise">
                <feTurbulence
                  result="noise"
                  numOctaves="8"
                  baseFrequency="0.1"
                  type="fractalNoise"
                ></feTurbulence>
                <feDisplacementMap
                  yChannelSelector="G"
                  xChannelSelector="R"
                  scale="3"
                  in2="noise"
                  in="SourceGraphic"
                ></feDisplacementMap>
              </filter>
              <filter id="handDrawnNoise2">
                <feTurbulence
                  result="noise"
                  numOctaves="8"
                  baseFrequency="0.1"
                  seed="1010"
                  type="fractalNoise"
                ></feTurbulence>
                <feDisplacementMap
                  yChannelSelector="G"
                  xChannelSelector="R"
                  scale="3"
                  in2="noise"
                  in="SourceGraphic"
                ></feDisplacementMap>
              </filter>

              <filter id="handDrawnNoiset">
                <feTurbulence
                  result="noise"
                  numOctaves="8"
                  baseFrequency="0.1"
                  type="fractalNoise"
                ></feTurbulence>
                <feDisplacementMap
                  yChannelSelector="G"
                  xChannelSelector="R"
                  scale="6"
                  in2="noise"
                  in="SourceGraphic"
                ></feDisplacementMap>
              </filter>
              <filter id="handDrawnNoiset2">
                <feTurbulence
                  result="noise"
                  numOctaves="8"
                  baseFrequency="0.1"
                  seed="1010"
                  type="fractalNoise"
                ></feTurbulence>
                <feDisplacementMap
                  yChannelSelector="G"
                  xChannelSelector="R"
                  scale="6"
                  in2="noise"
                  in="SourceGraphic"
                ></feDisplacementMap>
              </filter>
            </svg>

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
      case 1.5:
        return (
          <div className="countdown-page">
            <div className="countdown-container">
              <h2 className="countdown-text">Get Ready!</h2>
              <div className="countdown-number">{countdown}</div>
              <p className="countdown-message">Your special moment is here...</p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="card">
            <audio src="/song.mp3" autoPlay loop />
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
            <div className="cardHeader">
              <ImageWithFallback
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
              See Memories →
            </button><br /> <br />
            <div className="hearts">
              <span>❤️</span>
              <span>💖</span>
              <span>💕</span>
              <span>💗</span>
            </div>

            <div className="emoji-reaction-section">
              <h3>Your First Reaction 💭</h3>
              <p className="emoji-subtitle">Tell me how this message made you feel:</p>
              <div className="emoji-reactions">
                {['😍', '🥰', '💕', '😊', '🎉', '✨', '💖', '😂',].map((emoji) => (
                  <button
                    key={emoji}
                    className={`emoji-btn ${reactionEmoji === emoji ? 'selected' : ''}`}
                    onClick={() => setReactionEmoji(emoji)}
                    title={emoji}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              {reactionEmoji && (
                <p className="emoji-selected"><strong>{reactionEmoji} {reactionMeanings[reactionEmoji]}</strong></p>
              )}
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
                <ImageWithFallback src="https://b.zmtcdn.com/data/pictures/7/6507967/2529c13e9a33a2a9ffd531f1a79cbe99.jpg?fit=around|960:500&crop=960:500;*,*" alt="First Meeting" className="branch-img" />
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
                <ImageWithFallback src="https://english.cdn.zeenews.com/sites/default/files/styles/zm_500x286/public/2025/03/19/1703292-jh234-2025-03-19t202030.184.png" alt="Movie Time" className="branch-img" />
                <p>
                  We watched “Azaad” together. We laughed, whispered, and just
                  enjoyed being together. That simple movie night became one of
                  my favorite memories.
                </p>
              </div>

              <div className="branch">
                <h2>☕ Coffee & Sarasbaug</h2>
                <ImageWithFallback src="https://images.trvl-media.com/place/6170139/c08972a7-a194-4133-9dd6-139fac768c8a.jpg" alt="Coffee & Sarasbaug" className="branch-img" />
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
                <ImageWithFallback src="https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/2018/05/07175849/08052018_kingofgame_bowling_01.jpg" alt="Second Meeting" className="branch-img" />
                <p>
                  You called and said, “I’m coming to Pune today.” We met at Kumar
                  Pacific Mall, played games, visited Shankar Maharaj Math, ate
                  Kalyan Bhel, and had ice cream. It was another day filled with
                  laughter and small moments.
                </p>
              </div>

              <div className="branch">
                <h2>🎂 Third Meeting — Your Birthday</h2>
                <ImageWithFallback src="https://media-cdn.tripadvisor.com/media/photo-s/09/1f/b3/97/wadeshwar.jpg" alt="Third Meeting" className="branch-img" />
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
                  {(galleryExpanded ? galleryImages : galleryImages.slice(0, 4)).map((image, index) => (
                    <ImageWithFallback
                      key={index}
                      src={image.src}
                      alt={image.alt}
                      className="gallery-img"
                      loading="lazy"
                    />
                  ))}
                </div>
                {galleryImages.length > 4 && (
                  <button
                    className="load-more-btn"
                    onClick={() => setGalleryExpanded((prev) => !prev)}
                  >
                    {galleryExpanded ? 'Show less' : `Load more (${galleryImages.length - 4})`}
                  </button>
                )}
              </div>
            </div>
            <div>
              <button onClick={() => setPage(6)} className="about-btn">
                More About Disha 💖 →
              </button>

            </div>
          </div>
        );
      case 4:
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

            <button onClick={() => setPage(0)} className="restart-btn">
              Start Over
            </button>
          </div>
        );
      case 6:
        return (
          <div className="about-page">
            <div>
              <ImageWithFallback
                className="disha-child-image"
                src="/child.jpg"
                alt="Disha"
              />
            </div>

            <h1 className="subTitle-con">More About Disha 💫</h1>

            <p>Today, I feel truly honored to speak about someone very special — my dear friend, Disha Sandeep Chopda ❤️</p>

            <p>There’s also a small, funny moment that I’ll always remember about how our friendship began 😊</p>

            <p>When Disha first added me on Instagram, I honestly thought she was a gay! 😄 The reason? Her bio. I completely read it wrong and misunderstood everything — and that confusion was 100% my fault 🤦‍♂️</p>

            <p>Later, when I actually got to know her, I realized how wrong I was… and we both had a good laugh about it 😂 When I told her this story, it turned into one of those light, unforgettable moments that still makes us smile ✨</p>

            <p>Sometimes, the best friendships don’t start perfectly — they start with little mistakes, funny misunderstandings, and then grow into something really special 💖 And that’s exactly how it began with Disha 🌸</p>

            <p>Disha is not just a name, it is a story of strength, determination, and quiet resilience 💪 At just 24 years of age, she is already walking a path that many only dream of 🌟 Currently, she is pursuing LLB along with Company Secretary studies — a combination that itself reflects her dedication, discipline, and ambition 📚</p>

            <p>Disha now lives in Shirur, but her roots are deeply connected to a small town called Khadus, where she spent her childhood at her dada-dadi’s home 🏡 Those early years shaped her into the person she is today — grounded, respectful, and full of warmth 🤍</p>

            <p>From a young age, Disha has always been focused and intelligent 🧠 Coming from a Marathi medium background, she proved that language is never a barrier when determination speaks louder 💯 Her helpful nature and kind-hearted personality naturally attract people — she is someone everyone feels comfortable with 😊</p>

            <p>She is a perfect example of balance ⚖️ At home, she is a loving daughter — her mother is a homemaker, and her father is a businessman 👨‍👩‍👧 Disha stands as a strong support system for both 🤝 Whether it’s helping her mother in daily work, taking care of her grandparents, or even managing her father’s shop when he is not around — she handles everything with maturity beyond her age 💫</p>

            <p>And she’s not just responsible — she’s also independent 🚗 She drives a car confidently, cooks delicious meals 🍲, and manages responsibilities like a pro 💼 In short, she is someone who can take care of everything and everyone ❤️</p>

            <p>Disha is also deeply spiritual 🙏 Every Monday, she visits the Shiva temple at Ramling Shirur, finding peace and strength in her faith 🕉️ She also loves visiting Jain tirths, showing her connection with values and traditions 🌼</p>

            <p>But beyond all this strength and positivity, there is a side of her story that many may not see…</p>

            <p>Life hasn’t always been easy for Disha 💔</p>

            <p>At a very young age, she faced a heartbreaking loss — she lost her brother 😔 He was a civil engineer, someone she admired deeply 👷‍♂️ She often says how proud she is of him and the struggles he went through 💭 Losing him was not just losing a family member — it was losing a part of herself 💔 It shook her completely.</p>

            <p>For a moment, life scattered her…</p>

            <p>But what makes Disha truly special is what she did after that 🌈</p>

            <p>She stood up again 💪</p>

            <p>With courage in her heart and tears hidden behind her smile, she chose to move forward 🙂 And as if that wasn’t enough, life tested her again with another major loss 💔 Yet again, she didn’t give up. She gathered herself, stood strong, and continued to spread happiness around her ✨</p>

            <p>That is Disha — even when she is hurting, she makes sure others are smiling 😊</p>

            <p>She dreams big — to become a successful Company Secretary and a lawyer ⚖️📚, and most importantly, to make her parents proud 👨‍👩‍👧💖</p>

            <p>She also dreams of traveling the world 🌍 — especially visiting Turkey 🇹🇷 one day, and creating beautiful memories with her parents while exploring new places together ✈️❤️</p>

            <p>And yes, there’s one more dream — meeting her favorite cricketer, Rohit Sharma 🏏 someday. Knowing Disha, that day might not be too far away 😉✨</p>

            <p>She also has a fun and lively side 😄 She loves traveling ✈️, exploring new places 🌍, and trying new food 🍽️ Especially cheesecake 🍰 — if there’s cheesecake around, you’ll definitely find Disha smiling! And yes, she has a special love for Oreo chocolate 🍫</p>

            <p>And here’s a fun fact — her favorite sabji is Methi 🌿 (yes, Methi! 😄). While most people make faces hearing that, Disha somehow makes it sound like a five-star dish 😆 Only she can turn something simple like Methi into a favorite!</p>

            <p>When you look at her, you see happiness, confidence, and strength 🌟 But when you truly know her, you realize — she is a warrior ⚔️ A girl who turned pain into power, loss into motivation, and challenges into stepping stones 💫</p>

            <p>Disha teaches us that life is not about how easy your journey is, but about how strong you become through your struggles 💯</p>

            <p>In the end, I just want to say —<br />Disha, you are an inspiration ❤️ Your story reminds us to never give up, to stay grounded, and to always keep moving forward no matter what life throws at us 🌈</p>

            <p>We are truly lucky to have you in our lives 🤍</p>

            <p>Thank you 🙏</p>
            <button onClick={() => setPage(4)} className="next-btn">
              Share Your Thoughts →
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <ErrorBoundary>
      <div className="container">
        {renderPage()}
      </div>
    </ErrorBoundary>
  );
}

export default App;