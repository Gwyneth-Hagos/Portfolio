'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface HolographicTitleProps {
  text: string;
  className?: string;
  delay?: number;
  pauseDuration?: number;
}

export function HolographicTitle({ 
  text, 
  className = '', 
  delay = 40,
  pauseDuration = 2000
}: HolographicTitleProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Typewriter effect with loop
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
      return () => clearTimeout(timeout);
    }
    
    if (isDeleting) {
      if (displayedText.length === 0) {
        setIsDeleting(false);
        setCurrentIndex(0);
        return;
      }
      
      timeout = setTimeout(() => {
        setDisplayedText(prev => prev.slice(0, -1));
      }, delay / 2);
      return () => clearTimeout(timeout);
    }
    
    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timeout);
    } else {
      setIsPaused(true);
    }
    
    return () => clearTimeout(timeout);
  }, [currentIndex, text, delay, isDeleting, isPaused, displayedText, pauseDuration]);

  return (
    <div className={`relative inline-block ${className}`} data-text={text}>
      <h2 className="holographic-typewriter relative font-bold">
        {displayedText}
        <motion.span
          className="inline-block w-[0.1em] bg-primary"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          style={{ height: '1em', marginLeft: '0.1em' }}
        />
      </h2>
      
      <h2 
        className="absolute left-0 top-0 z-[-1] text-transparent font-bold"
        style={{ 
          textShadow: `
            1px 1px 0 rgba(236, 72, 153, 0.4),
            2px 2px 0 rgba(236, 72, 153, 0.3),
            3px 3px 0 rgba(236, 72, 153, 0.2),
            4px 4px 0 rgba(236, 72, 153, 0.1),
            5px 5px 0 rgba(236, 72, 153, 0.05)
          `,
          WebkitTextStroke: '1px rgba(236, 72, 153, 0.3)'
        }}
      >
        {displayedText}
      </h2>
    </div>
  );
}