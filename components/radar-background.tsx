'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function RadarBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const setCanvasSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    // Create particles
    const particles: Particle[] = [];
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        color: `rgba(236, 72, 153, ${Math.random() * 0.3 + 0.1})`,
        speedX: Math.random() * 0.3 - 0.15,
        speedY: Math.random() * 0.3 - 0.15
      });
    }
    
    // Create grid lines
    const gridLines: GridLine[] = [];
    const gridSize = 30;
    const gridCount = 12;
    
    for (let i = 0; i < gridCount; i++) {
      const angle = (Math.PI * 2 / gridCount) * i;
      gridLines.push({
        angle,
        length: 0,
        maxLength: Math.max(canvas.width, canvas.height),
        speed: 0.2 + Math.random() * 0.3
      });
    }
    
    // Animation variables
    let rotation = 0;
    const rotationSpeed = 0.0005;
    let hue = 0;
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw radial gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, 
        canvas.height / 2, 
        0, 
        canvas.width / 2, 
        canvas.height / 2, 
        canvas.width / 2
      );
      
      gradient.addColorStop(0, 'rgba(236, 72, 153, 0.05)');
      gradient.addColorStop(0.5, 'rgba(124, 58, 237, 0.03)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw grid lines
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate(rotation);
      
      gridLines.forEach(line => {
        // Update line length
        line.length += line.speed;
        if (line.length > line.maxLength) {
          line.length = 0;
        }
        
        // Draw line
        ctx.beginPath();
        ctx.moveTo(0, 0);
        const endX = Math.cos(line.angle) * line.length;
        const endY = Math.sin(line.angle) * line.length;
        ctx.lineTo(endX, endY);
        
        ctx.strokeStyle = `rgba(236, 72, 153, ${0.1 + (1 - line.length / line.maxLength) * 0.1})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });
      
      ctx.restore();
      
      // Update rotation
      rotation += rotationSpeed;
      
      // Update and draw particles
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Move particles
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
      });
      
      // Update hue
      hue = (hue + 0.1) % 360;
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  speedX: number;
  speedY: number;
}

interface GridLine {
  angle: number;
  length: number;
  maxLength: number;
  speed: number;
}