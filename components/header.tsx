'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { NavBackground } from '@/components/nav-background'

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Skills', path: '/skills' },
  { label: 'Contact', path: '/contact' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 py-4 backdrop-blur-md'
          : 'bg-transparent py-6'
      }`}
    >
      <NavBackground />
      <div className="container flex items-center justify-between">
        <Link href="/" className="text-xl font-bold perspective-1000">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="holographic-text text-2xl font-bold preserve-3d"
            whileHover={{ 
              rotateX: 10, 
              rotateY: 5, 
              scale: 1.05,
              transition: { type: "spring", stiffness: 400 }
            }}
          >
            Code<span>WithGwy</span>
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center space-x-8 md:flex perspective-1000">
          {navItems.map((item, index) => (
            <motion.div
              key={item.path}
              className="preserve-3d"
              whileHover={{ 
                rotateX: 10, 
                rotateY: 5, 
                z: 10,
                scale: 1.1,
                transition: { type: "spring", stiffness: 400 }
              }}
            >
              <Link
                href={item.path}
                className="nav-link text-sm uppercase tracking-wider text-foreground/80 hover:text-primary"
              >
                <span className="holographic-text">{item.label}</span>
              </Link>
            </motion.div>
          ))}
          <ModeToggle />
        </nav>

        {/* Mobile Navigation Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: mobileMenuOpen ? 'auto' : 0,
          opacity: mobileMenuOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden md:hidden"
      >
        <div className="container space-y-4 bg-background/95 px-4 py-6 backdrop-blur-md">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className="block py-2 text-foreground/80 hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </header>
  )
}