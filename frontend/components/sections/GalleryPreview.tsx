'use client'

import { motion } from 'framer-motion'

export function GalleryPreview() {
  return (
    <section id="gallery" className="section-padding">
      <div className="container-fluid">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            <span className="text-foreground-primary">Galería</span>
            <br />
            <span className="text-gradient">Comunitaria</span>
          </h2>
          <p className="text-xl text-foreground-secondary max-w-3xl mx-auto leading-relaxed">
            Descubre creaciones increíbles de nuestra comunidad de artistas.
          </p>
        </motion.div>
        
        <div className="max-w-6xl mx-auto">
          <div className="glass p-8 rounded-3xl border-accent-magenta/20">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-foreground-primary mb-4">
                Galería Próximamente
              </h3>
              <p className="text-foreground-secondary">
                Aquí podrás explorar miles de imágenes generadas por IA de nuestra comunidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 