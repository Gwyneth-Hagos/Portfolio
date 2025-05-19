'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
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
  
  // Mouse position values
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  // Smooth spring animation
  const springConfig = { damping: 25, stiffness: 300 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)
  
  // Rotate Card based on mouse position
  const rotateX = useTransform(ySpring, [-0.5, 0.5], ['7deg', '-7deg'])
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ['-7deg', '7deg'])
  
  // Handle mouse move on the card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    
    // Calculate normalized mouse position from -0.5 to 0.5
    const xValue = (e.clientX - rect.left) / rect.width - 0.5
    const yValue = (e.clientY - rect.top) / rect.height - 0.5
    
    x.set(xValue)
    y.set(yValue)
  }
  
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.05, z: 30 }}
      className="group cursor-pointer perspective-1000"
    >
      <Card className="relative h-full overflow-hidden border border-primary/20 bg-secondary/30 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 pop-out-card">
        <CardContent className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <div 
              className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-4xl text-primary transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(236,72,153,0.5)]"
              style={{ transform: 'translateZ(20px)' }}
            >
              {icon}
            </div>
            
            <h3 className="text-center text-xl font-bold transition-all duration-300 group-hover:text-primary">{title}</h3>
            
            <div className="w-full pt-2">
              <Progress value={level} className="h-2" />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>Beginner</span>
                <span>Expert</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}