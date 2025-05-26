'use client'

import { createContext, useContext, useState } from 'react'

interface AudioContextType {
  isEnabled: boolean
  volume: number
  toggleAudio: () => void
  setVolume: (volume: number) => void
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)

interface AudioProviderProps {
  children: any
}

export function AudioProvider({ children }: AudioProviderProps) {
  const [isEnabled, setIsEnabled] = useState(true)
  const [volume, setVolumeState] = useState(0.3)

  const toggleAudio = () => {
    setIsEnabled(prev => !prev)
  }

  const setVolume = (newVolume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume))
    setVolumeState(clampedVolume)
  }

  const value: AudioContextType = {
    isEnabled,
    volume,
    toggleAudio,
    setVolume,
  }

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  )
}

export function useAudioContext() {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error('useAudioContext must be used within an AudioProvider')
  }
  return context
} 