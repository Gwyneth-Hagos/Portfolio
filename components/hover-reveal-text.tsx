'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface HoverRevealTextProps {
  text: string
  className?: string
}

export function HoverRevealText({ text, className = '' }: HoverRevealTextProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.span
      className={`hover-reveal-text inline-block cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0.7 }}
      animate={{ 
        opacity: isHovered ? 1 : 0.7,
        scale: isHovered ? 1.05 : 1,
        textShadow: isHovered ? '0 0 8px rgba(236, 72, 153, 0.8)' : 'none'
      }}
      transition={{ duration: 0.3 }}
    >
      {text}
    </motion.span>
  )
}