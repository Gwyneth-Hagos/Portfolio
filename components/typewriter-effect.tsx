'use client'

import { useEffect, useState } from 'react'

interface TypewriterEffectProps {
  text: string
  className?: string
  delay?: number
  onComplete?: () => void
  glitchIntensity?: number
}

export function TypewriterEffect({ 
  text, 
  className = '', 
  delay = 50,
  onComplete,
  glitchIntensity = 0
}: TypewriterEffectProps) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [glitchText, setGlitchText] = useState('')

  useEffect(() => {
    if (currentIndex >= text.length) {
      if (onComplete) onComplete()
      return
    }

    const timeout = setTimeout(() => {
      setDisplayText(text.substring(0, currentIndex + 1))
      setCurrentIndex(currentIndex + 1)
      
      // Random glitch effect
      if (glitchIntensity > 0 && Math.random() < glitchIntensity) {
        const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/\\~`'
        const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)]
        setGlitchText(randomChar)
        
        // Reset glitch after a short delay
        setTimeout(() => {
          setGlitchText('')
        }, 50)
      }
    }, delay)

    return () => clearTimeout(timeout)
  }, [currentIndex, delay, text, onComplete, glitchIntensity])

  return (
    <span className={className}>
      {displayText}
      {glitchText}
      <span className="animate-blink">|</span>
    </span>
  )
}