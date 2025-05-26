import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { AppState, User, ImageGeneration } from '@/types';

interface AppStore extends AppState {
  // Actions
  setUser: (user: User | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  setCurrentGeneration: (generation: ImageGeneration | null) => void;
  addToHistory: (generation: ImageGeneration) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  clearHistory: () => void;
  logout: () => void;
}

export const useAppStore = create<AppStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        user: null,
        isAuthenticated: false,
        theme: 'dark',
        currentGeneration: null,
        generationHistory: [],
        isGenerating: false,

        // Actions
        setUser: (user) => set({ user }),
        
        setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
        
        setTheme: (theme) => set({ theme }),
        
        setCurrentGeneration: (generation) => set({ currentGeneration: generation }),
        
        addToHistory: (generation) => {
          const { generationHistory } = get();
          const newHistory = [generation, ...generationHistory].slice(0, 50); // Keep last 50
          set({ generationHistory: newHistory });
        },
        
        setIsGenerating: (isGenerating) => set({ isGenerating }),
        
        clearHistory: () => set({ generationHistory: [] }),
        
        logout: () => set({
          user: null,
          isAuthenticated: false,
          currentGeneration: null,
          generationHistory: [],
          isGenerating: false,
        }),
      }),
      {
        name: 'ai-image-studio-app',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
          theme: state.theme,
          generationHistory: state.generationHistory,
        }),
      }
    ),
    {
      name: 'app-store',
    }
  )
); 