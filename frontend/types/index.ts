// Core types for AI Image Studio

export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ImageGeneration {
  id: string;
  userId: string;
  prompt: string;
  negativePrompt?: string;
  model: string;
  width: number;
  height: number;
  steps: number;
  guidance: number;
  seed?: number;
  imageUrl: string;
  thumbnailUrl?: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, any>;
}

export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: string;
  tags: string[];
  isPublic: boolean;
  userId: string;
  usageCount: number;
  createdAt: string;
}

export interface GalleryImage {
  id: string;
  imageGeneration: ImageGeneration;
  user: User;
  title?: string;
  description?: string;
  tags: string[];
  likes: number;
  views: number;
  isPublic: boolean;
  createdAt: string;
}

export interface GenerationSettings {
  model: string;
  width: number;
  height: number;
  steps: number;
  guidance: number;
  seed?: number;
  sampler: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface UpscaleRequest {
  imageId: string;
  scale: 2 | 4;
  model: 'real-esrgan' | 'waifu2x';
}

export interface ExportOptions {
  format: 'png' | 'jpg' | 'webp';
  quality: number;
  width?: number;
  height?: number;
}

// Store types
export interface AppState {
  user: User | null;
  isAuthenticated: boolean;
  theme: 'dark' | 'light';
  currentGeneration: ImageGeneration | null;
  generationHistory: ImageGeneration[];
  isGenerating: boolean;
}

export interface GenerationState {
  prompt: string;
  negativePrompt: string;
  settings: GenerationSettings;
  isGenerating: boolean;
  progress: number;
  currentImage: ImageGeneration | null;
}

export interface GalleryState {
  images: GalleryImage[];
  loading: boolean;
  hasMore: boolean;
  filters: {
    category?: string;
    tags?: string[];
    sortBy: 'newest' | 'popular' | 'trending';
  };
}

// Component props
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  children: any;
  onClick?: () => void;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: any;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface ToastProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
  onClose?: () => void;
} 