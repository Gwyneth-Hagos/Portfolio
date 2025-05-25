'use client'

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import VanillaTilt from 'vanilla-tilt';
import { HorizontalProjectGallery } from '@/components/horizontal-project-gallery';

const mockProjects = [
  {
    id: 1,
    title: 'Silan Appointment System',
    role: 'Frontend Developer, Documenter, and UI/UX Designer',
    description: '● Designed and developed an online dental appointment system to streamline bookings and minimize no-shows.\n● Enhanced patient experience by implementing responsive design and intuitive user flows.\n● Reduced administrative workload by integrating automated scheduling and notifications.',
    image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['React.js', 'TypeScript', 'TailwindCSS', 'Vite', 'Firebase'],
    githubUrl: '#',
    liveUrl: '#',
    category: 'Web Application',
  },
  {
    id: 2,
    title: 'TaskMate: A Student Task Tracker App',
    role: 'Full Stack Developer',
    description: '● Developed TaskMate, a productivity and task management app designed for high school and college students to organize academic work, manage deadlines, and enhance time management skills.\n● The app addresses common student challenges such as procrastination, disorganization, and missed deadlines by providing an intuitive, all-in-one solution.',
    image: 'https://images.pexels.com/photos/5717666/pexels-photo-5717666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['JavaScript', 'Node.js', 'React Native', 'Expo Go', 'Android Studio'],
    githubUrl: '#',
    liveUrl: '#',
    category: 'Mobile App',
  },
  {
    id: 3,
    title: 'Vape Shop Inventory Management System',
    role: 'Full Stack Developer',
    description: '● Developed an online inventory management system for a vape shop to enhance stock tracking, oversee sales, and manage products.\n● This system enables shop owners to effectively handle inventory, monitor stock levels in real-time, and produce sales reports.',
    image: 'https://images.pexels.com/photos/3888151/pexels-photo-3888151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['HTML', 'CSS', 'React.js', 'PHP', 'Bootstrap', 'jQuery'],
    githubUrl: '#',
    liveUrl: '#',
    category: 'Web Application',
  },
  {
    id: 4,
    title: 'AiSenso - BPI Datawave 2024 Hackathon',
    role: 'Researcher & Pitcher',
    description: '● Led concept development for an AI-driven platform supporting rural Filipino MSMEs with digital marketing and e-commerce tools.\n● Developed a user-centric prototype, ensuring accessibility for entrepreneurs with limited digital literacy.\n● Focused on intuitive onboarding and seamless user experience to enhance business growth.',
    image: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    tags: ['Figma'],
    githubUrl: '#',
    liveUrl: '#',
    category: 'UI/UX Design',
  }
];

export default function ProjectsPage() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    
    if (!cursor || !cursorDot) return;

    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      
      // Animate the outer ring
      cursor.style.transform = `translate(${clientX - cursor.offsetWidth / 2}px, ${clientY - cursor.offsetHeight / 2}px)`;
      
      // Animate the inner dot with a slight delay for a trailing effect
      requestAnimationFrame(() => {
        cursorDot.style.transform = `translate(${clientX - cursorDot.offsetWidth / 2}px, ${clientY - cursorDot.offsetHeight / 2}px)`;
      });
    };

    // Handle cursor entering/leaving interactive elements
    const handleInteraction = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"]');
      
      if (isInteractive) {
        cursor.classList.add('scale-150');
        cursorDot.classList.add('opacity-0');
      } else {
        cursor.classList.remove('scale-150');
        cursorDot.classList.remove('opacity-0');
      }
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseover', handleInteraction);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseover', handleInteraction);
    };
  }, []);

  return (
    <div className="relative pt-20">
      {/* Custom Cursor */}
      <div 
        ref={cursorRef}
        className="pointer-events-none fixed z-50 h-8 w-8 rounded-full border border-primary transition-transform duration-150 ease-out"
      />
      <div 
        ref={cursorDotRef}
        className="pointer-events-none fixed z-50 h-2 w-2 rounded-full bg-primary transition-transform duration-100 ease-out"
      />

      {/* Projects Gallery */}
      <motion.section 
        className="h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <HorizontalProjectGallery projects={mockProjects} />
      </motion.section>
    </div>
  );
}