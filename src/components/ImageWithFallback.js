import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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

export default ImageWithFallback;