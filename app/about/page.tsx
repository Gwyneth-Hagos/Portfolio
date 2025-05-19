'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Download, GraduationCap, Briefcase } from 'lucide-react'
import Link from 'next/link'

const educationTimeline = [
  {
    year: '2022 - Present',
    degree: 'BS in Computer Science',
    institution: 'Cavite State University Don Severino de Las Alas Campus',
    description: 'Studied the principles of computing, programming, and data structures, with a focus on software development, algorithms, systems design, and problem-solving using technology. Gained hands-on experience in coding, debugging, and building applications to solve real-world challenges.',
  },
  {
    year: '2020 - 2022',
    degree: 'Information and Communications Technology Strand',
    institution: 'Emilio Aguinaldo College Cavite',
    description: 'Focused on digital technologies, including computer systems, programming, and multimedia, preparing for careers in IT and related fields.',
  },
]

const experienceTimeline = [
  {
    year: '2024 - Present',
    role: 'Vice Chief of Marketing Officer',
    company: 'Amazon Web Services Learning Club – Spade',
    description: 'Led marketing efforts that boosted follower growth by 700+ and reached over 58.7K users in less than a year. Managed branding, content creation, and social media campaigns to increase engagement, while overseeing event promotions and community outreach to expand visibility. Continuously analyzed performance data to refine strategies for greater audience impact.',
  },
  {
    year: '2025',
    role: 'Content Creator',
    company: 'Arduino Day Philippines 2025',
    description: 'Produced engaging video content, marketing materials, and captions for the official page and provided strategic insights on audience engagement and video marketing.',
  },
  {
    year: '2023 - 2024',
    role: 'Public Relations Officer',
    company: 'JPCS - Cavite State University Chapter',
    description: 'Created promotional materials and pubmats for events, campaigns, and announcements while managing visual branding to ensure a consistent and professional image. Oversaw the organization\'s social media accounts and email communications for external affairs.',
  },
  {
    year: '2023 - 2024',
    role: 'ENCRYPT of Committee on Internal Affairs',
    company: 'Computer Science Student Organization',
    description: 'Assisted in organizing internal events and managing member relations to promote a supportive community. Helped ensure the smooth execution of activities and operations while maintaining internal documentation and records for efficient workflow.',
  },
]

const TimelineItem = ({ year, title, subtitle, description }: { year: string; title: string; subtitle: string; description: string }) => (
  <div className="relative ml-6 pb-12">
    <div className="absolute -left-[25px] mt-1.5 h-12 w-12 animate-pulse rounded-full bg-primary/20 transition-all duration-300 group-hover:animate-none" />
    <div className="absolute -left-[10px] mt-1.5 h-4 w-4 rounded-full bg-primary" />
    <div className="absolute left-0 top-1 ml-6 h-full w-[1px] bg-primary/30" />
    
    <div className="pt-1">
      <span className="mb-2 inline-block rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
        {year}
      </span>
      <h3 className="mb-1 text-lg font-semibold">{title}</h3>
      <h4 className="mb-2 text-sm text-muted-foreground">{subtitle}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
)

export default function AboutPage() {
  return (
    <div className="relative pt-20">
      {/* Header */}
      <section className="py-16 md:py-24 perspective-1000">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20, rotateX: 10 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            className="mx-auto max-w-3xl text-center preserve-3d"
          >
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              About <span className="gradient-text">Me</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Get to know more about my journey, experience, and passion for development!
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Me */}
      <section className="pb-20 perspective-1000">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, rotateX: 10, y: 100 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 preserve-3d"
          >
            {/* Image */}
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
            
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col justify-center"
            >
              <h2 className="mb-4 text-3xl font-bold">About Me</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Hey! I'm Gwyneth — a third-year Computer Science student who loves building things that make life easier (and prettier ✨). I dabble in both frontend and backend dev, and I'm aiming to become a full-stack developer and future Project Manager.
                </p>
                <p>
                  When I'm not coding, you'll find me leading marketing campaigns, attending local tech events, or unapologetically simping for 2D men.
                </p>
                <p>
                  Basically? I mix logic, creativity, and a healthy dose of aesthetic chaos into everything I do.
                </p>
              </div>
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
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Education & Experience */}
      <section className="py-20 perspective-1000">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, rotateX: 10, y: 50 }}
            whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center preserve-3d"
          >
            <h2 className="mb-2 text-3xl font-bold">Education & Experience</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              My academic journey and professional experience
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 100, rotateY: 5 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 preserve-3d"
          >
            {/* Education */}
            <motion.div
              initial={{ opacity: 0, x: -50, rotateY: -10 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.02, rotateY: 5 }}
              className="perspective-1000"
            >
              <Card className="group overflow-hidden">
                <CardContent className="p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <h3 className="text-2xl font-bold">Education</h3>
                  </div>
                  
                  <div className="relative">
                    {educationTimeline.map((item, index) => (
                      <TimelineItem
                        key={index}
                        year={item.year}
                        title={item.degree}
                        subtitle={item.institution}
                        description={item.description}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Experience */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: 10 }}
              whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.02, rotateY: -5 }}
              className="perspective-1000"
            >
              <Card className="group overflow-hidden perspective-1000">
                <CardContent className="p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <h3 className="text-2xl font-bold">Experience</h3>
                  </div>
                  
                  <div className="relative">
                    {/* Always visible experiences */}
                    {experienceTimeline.slice(0, 2).map((item, index) => (
                      <TimelineItem
                        key={index}
                        year={item.year}
                        title={item.role}
                        subtitle={item.company}
                        description={item.description}
                      />
                    ))}
                    
                    {/* Hidden experiences with hover effect */}
                    <div className="hidden-experiences overflow-hidden">
                      <div className="group-hover:animate-open-book origin-left preserve-3d">
                        {experienceTimeline.slice(2).map((item, index) => (
                          <TimelineItem
                            key={index + 2}
                            year={item.year}
                            title={item.role}
                            subtitle={item.company}
                            description={item.description}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 text-center text-sm text-muted-foreground group-hover:opacity-0 transition-opacity duration-300">
                    <p>Hover to see more experiences</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}