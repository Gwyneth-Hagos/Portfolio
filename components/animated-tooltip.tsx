'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedTooltipProps {
  value: number;
  label: string;
}

export function AnimatedTooltip({ value, label }: AnimatedTooltipProps) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let startValue = 0;
    const duration = 800; // ms
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    const increment = value / totalFrames;
    
    let currentFrame = 0;
    
    const counter = setInterval(() => {
      currentFrame++;
      const progress = Math.min(currentFrame / totalFrames, 1);
      const easedProgress = easeOutQuad(progress);
      const currentCount = Math.floor(value * easedProgress);
      
      setCount(currentCount);
      
      if (currentFrame === totalFrames) {
        clearInterval(counter);
      }
    }, frameDuration);
    
    return () => clearInterval(counter);
  }, [value]);
  
  // Easing function for smoother animation
  const easeOutQuad = (x: number): number => {
    return 1 - (1 - x) * (1 - x);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="tooltip-content"
    >
      <div className="flex items-center gap-2">
        <span className="font-bold text-primary text-lg">{count}%</span>
        <span>{label}</span>
      </div>
    </motion.div>
  );
}