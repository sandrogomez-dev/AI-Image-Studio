'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import type { ToastProps } from '@/types'

interface Toast extends ToastProps {
  id: string
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void
  hideToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: any }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2)
    const newToast: Toast = { ...toast, id }
    
    setToasts(prev => [...prev, newToast])
    
    // Auto remove after duration
    setTimeout(() => {
      hideToast(id)
    }, toast.duration || 5000)
  }, [])

  const hideToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const getIcon = (type: ToastProps['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-success" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-error" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-warning" />
      case 'info':
        return <Info className="w-5 h-5 text-info" />
      default:
        return <Info className="w-5 h-5 text-info" />
    }
  }

  const getTypeStyles = (type: ToastProps['type']) => {
    switch (type) {
      case 'success':
        return 'border-success/20 bg-success/10'
      case 'error':
        return 'border-error/20 bg-error/10'
      case 'warning':
        return 'border-warning/20 bg-warning/10'
      case 'info':
        return 'border-info/20 bg-info/10'
      default:
        return 'border-info/20 bg-info/10'
    }
  }

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className={`
                glass border rounded-lg p-4 shadow-lg backdrop-blur-xl
                ${getTypeStyles(toast.type)}
              `}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {getIcon(toast.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground-primary">
                    {toast.message}
                  </p>
                </div>
                
                <button
                  onClick={() => {
                    hideToast(toast.id)
                    toast.onClose?.()
                  }}
                  title="Cerrar notificación"
                  aria-label="Cerrar notificación"
                  className="flex-shrink-0 p-1 rounded-md hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4 text-foreground-secondary" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
} 