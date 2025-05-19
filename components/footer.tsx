'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

export function Footer() {
  return (
    <footer className="border-t bg-background/50 backdrop-blur-md perspective-1000">
      <div className="container py-12">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 gap-8 md:grid-cols-4 preserve-3d"
        >
          <motion.div 
            className="space-y-4"
            whileHover={{ scale: 1.02, rotateX: 5, rotateY: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <h3 className="gradient-text text-2xl font-bold">CodeWithGwy</h3>
            <p className="text-sm text-muted-foreground">
              You + me + cool ideas = 🔥 Let's build something wild.
            </p>
            <p className="text-sm font-medium mt-2">
              Gwyneth Mae Hagos, remember my name.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, rotateY: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-sm text-muted-foreground hover:text-primary">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/skills" className="text-sm text-muted-foreground hover:text-primary">
                  Skills
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, rotateY: -5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">More</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02, rotateX: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">Connect</h4>
            <div className="flex space-x-3">
              <motion.a 
                href="https://github.com/Gwyneth-Hagos" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -5, rotateY: 10 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Button variant="outline" size="icon" className="hover-glow hover:text-black">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </motion.a>
              <motion.a 
                href="https://www.linkedin.com/in/gwynethmaehagos" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -5, rotateY: 10 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Button variant="outline" size="icon" className="hover-glow hover:text-black">
                  <Linkedin className="h-4 w-4" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </motion.a>
              <motion.a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=gwynyhagos@gmail.com" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ y: -5, rotateY: 10 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <Button variant="outline" size="icon" className="hover-glow hover:text-black">
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Email</span>
                </Button>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="mt-12 border-t pt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.p 
            className="text-sm text-muted-foreground"
            whileHover={{ scale: 1.05, color: "#ec4899" }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            © {new Date().getFullYear()} CodeWithGwy. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </footer>
  )
}