'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import VanillaTilt from 'vanilla-tilt';
import { AnimatedTechLogos } from '@/components/animated-tech-logos';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  role?: string;
  category: string;
}

interface HorizontalProjectGalleryProps {
  projects: Project[];
}

export function HorizontalProjectGallery({ projects }: HorizontalProjectGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    projectRefs.current.forEach((ref) => {
      if (ref) {
        VanillaTilt.init(ref, {
          max: 10,
          speed: 400,
          glare: true,
          'max-glare': 0.3,
          scale: 1.05,
        });
      }
    });
  }, []);

  return (
    <div className="flex h-[80vh] overflow-hidden">
      {/* Left Panel - Project Details */}
      <motion.div 
        className="w-1/3 border-r border-primary/20 p-8 overflow-auto"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <AnimatePresence mode="wait">
          {selectedProject ? (
            <motion.div
              key={selectedProject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <motion.h2 
                className="text-3xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {selectedProject.title}
              </motion.h2>
              
              {selectedProject.role && (
                <motion.p 
                  className="text-primary"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {selectedProject.role}
                </motion.p>
              )}
              
              <motion.div 
                className="space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map(tag => (
                    <motion.span 
                      key={tag}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
                
                <div className="text-muted-foreground space-y-2">
                  {selectedProject.description.split('\n').map((line, i) => (
                    <motion.p
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + (i * 0.1) }}
                    >
                      {line.replace('●', '').trim()}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {selectedProject.githubUrl && (
                  <Link href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="hover-glow">View Code</Button>
                  </Link>
                )}
                {selectedProject.liveUrl && (
                  <Link href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                    <Button className="gap-2 hover-glow">
                      View Live
                      <ArrowUpRight className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-center"
            >
              <h2 className="text-3xl font-bold mb-4">My Projects</h2>
              <p className="text-muted-foreground mb-6">
                Select a project from the right to view details
              </p>
              <div className="w-16 h-16 border-t-2 border-primary rounded-full animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Right Panel - Horizontal Scrolling Projects */}
      <div className="w-2/3 flex overflow-x-auto overflow-y-hidden hide-scrollbar perspective-1000">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            ref={el => projectRefs.current[index] = el}
            className={`min-w-[400px] h-full p-4 cursor-pointer transition-all duration-300 preserve-3d ${
              selectedProject?.id === project.id ? 'opacity-100' : 'opacity-50 grayscale'
            }`}
            onClick={() => setSelectedProject(project)}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ 
              opacity: 1, 
              grayscale: 0,
            }}
          >
            <div 
              className="w-full h-full rounded-lg overflow-hidden relative group"
              style={{
                backgroundImage: `url(${project.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex flex-col justify-end p-6 transform transition-transform duration-300">
                <motion.h3 
                  className="text-2xl font-bold mb-2"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {project.title}
                </motion.h3>
                
                <motion.p 
                  className="text-primary mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {project.category}
                </motion.p>
                
                <motion.div 
                  className="flex flex-wrap gap-2 mb-4"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <AnimatedTechLogos tags={project.tags} />
                </motion.div>
                
                {selectedProject?.id === project.id && (
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-1 bg-primary"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}