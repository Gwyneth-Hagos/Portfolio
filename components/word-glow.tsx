'use client';

import { useState, useEffect } from 'react';

interface WordGlowProps {
  text: string;
  speed?: number; // Speed of the animation in ms
  className?: string;
}

export function WordGlow({ text, speed = 400, className = '' }: WordGlowProps) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const words = text.split(' ');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => {
        // Reset to -1 when we reach the end to create a pause
        if (prevIndex >= words.length - 1) {
          return -1;
        }
        return prevIndex + 1;
      });
    }, speed);
    
    return () => clearInterval(interval);
  }, [words.length, speed]);
  
  return (
    <span className={className}>
      {words.map((word, index) => (
        <span
          key={index}
          className="transition-all duration-300"
          style={{
            color: index === activeIndex ? '#ec4899' : 'inherit',
            textShadow: index === activeIndex 
              ? '0 0 8px rgba(236, 72, 153, 0.8), 0 0 12px rgba(236, 72, 153, 0.5)' 
              : 'none',
          }}
        >
          {word}{' '}
        </span>
      ))}
    </span>
  );
}