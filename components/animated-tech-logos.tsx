'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TechLogo {
  name: string;
  logo: string;
}

interface AnimatedTechLogosProps {
  tags: string[];
  className?: string;
}

// Map of tech names to their logo URLs
const techLogos: Record<string, string> = {
  'React.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'React Native': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  'HTML': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  'CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  'TailwindCSS': 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg',
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'PHP': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-plain.svg',
  'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  'Firebase': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
  'Vite': 'https://vitejs.dev/logo.svg',
  'Bootstrap': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
  'jQuery': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg',
  'Expo Go': 'https://play-lh.googleusercontent.com/algsmuhitlyCU_Yy3IU7-7KYIhCBwx5UJG4Bln-hygBjjlUVCiGo1y8W5JNqYm9WW3s=w240-h480-rw',
  'Android Studio': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg',
  'Figma': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  'Three.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg',
  'Redux': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg',
  'Material UI': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg',
  'Chart.js': 'https://www.chartjs.org/img/chartjs-logo.svg',
  'Stripe': 'https://cdn.worldvectorlogo.com/logos/stripe-4.svg',
  'Next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
  'Framer Motion': 'https://camo.githubusercontent.com/179d66ab2b0321726c88a586c4ad38802e7113a6c2d205a12f2b03337a62cc84/68747470733a2f2f6672616d657275736572636f6e74656e742e636f6d2f696d616765732f34386861395a52396f5a51475136675a38595566456c50335430412e706e67',
};

export function AnimatedTechLogos({ tags, className = '' }: AnimatedTechLogosProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Get logos for the tags
  const logos: TechLogo[] = tags
    .filter(tag => techLogos[tag]) // Only include tags that have logos
    .map(tag => ({
      name: tag,
      logo: techLogos[tag]
    }));
  
  // Only add duplicates if there's more than one logo
  const allLogos = logos.length > 1 ? [...logos, ...logos] : logos;
  
  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ height: '32px', paddingLeft: logos.length === 1 ? '40px' : '0' }}
    >
      <motion.div
        className={`flex ${logos.length === 1 ? 'justify-start' : 'absolute'}`}
        animate={logos.length > 1 ? { 
          x: [0, -100 * logos.length]
        } : {}}
        transition={logos.length > 1 ? { 
          repeat: Infinity,
          duration: logos.length * 2,
          ease: "linear",
        } : {}}
      >
        {allLogos.map((tech, index) => (
          <div 
            key={`${tech.name}-${index}`} 
            className="flex items-center mx-3 bg-secondary/30 rounded-full px-4 py-1 border border-primary/10 min-w-max"
            title={tech.name}
          >
            <img 
              src={tech.logo} 
              alt={tech.name} 
              className="w-5 h-5 mr-2" 
            />
            <span className="text-xs">{tech.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}