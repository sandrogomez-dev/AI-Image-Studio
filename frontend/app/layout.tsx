import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { QueryProvider } from '@/lib/providers/QueryProvider'
import { ToastProvider } from '@/components/ui/Toast'
import { ParticleBackground } from '@/components/effects/ParticleBackground'
import { AudioProvider } from '@/lib/providers/AudioProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'AI Image Studio - Generación de Imágenes con IA',
    template: '%s | AI Image Studio',
  },
  description: 'Estudio profesional para generación de imágenes con IA. Crea arte único con DALL-E, Midjourney y Stable Diffusion.',
  keywords: [
    'AI',
    'imagen',
    'generación',
    'arte',
    'inteligencia artificial',
    'DALL-E',
    'Midjourney',
    'Stable Diffusion',
    'portfolio',
    'diseño',
  ],
  authors: [{ name: 'Tu Nombre', url: 'https://tudominio.com' }],
  creator: 'Tu Nombre',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://ai-studio.tudominio.com',
    title: 'AI Image Studio - Generación de Imágenes con IA',
    description: 'Estudio profesional para generación de imágenes con IA',
    siteName: 'AI Image Studio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Image Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Image Studio',
    description: 'Generación profesional de imágenes con IA',
    images: ['/og-image.jpg'],
    creator: '@tuusername',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'tu-google-verification-code',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://api.ai-studio.tudominio.com" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body 
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased min-h-screen bg-background-primary text-foreground-primary overflow-x-hidden`}
        suppressHydrationWarning
      >
        <QueryProvider>
          <AudioProvider>
            <ToastProvider>
              <div className="relative min-h-screen">
                <ParticleBackground />
                <div className="relative z-10">
                  {children}
                </div>
              </div>
            </ToastProvider>
          </AudioProvider>
        </QueryProvider>
        
        {/* Preload critical resources */}
        <link rel="preload" href="/sounds/click.mp3" as="audio" />
        <link rel="preload" href="/sounds/success.mp3" as="audio" />
        <link rel="preload" href="/sounds/error.mp3" as="audio" />
      </body>
    </html>
  )
} 