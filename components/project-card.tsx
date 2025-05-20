'use client'

import { useRef, useEffect } from 'react'
import { useMotionValue, useSpring, useTransform, motion, animate } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Github, ExternalLink } from 'lucide-react'
import Image from 'next/image'

interface ProjectCardProps {
  title: string
  role?: string
  description: string
  image: string
  tags: string[]
  githubUrl?: string
  liveUrl?: string
}

export function ProjectCard({
  title,
  role,
  description,
  image,
  tags,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Mouse position values
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  // Smooth spring animation with faster response
  const springConfig = { damping: 15, stiffness: 400 }
  const xSpring = useSpring(x, springConfig)
  const ySpring = useSpring(y, springConfig)
  
  // Enhanced 3D transforms
  const rotateX = useTransform(ySpring, [-0.5, 0.5], ['15deg', '-15deg'])
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ['-15deg', '15deg'])
  const scale = useMotionValue(1)
  const brightness = useMotionValue(0.75)
  
  // Handle mouse move on the card
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const xValue = (e.clientX - rect.left) / rect.width - 0.5
    const yValue = (e.clientY - rect.top) / rect.height - 0.5
    
    x.set(xValue)
    y.set(yValue)
    brightness.set(1)
  }
  
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    brightness.set(0.75)
    animate(scale, 1, springConfig)
  }

  const handleMouseEnter = () => {
    animate(scale, 1.05, springConfig)
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
      <Card className="relative h-full overflow-hidden bg-secondary/30 backdrop-blur-sm transition-all duration-300">
        <motion.div 
          className="absolute -inset-px z-10 rounded-lg bg-gradient-to-r from-primary/50 to-primary/10"
          style={{
            opacity: useTransform(scale, [1, 1.05], [0, 1]),
          }}
        />
        
        <motion.div 
          className="relative h-48 overflow-hidden bg-black"
          style={{
            filter: `brightness(${brightness.get()})`,
          }}
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-all duration-300"
          />
        </motion.div>
        
        <CardHeader className="relative z-20">
          <motion.h3 
            className="text-xl font-bold tracking-tight"
            style={{ translateZ: 50 }}
          >
            {title}
          </motion.h3>
        </CardHeader>
        
        <CardContent className="relative z-20 space-y-4">
          {role && (
            <motion.p 
              className="text-sm font-medium text-primary"
              style={{ translateZ: 30 }}
            >
              {role}
            </motion.p>
          )}
          
          <motion.div 
            className="opacity-0 transition-all duration-300 max-h-0 group-hover:max-h-[500px] group-hover:opacity-100"
            style={{ translateZ: 40 }}
          >
            <p className="text-sm text-muted-foreground whitespace-pre-line pt-2">{description}</p>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap gap-2"
            style={{ translateZ: 30 }}
          >
            {tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="border border-primary/20 transition-all duration-300 hover:scale-110"
              >
                {tag}
              </Badge>
            ))}
          </motion.div>
        </CardContent>
        
        <CardFooter className="relative z-20 flex justify-between">
          {githubUrl && (
            <Button 
              size="sm" 
              variant="ghost" 
              className="gap-1 transition-transform duration-300 hover:scale-110"
            >
              <Github className="h-4 w-4" />
              Code
            </Button>
          )}
          
          {liveUrl && (
            <Button 
              size="sm" 
              variant="outline" 
              className="gap-1 hover-glow transition-transform duration-300 hover:scale-110"
            >
              <ExternalLink className="h-4 w-4" />
              View Project
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}