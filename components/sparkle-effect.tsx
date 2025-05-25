'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Sparkle {
  id: string;
  createdAt: number;
  color: string;
  size: number;
  style: {
    top: string;
    left: string;
    zIndex: number;
  };
}

interface SparkleEffectProps {
  children: React.ReactNode;
  color?: string;
  count?: number;
  minSize?: number;
  maxSize?: number;
  className?: string;
}

export function SparkleEffect({
  children,
  color = '#ec4899',
  count = 15,
  minSize = 10,
  maxSize = 20,
  className = '',
}: SparkleEffectProps) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const prefersReducedMotion = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Check for reduced motion preference
  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);
  
  // Create random sparkles
  const createSparkle = (): Sparkle => {
    return {
      id: Math.random().toString(36).substring(2),
      createdAt: Date.now(),
      color,
      size: Math.floor(Math.random() * (maxSize - minSize) + minSize),
      style: {
        top: Math.random() * 100 + '%',
        left: Math.random() * 100 + '%',
        zIndex: 2,
      },
    };
  };
  
  // Generate initial sparkles
  useEffect(() => {
    if (prefersReducedMotion.current) return;
    
    const initialSparkles = Array.from({ length: count }, () => createSparkle());
    setSparkles(initialSparkles);
    
    // Regenerate sparkles periodically
    const interval = setInterval(() => {
      setSparkles(currentSparkles => {
        const now = Date.now();
        // Remove sparkles older than 1 second and add new ones
        const filtered = currentSparkles.filter(sparkle => now - sparkle.createdAt < 1000);
        return [...filtered, createSparkle()];
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [count, color, minSize, maxSize]);
  
  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {sparkles.map(sparkle => (
        <motion.span
          key={sparkle.id}
          className="absolute pointer-events-none"
          style={{
            ...sparkle.style,
            width: sparkle.size,
            height: sparkle.size,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 68 68"
            fill="none"
          >
            <path
              d="M34 0L41.5 26.5H68L46.5 42.5L54 68L34 52L14 68L21.5 42.5L0 26.5H26.5L34 0Z"
              fill={sparkle.color}
            />
          </svg>
        </motion.span>
      ))}
      {children}
    </div>
  );
}