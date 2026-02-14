
import React, { useState } from 'react';

const ImageWithFallback: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({ src, className, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isLoading && <div className="absolute inset-0 bg-gray-100 animate-pulse" />}
      <img
        {...props}
        src={imgSrc || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400'}
        className={`w-full h-full object-cover transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
        onError={() => setImgSrc('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400')}
      />
    </div>
  );
};

export default ImageWithFallback;
