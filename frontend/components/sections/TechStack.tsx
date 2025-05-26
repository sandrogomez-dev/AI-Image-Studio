'use client'

import { motion } from 'framer-motion'

export function TechStack() {
  return (
    <section id="tech" className="section-padding bg-gradient-to-b from-background-tertiary to-background-primary">
      <div className="container-fluid">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            <span className="text-gradient">Stack</span>
            <br />
            <span className="text-foreground-primary">Tecnológico</span>
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto leading-relaxed">
            Construido con las tecnologías más modernas y escalables del mercado.
          </p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <div className="glass p-8 rounded-3xl border-accent-purple/20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <h4 className="font-semibold text-accent-cyan mb-2">Frontend</h4>
                <p className="text-sm text-foreground-secondary">Next.js 14, React 18, TypeScript</p>
              </div>
              <div>
                <h4 className="font-semibold text-accent-magenta mb-2">Backend</h4>
                <p className="text-sm text-foreground-secondary">FastAPI, Python, PostgreSQL</p>
              </div>
              <div>
                <h4 className="font-semibold text-accent-cyan mb-2">AI/ML</h4>
                <p className="text-sm text-foreground-secondary">OpenAI, Stability AI, Transformers</p>
              </div>
              <div>
                <h4 className="font-semibold text-accent-magenta mb-2">Cloud</h4>
                <p className="text-sm text-foreground-secondary">AWS, Docker, Kubernetes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 