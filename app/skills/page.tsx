'use client'

import { motion } from 'framer-motion'
import { SkillCard } from '@/components/skill-card'

// Import icons
import {
  TerminalSquare,
  Globe,
  Database,
  Layout,
  Server,
  Cpu,
  Cloud,
  PenTool,
  Smartphone,
  LineChart,
  GitBranch,
  FileCog,
} from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function SkillsPage() {
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
              My <span className="gradient-text">Skills</span> & Expertise
            </h1>
            <p className="text-lg text-muted-foreground">
              A comprehensive look at my technical capabilities and areas of expertise
            </p>
          </motion.div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="pb-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3"
              >
                <motion.div variants={item}>
                  <SkillCard
                    icon={<TerminalSquare />}
                    title="Java"
                    level={35}
                  />
                </motion.div>
                
                <motion.div variants={item}>
                  <SkillCard
                    icon={<Cpu />}
                    title="PHP"
                    level={55}
                  />
                </motion.div>
                
                <motion.div variants={item}>
                  <SkillCard
                    icon={<Globe />}
                    title="JavaScript"
                    level={75}
                  />
                </motion.div>
                
                <motion.div variants={item}>
                  <SkillCard
                    icon={<Layout />}
                    title="HTML & CSS"
                    level={75}
                  />
                </motion.div>
                
                <motion.div variants={item}>
                  <SkillCard
                    icon={<PenTool />}
                    title="TailwindCSS"
                    level={75}
                  />
                </motion.div>
                
                <motion.div variants={item}>
                  <SkillCard
                    icon={<Layout />}
                    title="React.js"
                    level={75}
                  />
                </motion.div>
                
                <motion.div variants={item}>
                  <SkillCard
                    icon={<Smartphone />}
                    title="Flutter"
                    level={15}
                  />
                </motion.div>
                
                <motion.div variants={item}>
                  <SkillCard
                    icon={<Server />}
                    title="Node.js"
                    level={65}
                  />
                </motion.div>
                
                <motion.div variants={item}>
                  <SkillCard
                    icon={<Database />}
                    title="MySQL"
                    level={55}
                  />
                </motion.div>
                
                <motion.div variants={item}>
                  <SkillCard
                    icon={<Database />}
                    title="Firebase & MongoDB"
                    level={45}
                  />
                </motion.div>
                
                <motion.div variants={item}>
                  <SkillCard
                    icon={<PenTool />}
                    title="Figma"
                    level={25}
                  />
                </motion.div>
                
                <motion.div variants={item}>
                  <SkillCard
                    icon={<PenTool />}
                    title="Adobe Creative Suite"
                    level={35}
                  />
                </motion.div>
              </motion.div>
            </div>
            
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-secondary/30 p-6 rounded-lg border border-primary/20 h-full"
              >
                <h2 className="text-2xl font-bold mb-6 gradient-text">Skills Overview</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold">Programming Languages</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-2">
                      <li>Java</li>
                      <li>PHP</li>
                      <li>JavaScript</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold">Frontend Development</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-2">
                      <li>HTML, CSS</li>
                      <li>TailwindCSS, SCSS</li>
                      <li>React.js</li>
                      <li>Flutter</li>
                      <li>Vite</li>
                      <li>Bootstrap</li>
                      <li>JQuery</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold">Backend Development</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-2">
                      <li>Node.js</li>
                      <li>PHP</li>
                      <li>MySQL</li>
                      <li>Firebase</li>
                      <li>MongoDB</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold">Design Tools</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-2">
                      <li>Blender</li>
                      <li>Figma</li>
                      <li>Notion</li>
                      <li>Adobe Creative Suite</li>
                      <li>Canva</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}