'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FloatingLoaderProps {
  onLoadingComplete?: () => void;
}

interface BinaryDigit {
  x: number;
  y: number;
  value: string;
  opacity: number;
  size: number;
  glitchTimer: number;
}

export function FloatingLoader({ onLoadingComplete }: FloatingLoaderProps) {
  const [stage, setStage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const text = "CodeWithGwy";
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const binaryDigitsRef = useRef<BinaryDigit[]>([]);
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  // Setup background with binary digits and static effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create binary digits - fewer on mobile
    const createBinaryDigits = () => {
      const digits: BinaryDigit[] = [];
      const digitCount = window.innerWidth < 768 ? 25 : 50;
      
      for (let i = 0; i < digitCount; i++) {
        digits.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          value: Math.random() > 0.5 ? '1' : '0',
          opacity: Math.random() * 0.7 + 0.1,
          size: Math.random() * (window.innerWidth < 768 ? 12 : 16) + (window.innerWidth < 768 ? 8 : 10),
          glitchTimer: Math.random() * 100
        });
      }
      
      binaryDigitsRef.current = digits;
    };
    
    createBinaryDigits();
    
    // Animation loop
    let animationId: number;
    let frameCount = 0;
    
    const animate = () => {
      frameCount++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw static noise background - less dense on mobile
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      
      // Create pink static noise effect
      for (let i = 0; i < data.length; i += 4) {
        // Only render some pixels for a sparse effect
        // Higher threshold on mobile = fewer pixels
        if (Math.random() > (window.innerWidth < 768 ? 0.998 : 0.996)) {
          const intensity = Math.random() * 255;
          // Pink-ish color (R, G, B, A)
          data[i] = 236;     // R
          data[i + 1] = 72;  // G
          data[i + 2] = 153; // B
          data[i + 3] = intensity * 0.3; // A (semi-transparent)
        }
      }
      
      ctx.putImageData(imageData, 0, 0);
      
      // Add a subtle pink glow
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, 
        canvas.height / 2, 
        0, 
        canvas.width / 2, 
        canvas.height / 2, 
        canvas.width / 1.5
      );
      gradient.addColorStop(0, 'rgba(236, 72, 153, 0.1)');
      gradient.addColorStop(0.5, 'rgba(147, 51, 234, 0.05)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Glitch effect - occasional horizontal lines
      if (frameCount % 20 === 0 && Math.random() > 0.7) {
        const numLines = Math.floor(Math.random() * (window.innerWidth < 768 ? 3 : 5)) + 1;
        for (let i = 0; i < numLines; i++) {
          const y = Math.random() * canvas.height;
          const height = Math.random() * 2 + 1;
          const opacity = Math.random() * 0.3 + 0.1;
          
          ctx.fillStyle = `rgba(236, 72, 153, ${opacity})`;
          ctx.fillRect(0, y, canvas.width, height);
        }
      }
      
      // Update and draw binary digits
binaryDigitsRef.current.forEach((digit, index) => {
  // Update glitch timer
  digit.glitchTimer--;
  
  // Randomly change value and reset timer - increased frequency
  if (digit.glitchTimer <= 0) {
    digit.value = Math.random() > 0.5 ? '1' : '0';
    digit.glitchTimer = Math.random() * 50 + 10; // Shorter timer for more frequent changes
    
    // More frequent opacity changes for blinking effect
    digit.opacity = Math.random() * 0.7 + 0.3; // Higher minimum opacity
  }
  
  // Add continuous floating movement
  digit.x += Math.sin(frameCount * 0.01 + index) * 0.5;
  digit.y += Math.cos(frameCount * 0.01 + index * 0.5) * 0.3;
  
  // Wrap around edges
  if (digit.x < 0) digit.x = canvas.width;
  if (digit.x > canvas.width) digit.x = 0;
  if (digit.y < 0) digit.y = canvas.height;
  if (digit.y > canvas.height) digit.y = 0;
  
  // Occasional size pulsing
  if (frameCount % 30 === 0 && Math.random() > 0.7) {
    digit.size = Math.random() * (window.innerWidth < 768 ? 12 : 16) + 
                (window.innerWidth < 768 ? 8 : 10);
  }
  
  // Draw digit with glow
  ctx.font = `${digit.size}px monospace`;
  ctx.fillStyle = `rgba(236, 72, 153, ${digit.opacity})`;
  ctx.shadowColor = 'rgba(236, 72, 153, 0.8)';
  ctx.shadowBlur = 10;
  ctx.fillText(digit.value, digit.x, digit.y);
  ctx.shadowBlur = 0;
  
  // Completely random repositioning occasionally
  if (frameCount % 180 === 0 && Math.random() > 0.95) {
    digit.x = Math.random() * canvas.width;
    digit.y = Math.random() * canvas.height;
  }
});

      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  // Progress through stages
  useEffect(() => {
    // Stage 0: Letters scattered and bouncing
    // Stage 1: Centered with glitch effect
    // Stage 2: Flash effect
    // Stage 3: Complete
    
    const timers = [
      setTimeout(() => setStage(1), 2500), // After 2.5s, move to glitch stage
      setTimeout(() => setStage(2), 4500), // After 4.5s, move to flash stage
      setTimeout(() => {
        setStage(3);
        if (onLoadingComplete) onLoadingComplete();
      }, 5000) // After 5s, complete
    ];
    
    return () => timers.forEach(timer => clearTimeout(timer));
  }, [onLoadingComplete]);
  
  // Generate random starting positions outside the screen
  const getRandomOutsidePosition = () => {
    const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
    
    switch (side) {
      case 0: // top
        return { x: Math.random() * 100, y: -150 };
      case 1: // right
        return { x: 150, y: Math.random() * 100 };
      case 2: // bottom
        return { x: Math.random() * 100, y: 150 };
      case 3: // left
        return { x: -150, y: Math.random() * 100 };
      default:
        return { x: -150, y: -150 };
    }
  };
  
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
      {/* Static background with binary digits */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 bg-black"
      />
      
      {/* Individual letters animation */}
      <div className="relative h-20 w-full flex items-center justify-center z-10">
        {text.split('').map((letter, index) => {
          const startPos = getRandomOutsidePosition();
          
          // Calculate final position based on letter index
          // Smaller letter width on mobile
          const letterWidth = isMobile ? 20 : 30; 
          const totalWidth = text.length * letterWidth;
          const startX = -(totalWidth / 2) + (letterWidth / 2);
          const finalX = startX + (index * letterWidth);
          
          return (
            <motion.span
              key={index}
              className={stage === 1 ? 'letter-glitch' : ''}
              initial={{ 
                x: `${startPos.x}vw`, 
                y: `${startPos.y}vh`,
                scale: 1.5,
                opacity: 0
              }}
              animate={stage === 0 
                ? {
                    x: [
                      `${startPos.x}vw`,
                      `${Math.random() * 80 - 40}vw`,
                      `${Math.random() * 60 - 30}vw`,
                      `${finalX}px`
                    ],
                    y: [
                      `${startPos.y}vh`,
                      `${Math.random() * 80 - 40}vh`,
                      `${Math.random() * 60 - 30}vh`,
                      0
                    ],
                    rotate: [0, Math.random() * 360, Math.random() * -360, 0],
                    scale: [1.5, 1.2, 0.8, 1],
                    opacity: [0, 1, 1, 1]
                  }
                : stage === 1
                ? {
                    x: `${finalX}px`,
                    y: 0,
                    rotate: 0,
                    scale: [1, 1.1, 1],
                    opacity: 1
                  }
                : { opacity: 0, transition: { duration: 0.2 } }
              }
              transition={stage === 0 
                ? { 
                    duration: 2.5,
                    times: [0, 0.3, 0.7, 1],
                    ease: "easeInOut"
                  }
                : { 
                    scale: {
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "easeInOut"
                    }
                  }
              }
              style={{ 
                color: '#ec4899',
                fontWeight: 'bold',
                fontSize: isMobile ? (stage === 1 ? '1.5rem' : '1rem') : (stage === 1 ? '3rem' : '2rem'),
                textShadow: stage === 1 ? '0 0 10px #ec4899, 0 0 20px #ec4899' : 'none',
              }}
            >
              {letter}
            </motion.span>
          );
        })}
      </div>
      
      {/* Flash effect */}
      {stage === 2 && (
        <motion.div
          key="flash"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0, 1, 0], 
            scale: [0.5, 1.5, 3],
            rotateZ: [0, 15, -15, 0]
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-primary/50 rounded-full blur-3xl z-20"
        />
      )}
      
      {/* Glitch and 3D effect styles */}
      <style jsx global>{`
        .letter-glitch {
          animation: letter-glitch 2s infinite;
        }
        
        @keyframes letter-glitch {
          0%, 100% { text-shadow: 0 0 10px #ec4899, 0 0 20px #ec4899; }
          25% { text-shadow: -2px 0 #00ffff, 2px 0 #ff00ff; }
          50% { text-shadow: 0 0 10px #ec4899, 0 0 20px #ec4899, 0 0 30px #ec4899; }
          75% { text-shadow: 2px 0 #00ffff, -2px 0 #ff00ff; }
        }
      `}</style>
    </div>
  );
}
