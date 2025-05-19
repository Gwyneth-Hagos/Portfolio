// components/custom-cursor.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if cursor is over a clickable element
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' || 
        target.closest('a') || 
        target.closest('button') || 
        target.closest('[role="button"]') || 
        window.getComputedStyle(target).cursor === 'pointer'
      
      // Fix: Convert isClickable to boolean with !!
      setIsPointer(!!isClickable);
    }
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);
  
  return (
    <>
      <motion.div 
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-6 w-6 rounded-full border border-primary"
        animate={{
          x: position.x - 12,
          y: position.y - 12,
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
      />
      <motion.div 
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-primary"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isPointer ? 0 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.3
        }}
      />
    </>
  );
}
