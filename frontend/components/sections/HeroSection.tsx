'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Sparkles, Zap, Image } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { useAudio } from '@/hooks/useAudio'

export function HeroSection() {
  const [currentWord, setCurrentWord] = useState(0)
  const { playSound } = useAudio()
  
  const words = [
    'Extraordinario',
    'Único', 
    'Profesional',
    'Innovador',
    'Sorprendente'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 2000)
    
    return () => clearInterval(interval)
  }, [words.length])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background-primary via-background-secondary to-background-tertiary" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-cyan/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-magenta/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-6xl mx-auto px-4"
      >
        {/* Main Heading */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-tight">
            <span className="block text-foreground-primary mb-2">
              Crea Arte
            </span>
            <div className="relative h-20 md:h-24 lg:h-28 overflow-hidden">
              <motion.span
                key={currentWord}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -100, opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="absolute inset-0 text-gradient block"
              >
                {words[currentWord]}
              </motion.span>
            </div>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-foreground-secondary mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Transforma tus ideas en obras maestras visuales usando los modelos de IA más avanzados. 
          Desde conceptos simples hasta creaciones complejas.
        </motion.p>

        {/* Feature Pills */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {[
            { icon: Sparkles, text: 'DALL-E 3' },
            { icon: Zap, text: 'Stable Diffusion' },
            { icon: Image, text: 'Midjourney' }
          ].map((feature, index) => (
            <motion.div
              key={feature.text}
              whileHover={{ scale: 1.05, y: -2 }}
              className="glass px-4 py-2 rounded-full flex items-center gap-2 border-accent-cyan/20"
            >
              <feature.icon className="w-4 h-4 text-accent-cyan" />
              <span className="text-sm font-medium text-foreground-primary">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                playSound('click')
                document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="group px-8 py-4 text-lg font-semibold"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Probar Gratis
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => {
                playSound('click')
                document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="px-8 py-4 text-lg font-semibold"
            >
              Ver Galería
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { value: '50K+', label: 'Imágenes Generadas' },
            { value: '2.1s', label: 'Tiempo Promedio' },
            { value: '99.9%', label: 'Disponibilidad' },
            { value: '4K', label: 'Resolución Máxima' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-foreground-secondary">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-accent-cyan rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-accent-cyan rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
} 