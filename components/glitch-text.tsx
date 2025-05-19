'use client'

import { useState, useEffect } from 'react'

interface GlitchTextProps {
  text: string
  className?: string
}

export function GlitchText({ text, className = '' }: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text)
  
  useEffect(() => {
    let interval: NodeJS.Timeout
    let timeout: NodeJS.Timeout
    
    const startGlitching = () => {
      // Characters to use for glitching
      const glitchChars = '!<>-_\\/[]{}—=+*^?#________'
      let glitchCount = 0
      const maxGlitches = 10 // More glitches per cycle
      
      // Start the glitch effect
      interval = setInterval(() => {
        if (glitchCount < maxGlitches) {
          const randomIndex = Math.floor(Math.random() * text.length)
          const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)]
          const newText = 
            text.substring(0, randomIndex) + 
            randomChar + 
            text.substring(randomIndex + 1)
          
          setDisplayText(newText)
          glitchCount++
        } else {
          clearInterval(interval)
          setDisplayText(text)
          
          // Schedule next glitch with shorter pause between glitches
          timeout = setTimeout(startGlitching, Math.random() * 1000 + 300)
        }
      }, 100) // Slower changes for more visible glitches
    }
    
    // Initial delay before starting
    timeout = setTimeout(startGlitching, 500)
    
    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [text])
  
  return (
    <span className={`glitch-text ${className}`} data-text={text}>
      {displayText}
    </span>
  )
}