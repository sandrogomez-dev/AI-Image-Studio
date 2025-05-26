import { useCallback, useRef } from 'react'

interface AudioCache {
  [key: string]: HTMLAudioElement
}

const sounds = {
  click: '/sounds/click.mp3',
  success: '/sounds/success.mp3',
  error: '/sounds/error.mp3',
  welcome: '/sounds/welcome.mp3',
  generate: '/sounds/generate.mp3',
  complete: '/sounds/complete.mp3',
}

export function useAudio() {
  const audioCache = useRef<AudioCache>({})

  const preloadAudio = useCallback((soundKey: string) => {
    if (!audioCache.current[soundKey] && sounds[soundKey as keyof typeof sounds]) {
      const audio = new Audio(sounds[soundKey as keyof typeof sounds])
      audio.preload = 'auto'
      audio.volume = 0.3
      audioCache.current[soundKey] = audio
    }
  }, [])

  const playSound = useCallback((soundKey: string, volume: number = 0.3) => {
    try {
      if (!audioCache.current[soundKey]) {
        preloadAudio(soundKey)
      }

      const audio = audioCache.current[soundKey]
      if (audio) {
        audio.volume = volume
        audio.currentTime = 0
        const playPromise = audio.play()
        
        // Handle browsers that don't support promises for play()
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.warn('Audio play failed:', error)
          })
        }
      }
    } catch (error) {
      console.warn('Failed to play sound:', error)
    }
  }, [preloadAudio])

  const stopSound = useCallback((soundKey: string) => {
    const audio = audioCache.current[soundKey]
    if (audio) {
      audio.pause()
      audio.currentTime = 0
    }
  }, [])

  const setVolume = useCallback((soundKey: string, volume: number) => {
    const audio = audioCache.current[soundKey]
    if (audio) {
      audio.volume = Math.max(0, Math.min(1, volume))
    }
  }, [])

  return {
    playSound,
    stopSound,
    setVolume,
    preloadAudio,
  }
} 