'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

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

  return (
    <div className="flex h-[80vh] overflow-hidden">
      {/* Left Panel - Project Details */}
      <div className="w-1/3 border-r border-primary/20 p-8 overflow-auto">
        {selectedProject ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            key={selectedProject.id}
          >
            <h2 className="text-3xl font-bold mb-4">{selectedProject.title}</h2>
            {selectedProject.role && (
              <p className="text-primary mb-4">{selectedProject.role}</p>
            )}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProject.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-muted-foreground mb-6">
              {selectedProject.description.split('\n').map((line, i) => (
                <p key={i} className="mb-2">
                  {line.replace('●', '').trim()}
                </p>
              ))}
            </div>
            <div className="flex gap-4">
              {selectedProject.githubUrl && (
                <Link href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline">View Code</Button>
                </Link>
              )}
              {selectedProject.liveUrl && (
                <Link href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="gap-2">
                    View Live
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
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
      </div>

      {/* Right Panel - Horizontal Scrolling Projects */}
      <div className="w-2/3 flex overflow-x-auto overflow-y-hidden">
        {projects.map(project => (
          <motion.div
            key={project.id}
            className={`min-w-[400px] h-full p-4 cursor-pointer transition-all duration-300 ${
              selectedProject?.id === project.id ? 'opacity-100' : 'opacity-50 grayscale'
            }`}
            onClick={() => setSelectedProject(project)}
            whileHover={{ 
              opacity: 1, 
              grayscale: 0, 
              scale: 1.02 
            }}
            transition={{ duration: 0.3 }}
          >
            <div 
              className="w-full h-full rounded-lg overflow-hidden relative"
              style={{
                backgroundImage: `url(${project.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-primary mb-4">{project.category}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.slice(0, 3).map(tag => (
                    <span 
                      key={tag} 
                      className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                      +{project.tags.length - 3} more
                    </span>
                  )}
                </div>
                {selectedProject?.id === project.id && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-primary" />
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}