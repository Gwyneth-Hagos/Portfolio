'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from '@/components/project-card';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
}

interface ProjectCarouselProps {
  projects: Project[];
  className?: string;
}

export function ProjectCarousel({ projects, className = '' }: ProjectCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Show 2 projects at a time
  const visibleProjects = activeIndex === 0 
    ? [projects[0], projects[1]] 
    : [projects[2], projects[3]];
  
  const nextSlide = () => {
    setActiveIndex(activeIndex === 0 ? 1 : 0);
  };
  
  const prevSlide = () => {
    setActiveIndex(activeIndex === 0 ? 1 : 0);
  };
  
  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center justify-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute -left-16 z-10 h-12 w-12 rounded-full border border-primary/50 bg-background/70 backdrop-blur-sm"
          onClick={prevSlide}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 w-full">
          {visibleProjects.map((project, index) => (
            <div key={index} className="transform-gpu">
              <ProjectCard
                title={project.title}
                description={project.description}
                image={project.image}
                tags={project.tags}
                githubUrl={project.githubUrl}
                liveUrl={project.liveUrl}
              />
            </div>
          ))}
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute -right-16 z-10 h-12 w-12 rounded-full border border-primary/50 bg-background/70 backdrop-blur-sm"
          onClick={nextSlide}
        >
          <ArrowRight className="h-6 w-6" />
        </Button>
      </div>
      
      <div className="mt-6 flex justify-center gap-2">
        <button
          className={`h-2 rounded-full transition-all ${activeIndex === 0 ? 'bg-primary w-6' : 'bg-primary/30 w-2'}`}
          onClick={() => setActiveIndex(0)}
        />
        <button
          className={`h-2 rounded-full transition-all ${activeIndex === 1 ? 'bg-primary w-6' : 'bg-primary/30 w-2'}`}
          onClick={() => setActiveIndex(1)}
        />
      </div>
    </div>
  );
}