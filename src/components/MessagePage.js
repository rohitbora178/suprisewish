import React from 'react';
import ImageWithFallback from './ImageWithFallback';

const MessagePage = ({ onNext, onReactionChange, reactionEmoji, reactionMeanings }) => (
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
    <button onClick={onNext} className="next-btn">
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
            onClick={() => onReactionChange(emoji)}
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

export default MessagePage;