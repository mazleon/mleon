import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fallback?: string;
  onError?: () => void;
}

/**
 * OptimizedImage component for improved performance and SEO
 * - Implements lazy loading
 * - Handles errors gracefully
 * - Supports fallback images
 */
const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  fallback,
  onError,
}: OptimizedImageProps) => {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
    if (onError) onError();
  };

  // Extract file extension to determine image type
  const fileExtension = src.split('.').pop()?.toLowerCase();
  
  // Determine if we should use the original or fallback image
  const imageSrc = error && fallback ? fallback : src;

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading="lazy"
      onError={handleError}
      // Add decoding async for better performance
      decoding="async"
      // Add proper aria attributes for accessibility
      aria-hidden={alt === '' ? true : undefined}
    />
  );
};

export default OptimizedImage;
