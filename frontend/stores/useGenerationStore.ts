import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { GenerationState, GenerationSettings, ImageGeneration } from '@/types';

interface GenerationStore extends GenerationState {
  // Actions
  setPrompt: (prompt: string) => void;
  setNegativePrompt: (negativePrompt: string) => void;
  updateSettings: (settings: Partial<GenerationSettings>) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setProgress: (progress: number) => void;
  setCurrentImage: (image: ImageGeneration | null) => void;
  resetGeneration: () => void;
}

const defaultSettings: GenerationSettings = {
  model: 'stable-diffusion-xl',
  width: 1024,
  height: 1024,
  steps: 30,
  guidance: 7.5,
  sampler: 'DPM++ 2M Karras',
};

export const useGenerationStore = create<GenerationStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      prompt: '',
      negativePrompt: '',
      settings: defaultSettings,
      isGenerating: false,
      progress: 0,
      currentImage: null,

      // Actions
      setPrompt: (prompt) => set({ prompt }),
      
      setNegativePrompt: (negativePrompt) => set({ negativePrompt }),
      
      updateSettings: (newSettings) => {
        const { settings } = get();
        set({ settings: { ...settings, ...newSettings } });
      },
      
      setIsGenerating: (isGenerating) => set({ isGenerating }),
      
      setProgress: (progress) => set({ progress }),
      
      setCurrentImage: (image) => set({ currentImage: image }),
      
      resetGeneration: () => set({
        prompt: '',
        negativePrompt: '',
        settings: defaultSettings,
        isGenerating: false,
        progress: 0,
        currentImage: null,
      }),
    }),
    {
      name: 'generation-store',
    }
  )
); 