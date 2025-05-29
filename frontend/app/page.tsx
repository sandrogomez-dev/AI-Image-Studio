'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Zap, Image, Palette, ArrowRight, Play, Github, ExternalLink } from 'lucide-react'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { GalleryPreview } from '@/components/sections/GalleryPreview'
import { PromptStudio } from '@/components/sections/PromptStudio'
import { TechStack } from '@/components/sections/TechStack'
import { Navigation } from '@/components/layout/Navigation'
import { Footer } from '@/components/layout/Footer'
import { LoadingScreen } from '@/components/ui/LoadingScreen'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { useAudio } from '@/hooks/useAudio'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSection, setCurrentSection] = useState(0)
  const { playSound } = useAudio()

  useEffect(() => {
    // Simulate loading time for dramatic effect
    const timer = setTimeout(() => {
      setIsLoading(false)
      playSound('welcome')
    }, 2000)

    return () => clearTimeout(timer)
  }, [playSound])

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[data-section]')
      const scrollPosition = window.scrollY + window.innerHeight / 2

      sections.forEach((section, index) => {
        const sectionElement = section as HTMLElement
        const sectionTop = sectionElement.offsetTop
        const sectionHeight = sectionElement.offsetHeight

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setCurrentSection(index)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen bg-background-primary overflow-x-hidden">
      <ScrollProgress />
      <Navigation currentSection={currentSection} />
      
      <main>
        {/* Hero Section */}
        <section data-section="0" className="relative">
          <HeroSection />
        </section>

        {/* Features Section */}
        <section data-section="1" className="relative">
          <FeaturesSection />
        </section>

        {/* Prompt Studio Demo */}
        <section data-section="2" className="relative">
          <PromptStudio />
        </section>

        {/* Gallery Preview */}
        <section data-section="3" className="relative">
          <GalleryPreview />
        </section>

        {/* Tech Stack */}
        <section data-section="4" className="relative">
          <TechStack />
        </section>

        {/* Call to Action */}
        <section data-section="5" className="relative section-padding">
          <div className="container-fluid">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                <span className="text-gradient">Experimenta el Futuro</span>
                <br />
                <span className="text-foreground-primary">del Arte Digital</span>
              </h2>
              
              <p className="text-xl text-foreground-secondary mb-8 max-w-2xl mx-auto leading-relaxed">
                Sumérgete en una experiencia única donde la inteligencia artificial 
                se encuentra con la creatividad humana para crear arte extraordinario.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => playSound('click')}
                  className="btn-primary group px-8 py-4 text-lg font-semibold rounded-xl flex items-center gap-3"
                >
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Ver Demo Interactivo
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://github.com/tuusername/ai-image-studio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass px-8 py-4 text-lg font-semibold rounded-xl flex items-center gap-3 text-foreground-primary hover:text-accent-cyan transition-colors"
                >
                  <Github className="w-5 h-5" />
                  Ver Código Fuente
                  <ExternalLink className="w-4 h-4" />
                </motion.a>
              </div>

              {/* Performance Metrics */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
              >
                {[
                  { label: 'Lighthouse Score', value: '98/100', icon: Zap },
                  { label: 'Bundle Size', value: '142kb', icon: Sparkles },
                  { label: 'API Response', value: '<300ms', icon: Image },
                  { label: 'Test Coverage', value: '94%', icon: Palette },
                ].map((metric, index) => (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="glass p-4 rounded-2xl border-accent-cyan/20 hover:border-accent-cyan/40 transition-colors">
                      <metric.icon className="w-8 h-8 text-accent-cyan mx-auto mb-2" />
                      <div className="text-2xl font-bold text-gradient">{metric.value}</div>
                      <div className="text-sm text-foreground-secondary">{metric.label}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
} 