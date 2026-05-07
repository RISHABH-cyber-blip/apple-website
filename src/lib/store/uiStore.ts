import { create } from 'zustand';

interface UIState {
  // Navbar
  navVisible: boolean;
  setNavVisible: (v: boolean) => void;

  // Active section
  activeSection: string;
  setActiveSection: (s: string) => void;

  // iPhone color picker
  selectedColor: string;
  setSelectedColor: (c: string) => void;

  // Loading
  isLoaded: boolean;
  setLoaded: (v: boolean) => void;

  // 3D model ready
  modelReady: boolean;
  setModelReady: (v: boolean) => void;

  // Cursor
  cursorVariant: 'default' | 'hover' | 'drag';
  setCursorVariant: (v: 'default' | 'hover' | 'drag') => void;
}

export const useUIStore = create<UIState>((set) => ({
  navVisible: true,
  setNavVisible: (v) => set({ navVisible: v }),

  activeSection: 'hero',
  setActiveSection: (s) => set({ activeSection: s }),

  selectedColor: '#FF6B2B',
  setSelectedColor: (c) => set({ selectedColor: c }),

  isLoaded: false,
  setLoaded: (v) => set({ isLoaded: v }),

  modelReady: false,
  setModelReady: (v) => set({ modelReady: v }),

  cursorVariant: 'default',
  setCursorVariant: (v) => set({ cursorVariant: v }),
}));
