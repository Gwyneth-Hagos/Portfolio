'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react'
import { ContactFormAlternative } from '@/components/contact-form-alternative'
import { DirectContactButton } from '@/components/direct-contact-button'

export default function ContactPage() {

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
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Have a question or want to work together? I'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-24">
        <div className="container">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-lg border bg-card p-8"
            >
              <h2 className="mb-6 text-2xl font-bold">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">gwynyhagos@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-muted-foreground">09948259585</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-muted-foreground">Dasmariñas, Cavite Philippines</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h3 className="mb-4 text-lg font-medium">Connect with me</h3>
                <div className="flex space-x-4">
                  <a href="https://github.com/Gwyneth-Hagos" target="_blank" rel="noopener noreferrer">
                    <Button size="icon" variant="outline" className="hover-glow hover:text-black">
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </a>
                  <a href="https://www.linkedin.com/in/gwynethmaehagos" target="_blank" rel="noopener noreferrer">
                    <Button size="icon" variant="outline" className="hover-glow hover:text-black">
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </a>
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=gwynyhagos@gmail.com" target="_blank" rel="noopener noreferrer">
                    <Button size="icon" variant="outline" className="hover-glow hover:text-black">
                      <Mail className="h-5 w-5" />
                      <span className="sr-only">Email</span>
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
            
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-lg border bg-card p-8"
            >
              <h2 className="mb-6 text-2xl font-bold">Send a Message</h2>
              
              <div>
                <ContactFormAlternative />
                <DirectContactButton />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}