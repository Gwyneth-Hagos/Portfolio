'use client';

import { AnimatedTechLogos } from '@/components/animated-tech-logos';
import { ArrowUpRight, Github } from 'lucide-react';
import Link from 'next/link';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  role?: string;
}

export function ProjectCard({
  title,
  description,
  image,
  tags,
  githubUrl,
  liveUrl,
  role,
}: ProjectCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-primary/20 bg-secondary/30 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-pink-500/20 hover:shadow-xl">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </div>
      
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold">{title}</h3>
        {role && <p className="mb-2 text-sm text-primary">{role}</p>}
        
        <p className="text-muted-foreground">
          {description.split('\\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < description.split('\\n').length - 1 && <br />}
            </span>
          ))}
        </p>
        
        <div className="mt-4 h-8 overflow-hidden">
          <AnimatedTechLogos tags={tags} />
        </div>
        
        <div className="mt-6 flex justify-between">
          {githubUrl && (
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <Github className="h-4 w-4" />
              <span>Code</span>
            </Link>
          )}
          
          {liveUrl && (
            <Link
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm transition-colors hover:text-primary"
            >
              <span>Live Demo</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}