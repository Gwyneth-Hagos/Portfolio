'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ProjectCard } from '@/components/project-card'

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
    category: 'web',
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
    category: 'mobile',
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
    category: 'web',
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
    category: 'design',
  }
];

undefined

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProjectsPage() {
  const projects = mockProjects;

  return (
    <div className="relative pt-20">
      {/* Header */}
      <section className="py-16 md:py-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
              My <span className="gradient-text">Projects</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              A showcase of my humble student projects
            </p>
          </motion.div>
        </div>
      </section>



      {/* Projects Grid */}
      <section className="pb-24">
        <div className="container">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((project) => (
              <motion.div key={project.id} variants={item}>
                <ProjectCard
                  title={project.title}
                  role={project.role}
                  description={project.description}
                  image={project.image}
                  tags={project.tags}
                  githubUrl={project.githubUrl}
                  liveUrl={project.liveUrl}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}