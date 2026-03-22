import React, { useState } from 'react';
import ImageWithFallback from './ImageWithFallback';
import { galleryImages } from '../constants/galleryImages';

const MemoriesPage = ({ onNext, onBack }) => {
  const [galleryExpanded, setGalleryExpanded] = useState(false);

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
          weren't just talking – we were sharing our dreams, our
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
            We watched "Azaad" together. We laughed, whispered, and just
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
            You called and said, "I'm coming to Pune today." We met at Kumar
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
            (which we sadly don't have anymore) — but the memory is still
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
      <div className="button-container">
        <button onClick={onBack} className="back-arrow-btn">
          ←
        </button>
        <button onClick={onNext} className="about-btn">
          More About Disha 💖 →
        </button>
      </div>
    </div>
  );
};

export default MemoriesPage;