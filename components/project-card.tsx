'use client'

import { useRef } from 'react'
import { useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'
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
      whileHover={{ scale: 1.03 }}
      className="group cursor-pointer perspective-1000"
    >
      <Card className="relative h-full overflow-hidden bg-secondary/30 backdrop-blur-sm transition-all duration-200 group-hover:h-auto">
        <div 
          className="absolute -inset-px z-10 rounded-lg bg-gradient-to-r from-primary/50 to-primary/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        />
        
        <div className="relative h-48 overflow-hidden bg-black">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover brightness-75 transition-all duration-200 group-hover:scale-105 group-hover:brightness-100"
          />
        </div>
        
        <CardHeader className="relative z-20">
          <h3 className="text-xl font-bold tracking-tight">{title}</h3>
        </CardHeader>
        
        <CardContent className="relative z-20 space-y-4">
          {role && (
            <p className="text-sm font-medium text-primary">{role}</p>
          )}
          
          <div className="group-hover:opacity-100 opacity-0 transition-all duration-300 max-h-0 group-hover:max-h-[500px] overflow-hidden">
            <p className="text-sm text-muted-foreground whitespace-pre-line pt-2">{description}</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="border border-primary/20">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="relative z-20 flex justify-between">
          {githubUrl && (
            <Button size="sm" variant="ghost" className="gap-1">
              <Github className="h-4 w-4" />
              Code
            </Button>
          )}
          
          {liveUrl && (
            <Button size="sm" variant="outline" className="gap-1 hover-glow">
              <ExternalLink className="h-4 w-4" />
              View Project
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}