'use client'

import { motion } from 'framer-motion'

export function PromptStudio() {
  return (
    <section id="demo" className="section-padding bg-gradient-to-b from-background-secondary to-background-tertiary">
      <div className="container-fluid">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            <span className="text-gradient">Prompt Studio</span>
            <br />
            <span className="text-foreground-primary">Interactivo</span>
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto leading-relaxed">
            Experimenta con nuestro generador de prompts inteligente en tiempo real.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <div className="glass p-8 rounded-3xl border-accent-cyan/20">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-foreground-primary mb-4">
                Demo Interactivo Próximamente
              </h3>
              <p className="text-foreground-secondary">
                Esta sección contendrá una demostración completa del generador de prompts con IA.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 