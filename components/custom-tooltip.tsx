'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (active && payload && payload.length) {
      const value = payload[0].value;
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
    }
  }, [active, payload]);
  
  // Easing function for smoother animation
  const easeOutQuad = (x: number): number => {
    return 1 - (1 - x) * (1 - x);
  };
  
  if (!active || !payload || !payload.length) {
    return null;
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="rounded-lg border border-primary/30 bg-background/90 p-3 shadow-lg backdrop-blur-sm"
    >
      <p className="text-sm font-medium">{label}</p>
      <p className="text-xl font-bold text-primary">
        <span className="counting-number">{count}</span>%
      </p>
      <p className="text-xs text-muted-foreground">Proficiency</p>
    </motion.div>
  );
}