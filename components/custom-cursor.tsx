'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      
      // Check if hovering over clickable element
      const target = e.target as HTMLElement
      const isClickable = 
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') || 
        target.closest('button') ||
        window.getComputedStyle(target).cursor === 'pointer'
      
      setIsPointer(isClickable)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])
  
  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-50 hidden md:block"
        style={{
          left: position.x,
          top: position.y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isPointer ? 1.2 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        <img 
          src="/ribbon-cursor.svg" 
          alt="" 
          width={32} 
          height={32} 
          className="w-8 h-8"
        />
      </motion.div>
    </>
  )
}