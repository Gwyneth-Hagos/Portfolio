'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  level: number;
  color?: string;
  category?: string;
  description?: string;
}

interface SkillSphereProps {
  skills: Skill[];
  size?: number;
  speed?: number;
  className?: string;
}

export function SkillSphere({ 
  skills, 
  size = 300, 
  speed = 0.5,
  className = '' 
}: SkillSphereProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  
  // Calculate positions for each skill on a sphere
  const calculatePositions = () => {
    const count = skills.length;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    
    return skills.map((skill, i) => {
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment
      
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      
      return {
        ...skill,
        position: { x, y, z },
        fontSize: 14 + (skill.level / 20),
        opacity: 0.5 + (skill.level / 200)
      };
    });
  };
  
  const skillsWithPositions = calculatePositions();
  
  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate) return;
    
    const interval = setInterval(() => {
      setRotation(prev => ({
        x: prev.x + 0.2 * speed,
        y: prev.y + 0.5 * speed
      }));
    }, 50);
    
    return () => clearInterval(interval);
  }, [autoRotate, speed]);
  
  // Mouse events for dragging
  const handleMouseDown = (e: React.MouseEvent) => {
    setAutoRotate(false);
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    
    setRotation(prev => ({
      x: prev.x + deltaY * 0.5,
      y: prev.y + deltaX * 0.5
    }));
    
    setDragStart({ x: e.clientX, y: e.clientY });
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
    // Resume auto-rotation after a brief pause
    setTimeout(() => setAutoRotate(true), 2000);
  };
  
  return (
    <motion.div 
      ref={containerRef}
      className={`relative ${className}`}
      style={{ 
        width: size, 
        height: size, 
        perspective: 1000,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Glowing sphere background */}
      <div 
        className="absolute rounded-full"
        style={{
          width: size * 0.9,
          height: size * 0.9,
          left: '5%',
          top: '5%',
          background: 'radial-gradient(circle, rgba(236,72,153,0.1) 0%, rgba(236,72,153,0.05) 50%, rgba(0,0,0,0) 70%)',
          filter: 'blur(10px)',
        }}
      />
      
      <motion.div
        className="absolute inset-0"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
        }}
      >
        {skillsWithPositions.map((skill, index) => {
          const { x, y, z } = skill.position;
          const scale = 0.6 + skill.level / 100;
          const radius = size / 2 * 0.8;
          const isHovered = hoveredSkill === skill;
          
          return (
            <motion.div
              key={index}
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 skill-tag"
              style={{
                transformStyle: 'preserve-3d',
                transform: `translateX(${x * radius}px) translateY(${y * radius}px) translateZ(${z * radius}px) scale(${scale})`,
                color: isHovered ? '#ec4899' : (skill.color || '#ec4899'),
                fontSize: `${skill.fontSize}px`,
                fontWeight: 'bold',
                opacity: z < 0 ? skill.opacity * 0.7 : skill.opacity,
                textShadow: isHovered ? '0 0 10px rgba(236, 72, 153, 0.8), 0 0 20px rgba(236, 72, 153, 0.5)' : '0 0 5px rgba(236, 72, 153, 0.5)',
                whiteSpace: 'nowrap',
                zIndex: Math.floor((z + 1) * 100),
                transition: 'color 0.3s, text-shadow 0.3s, transform 0.3s'
              }}
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
              whileHover={{ scale: scale * 1.2 }}
            >
              {skill.name}
            </motion.div>
          );
        })}
      </motion.div>
      
      {/* Tooltip for hovered skill */}
      {hoveredSkill && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-sm border border-primary/20 rounded-md p-3 shadow-lg z-50"
          style={{ width: size * 0.8, maxWidth: '300px' }}
        >
          <div className="text-center">
            <h4 className="font-bold text-primary">{hoveredSkill.name}</h4>
            <div className="mt-2 h-2 w-full bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary"
                style={{ width: `${hoveredSkill.level}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {hoveredSkill.category && <span className="mr-2">{hoveredSkill.category}</span>}
              Proficiency: {hoveredSkill.level}%
            </p>
            {hoveredSkill.description && (
              <p className="mt-2 text-xs">{hoveredSkill.description}</p>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}