'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hidden, setHidden] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setHidden(false)
    const handleMouseLeave = () => setHidden(true)
    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)
    const handleLinkHoverStart = () => setLinkHovered(true)
    const handleLinkHoverEnd = () => setLinkHovered(false)

    window.addEventListener('mousemove', updatePosition)
    window.addEventListener('mouseenter', handleMouseEnter)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    const links = document.querySelectorAll('a, button, [role="button"]')
    links.forEach((link) => {
      link.addEventListener('mouseenter', handleLinkHoverStart)
      link.addEventListener('mouseleave', handleLinkHoverEnd)
    })

    return () => {
      window.removeEventListener('mousemove', updatePosition)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)

      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleLinkHoverStart)
        link.removeEventListener('mouseleave', handleLinkHoverEnd)
      })
    }
  }, [])

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: clicked ? 0.8 : linkHovered ? 1.3 : 1,
          rotate: clicked ? 15 : 0,
          opacity: hidden ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
          mass: 0.5,
        }}
      >
        <img 
          src="/ribbon-cursor.svg" 
          alt="" 
          width={40} 
          height={40} 
          className="w-10 h-10 drop-shadow-[0_0_3px_rgba(236,72,153,0.5)]"
        />
      </motion.div>
    </>
  )
}