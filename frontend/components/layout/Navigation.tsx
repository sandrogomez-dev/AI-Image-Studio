'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles, Github, ExternalLink } from 'lucide-react'
import { useAppStore } from '@/stores/useAppStore'
import { Button } from '@/components/ui/Button'

interface NavigationProps {
  currentSection: number
}

const navItems = [
  { label: 'Inicio', href: '#hero', section: 0 },
  { label: 'Características', href: '#features', section: 1 },
  { label: 'Demo', href: '#demo', section: 2 },
  { label: 'Galería', href: '#gallery', section: 3 },
  { label: 'Tecnología', href: '#tech', section: 4 },
]

export function Navigation({ currentSection }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { user, isAuthenticated } = useAppStore()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass backdrop-blur-xl border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="container-fluid">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => scrollToSection('#hero')}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-accent-cyan to-accent-magenta rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-heading font-bold text-gradient">
              AI Studio
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.href)}
                className={`px-3 py-2 rounded-lg transition-all duration-200 ${
                  currentSection === item.section
                    ? 'text-accent-cyan bg-accent-cyan/10'
                    : 'text-foreground-secondary hover:text-accent-cyan hover:bg-accent-cyan/5'
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="https://github.com/tuusername/ai-image-studio"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-foreground-secondary hover:text-accent-cyan hover:bg-accent-cyan/10 transition-colors"
            >
              <Github className="w-5 h-5" />
            </motion.a>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-cyan to-accent-magenta p-0.5">
                  <div className="w-full h-full rounded-full bg-background-primary flex items-center justify-center">
                    <span className="text-sm font-medium">
                      {user?.username?.[0]?.toUpperCase()}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </div>
            ) : (
              <Button variant="primary" size="sm">
                Empezar Gratis
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-foreground-secondary hover:text-accent-cyan hover:bg-accent-cyan/10 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/10"
          >
            <div className="container-fluid py-4">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <motion.button
                    key={item.label}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(item.href)}
                    className={`px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      currentSection === item.section
                        ? 'text-accent-cyan bg-accent-cyan/10'
                        : 'text-foreground-secondary hover:text-accent-cyan hover:bg-accent-cyan/5'
                    }`}
                  >
                    {item.label}
                  </motion.button>
                ))}
                
                <div className="border-t border-white/10 pt-4 mt-2">
                  <div className="flex flex-col gap-2">
                    <a
                      href="https://github.com/tuusername/ai-image-studio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-3 rounded-lg text-foreground-secondary hover:text-accent-cyan hover:bg-accent-cyan/5 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                      Ver Código
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    
                    {!isAuthenticated && (
                      <Button variant="primary" size="sm" className="mx-4">
                        Empezar Gratis
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
} 