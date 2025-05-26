'use client'

import { motion } from 'framer-motion'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-background-secondary border-t border-white/10">
      <div className="container-fluid py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-heading font-bold text-gradient mb-4">
              AI Image Studio
            </h3>
            <p className="text-foreground-secondary mb-6 max-w-md">
              Revolucionando la creación de arte digital con inteligencia artificial. 
              Construido para demostrar expertise en desarrollo fullstack.
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://github.com/tuusername"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-accent-cyan/20 flex items-center justify-center transition-colors"
              >
                <Github className="w-5 h-5 text-foreground-secondary hover:text-accent-cyan" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://twitter.com/tuusername"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-accent-cyan/20 flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5 text-foreground-secondary hover:text-accent-cyan" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="https://linkedin.com/in/tuusername"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-accent-cyan/20 flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5 text-foreground-secondary hover:text-accent-cyan" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="mailto:tu@email.com"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-accent-cyan/20 flex items-center justify-center transition-colors"
              >
                <Mail className="w-5 h-5 text-foreground-secondary hover:text-accent-cyan" />
              </motion.a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground-primary mb-4">Producto</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-foreground-secondary hover:text-accent-cyan transition-colors">Características</a></li>
              <li><a href="#demo" className="text-foreground-secondary hover:text-accent-cyan transition-colors">Demo</a></li>
              <li><a href="#gallery" className="text-foreground-secondary hover:text-accent-cyan transition-colors">Galería</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground-primary mb-4">Desarrollador</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-foreground-secondary hover:text-accent-cyan transition-colors">Portfolio</a></li>
              <li><a href="#" className="text-foreground-secondary hover:text-accent-cyan transition-colors">Blog</a></li>
              <li><a href="#" className="text-foreground-secondary hover:text-accent-cyan transition-colors">Contacto</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 text-center">
          <p className="text-foreground-secondary">
            © 2024 AI Image Studio. Proyecto de Portfolio desarrollado con ❤️ y ☕
          </p>
        </div>
      </div>
    </footer>
  )
} 