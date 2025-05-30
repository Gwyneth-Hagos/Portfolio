'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { HeroScene } from '@/components/hero-scene'
import { ProjectCarousel } from '@/components/project-carousel'
import { SkillCard } from '@/components/skill-card'
import { TypewriterEffect } from '@/components/typewriter-effect'
import { GlitchText } from '@/components/glitch-text'
import { HoverRevealText } from '@/components/hover-reveal-text'
import { WordGlow } from '@/components/word-glow'
import { HolographicTitle } from '@/components/holographic-title'
import { ArrowDown, ArrowRight, Github, LinkedinIcon, Mail, Download, Code, Database, Layout, Globe, Cpu } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const container = {
  hidden: { opacity: 0, rotateX: 5 },
  show: {
    opacity: 1,
    rotateX: 0,
    transition: {
      staggerChildren: 0.1,
      duration: 0.8,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20, z: -50 },
  show: { 
    opacity: 1, 
    y: 0, 
    z: 0,
    transition: { 
      duration: 0.5,
      type: "spring",
      stiffness: 100
    } 
  },
}

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden perspective-1000">
        <HeroScene />
        
        <div className="container relative z-10">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="mx-auto max-w-3xl text-center preserve-3d"
          >
            <motion.h1
              variants={item}
              className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
            >
              <GlitchText text="Bold code. Big dreams. I'm" /> <span className="gradient-text">Gwyneth</span>.
            </motion.h1>
            
            <motion.p
              variants={item}
              className="mb-8 text-lg text-muted-foreground md:text-xl"
            >
              <TypewriterEffect 
                text="Aspiring full-stack dev and project lead—crafting user-first solutions through code."
                delay={40}
              />
            </motion.p>
            
            <motion.div variants={item} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="#projects">
                <Button size="lg" className="gap-2 rounded-full bg-primary px-8 hover:bg-primary/80">
                  View My Work
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              
              <Link href="/contact">
                <Button size="lg" variant="outline" className="gap-2 rounded-full px-8">
                  Contact Me
                  <Mail className="h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
            
            <motion.div
              variants={item}
              className="mt-10 flex items-center justify-center gap-4"
            >
              <a href="https://github.com/Gwyneth-Hagos" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-black">
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="https://www.linkedin.com/in/gwynethmaehagos" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-black">
                <LinkedinIcon className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=gwynyhagos@gmail.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-black">
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-bounce">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full border border-primary/50 bg-background/30 backdrop-blur-sm"
            aria-label="Scroll down"
            onClick={() => {
              const aboutSection = document.getElementById('about')
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative border-t py-24 perspective-1000">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, rotateX: 10, y: 100 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 preserve-3d"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative aspect-square overflow-hidden rounded-xl perspective-1000 group"
              whileHover={{ scale: 1.02 }}
            >
              <motion.div 
                className="relative w-full h-full transition-all duration-300 preserve-3d"
                whileHover={{ 
                  rotateX: 5, 
                  rotateY: 5,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
              >
                <Image
                  src="https://i.ibb.co/b9PJCKp/487921174-18366443533121794-1195605337076468221-n.jpg"
                  alt="Profile portrait"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col justify-center"
            >
              <HolographicTitle text="About Me" className="mb-4 text-3xl font-bold" />
              <motion.div 
                className="space-y-4 text-muted-foreground perspective-1000 preserve-3d"
                whileHover={{ rotateX: 5, rotateY: 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <p>
                  <WordGlow 
                    text="Hey! I'm Gwyneth — a third-year Computer Science student who loves building things that make life easier (and prettier ✨). I dabble in both frontend and backend dev, and I'm aiming to become a full-stack developer and future Project Manager."
                    speed={300}
                  />
                </p>
                <p>
                  <WordGlow 
                    text="When I'm not coding, you'll find me leading marketing campaigns, attending local tech events, or unapologetically simping for 2D men."
                    speed={350}
                  />
                </p>
                <p>
                  <WordGlow 
                    text="Basically? I mix logic, creativity, and a healthy dose of aesthetic chaos into everything I do."
                    speed={400}
                  />
                </p>
              </motion.div>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="/HAGOS_CV.pdf" download="HAGOS_CV.pdf">
                  <Button className="gap-2">
                    Download Resume
                    <Download className="h-4 w-4" />
                  </Button>
                </a>
                <Link href="/contact">
                  <Button variant="outline" className="gap-2 hover-glow">
                    Get in Touch
                    <Mail className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative border-t py-24 bg-secondary/30 perspective-1000">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, rotateX: 10, y: 100 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="preserve-3d"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12 text-center"
            >
              <HolographicTitle text="My Skills" className="mb-4 text-3xl font-bold" />
              <p className="mx-auto max-w-2xl text-muted-foreground">
                A comprehensive overview of my technical expertise and capabilities
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <SkillCard
                  icon={<Globe />}
                  title="JavaScript"
                  level={75}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <SkillCard
                  icon={<Layout />}
                  title="React.js"
                  level={75}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <SkillCard
                  icon={<Cpu />}
                  title="PHP"
                  level={55}
                />
              </motion.div>
            </div>

            <div className="mt-8 text-center">
              <Link href="/skills">
                <Button variant="outline" className="gap-2 hover-glow">
                  View All Skills
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Projects Section */}
      <section id="projects" className="relative border-t py-24 perspective-1000">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, rotateX: 10, y: 100 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="preserve-3d"
          >
            <div className="mb-12 text-center">
              <div className="mb-2 text-3xl font-bold sm:text-4xl">
                <HolographicTitle text="Featured Projects" className="inline-block" />
              </div>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mx-auto max-w-2xl text-muted-foreground"
              >
                A selection of my recent work
              </motion.p>
            </div>
          
            <ProjectCarousel 
              projects={[
                {
                  title: "Silan Appointment System",
                  description: "Designed and developed an online dental appointment system to streamline bookings and minimize no-shows. Enhanced patient experience by implementing responsive design and intuitive user flows.",
                  image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                  tags: ['React.js', 'TypeScript', 'TailwindCSS', 'Vite', 'Firebase'],
                  githubUrl: "#",
                  liveUrl: "#"
                },
                {
                  title: "TaskMate: A Student Task Tracker App",
                  description: "Developed TaskMate, a productivity and task management app designed for high school and college students to organize academic work, manage deadlines, and enhance time management skills.",
                  image: "https://images.pexels.com/photos/5717666/pexels-photo-5717666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                  tags: ['JavaScript', 'Node.js', 'React Native', 'Expo Go', 'Android Studio'],
                  githubUrl: "#",
                  liveUrl: "#"
                },
                {
                  title: "Vape Shop Inventory Management System",
                  description: "Developed an online inventory management system for a vape shop to enhance stock tracking, oversee sales, and manage products. This system enables shop owners to effectively handle inventory and monitor stock levels in real-time.",
                  image: "https://images.pexels.com/photos/3888151/pexels-photo-3888151.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                  tags: ['HTML', 'CSS', 'React.js', 'PHP', 'Bootstrap', 'jQuery'],
                  githubUrl: "#",
                  liveUrl: "#"
                },
                {
                  title: "AiSenso - BPI Datawave 2024 Hackathon",
                  description: "Led concept development for an AI-driven platform supporting rural Filipino MSMEs with digital marketing and e-commerce tools. Developed a user-centric prototype, ensuring accessibility for entrepreneurs with limited digital literacy.",
                  image: "https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
                  tags: ['Figma'],
                  githubUrl: "#",
                  liveUrl: "#"
                }
              ]}
              className="mx-auto max-w-5xl"
            />
            
            <div className="mt-12 text-center">
              <Link href="/projects">
                <Button variant="outline" className="gap-2 rounded-full px-8 hover-glow">
                  View All Projects
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="border-t py-24 backdrop-blur-sm perspective-1000">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, rotateX: 15, y: 50 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-3xl rounded-lg border border-primary/20 bg-secondary/30 p-8 text-center shadow-lg backdrop-blur-md preserve-3d"
            whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
          >
            <HolographicTitle text="Let's Work Together" className="mb-4 text-3xl font-bold" />
            <p className="mb-8 text-muted-foreground">
              Have a project in mind? I'm currently available for freelance work.
            </p>
            <Link href="/contact">
              <Button size="lg" className="gap-2 rounded-full bg-primary px-8 hover:bg-primary/80">
                Get in Touch
                <Mail className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}