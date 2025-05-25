'use client';

import { motion } from 'framer-motion';

interface GradientWordTextProps {
  text: string;
  className?: string;
}

export function GradientWordText({ text, className = '' }: GradientWordTextProps) {
  // Split text into words
  const words = text.split(' ');
  
  return (
    <p className={className}>
      {words.map((word, index) => (
        <span key={index} className="relative inline-block">
          <motion.span 
            className="gradient-word relative inline-block"
            style={{
              backgroundImage: 'linear-gradient(90deg, #ec4899, #8b5cf6, #3b82f6, #ec4899)',
              backgroundSize: '300% 100%',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'inline-block'
            }}
            animate={{ 
              backgroundPosition: ['0% center', '100% center', '0% center']
            }}
            transition={{ 
              duration: 3,
              ease: "linear",
              repeat: Infinity,
              delay: index * 0.1 % 1 // Stagger effect
            }}
          >
            {word}
          </motion.span>
          {index < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  );
}