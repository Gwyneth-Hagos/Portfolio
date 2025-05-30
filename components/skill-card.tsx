'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

interface SkillCardProps {
  icon: React.ReactNode
  title: string
  level: number
  color?: string
}

export function SkillCard({ icon, title, level, color = '#ec4899' }: SkillCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [currentProgress, setCurrentProgress] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  
  // Motion values
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const scale = useMotionValue(1)
  
  // Spring animations
  const springConfig = { damping: 25, stiffness: 300 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)
  
  // Enhanced 3D transforms
  const rotateX = useTransform(ySpring, [-0.5, 0.5], ['15deg', '-15deg'])
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ['-15deg', '15deg'])
  
  // Initialize progress value on mount
  useEffect(() => {
    // Start from 0
    setCurrentProgress(0)
    
    // Animate to the target level
    const timeout = setTimeout(() => {
      animate(0, level, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (latest) => {
          setCurrentProgress(latest)
        }
      })
    }, 100)
    
    return () => clearTimeout(timeout)
  }, [level])
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const xValue = (e.clientX - rect.left) / rect.width - 0.5
    const yValue = (e.clientY - rect.top) / rect.height - 0.5
    
    x.set(xValue)
    y.set(yValue)
  }
  
  const handleMouseEnter = () => {
    setIsHovered(true)
    animate(scale, 1.05, springConfig)
  }
  
  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
    animate(scale, 1, springConfig)
  }

  const handleClick = () => {
    animate(scale, [1.05, 0.95, 1.05], {
      duration: 0.4,
      type: "spring",
      stiffness: 400
    })
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: 'preserve-3d',
      }}
      className="group cursor-pointer perspective-1000"
    >
      <Card className="relative h-full overflow-hidden border border-primary/20 bg-secondary/30 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 pop-out-card">
        <CardContent className="p-6">
          <motion.div 
            className="flex flex-col items-center space-y-4"
            style={{ translateZ: 50 }}
          >
            <motion.div 
              className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-4xl text-primary"
              animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              style={{ translateZ: 75 }}
            >
              {icon}
            </motion.div>
            
            <motion.h3 
              className="text-center text-xl font-bold transition-all duration-300 group-hover:text-primary"
              style={{ translateZ: 50 }}
            >
              {title}
            </motion.h3>
            
            <motion.div 
              className="w-full pt-2"
              style={{ translateZ: 25 }}
            >
              <Progress value={currentProgress} className="h-2" />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>Beginner</span>
                <span>Expert</span>
              </div>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}