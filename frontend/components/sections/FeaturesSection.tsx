'use client'

import { motion } from 'framer-motion'
import { Brain, Zap, Palette, Users, Shield, BarChart3 } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'IA Inteligente',
    description: 'Algoritmos avanzados que comprenden el contexto y optimizan automáticamente tus prompts para mejores resultados.',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Zap,
    title: 'Generación Rápida',
    description: 'Procesamiento ultra-rápido con tiempos de respuesta menores a 3 segundos y cola de tareas optimizada.',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Palette,
    title: 'Múltiples Estilos',
    description: 'Más de 50 estilos artísticos predefinidos, desde fotorrealismo hasta arte abstracto y pixel art.',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Users,
    title: 'Galería Comunitaria',
    description: 'Comparte tus creaciones, descubre inspiración y colabora con una comunidad global de artistas.',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Shield,
    title: 'Seguridad Avanzada',
    description: 'Filtros de contenido inteligentes y cumplimiento total con normativas de privacidad de datos.',
    color: 'from-red-500 to-rose-500'
  },
  {
    icon: BarChart3,
    title: 'Analytics Pro',
    description: 'Métricas detalladas de rendimiento, uso de tokens y análisis de popularidad de tus creaciones.',
    color: 'from-indigo-500 to-blue-500'
  }
]

export function FeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return (
    <section id="features" className="section-padding bg-gradient-to-b from-background-primary to-background-secondary">
      <div className="container-fluid">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            <span className="text-foreground-primary">Características</span>
            <br />
            <span className="text-gradient">Revolucionarias</span>
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto leading-relaxed">
            Tecnología de vanguardia diseñada para democratizar la creación de arte digital 
            y llevar tu creatividad al siguiente nivel.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group"
            >
              <div className="card h-full p-8 relative overflow-hidden">
                {/* Background gradient effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-4 mb-6 relative z-10`}
                >
                  <feature.icon className="w-full h-full text-white" />
                </motion.div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-heading font-semibold text-foreground-primary mb-4 group-hover:text-gradient transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-foreground-secondary leading-relaxed group-hover:text-foreground-primary transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-gradient-to-br from-accent-cyan/5 to-accent-magenta/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-foreground-secondary mb-6">
            ¿Listo para experimentar el futuro de la creatividad digital?
          </p>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary px-8 py-4 text-lg font-semibold rounded-xl"
          >
            Comenzar Gratis
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
} 