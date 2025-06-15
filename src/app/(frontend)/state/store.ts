import { create } from 'zustand'

interface BurgerStore {
  isOpen: boolean
  isMobile: boolean
  setIsOpen: (isOpen: boolean) => void
  toggleIsOpen: () => void
  setIsMobile: (isMobile: boolean) => void
}

export const useBurgerStore = create<BurgerStore>((set) => ({
  isOpen: false,
  isMobile: false,
  setIsOpen: (isOpen) => set({ isOpen }),
  toggleIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setIsMobile: (isMobile) => set({ isMobile }),
}))

import { Media } from '@/payload-types'

interface PopupStoreGalery {
  component: React.ReactNode | null
  images: Media[]
  currentIndex: number
  setComponent: (component: React.ReactNode) => void
  setImages: (images: Media[], currentIndex: number) => void
  nextImage: () => void
  prevImage: () => void
}

export const usePopupStoreGalery = create<PopupStoreGalery>((set, get) => ({
  component: null,
  images: [],
  currentIndex: 0,
  setComponent: (component) => set({ component }),
  setImages: (images, currentIndex) => set({ images, currentIndex }),
  nextImage: () => {
    const { images, currentIndex } = get()
    if (images.length > 0) {
      const newIndex = (currentIndex + 1) % images.length
      set({ currentIndex: newIndex })
    }
  },
  prevImage: () => {
    const { images, currentIndex } = get()
    if (images.length > 0) {
      const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1
      set({ currentIndex: newIndex })
    }
  },
}))

interface PopupStore {
  component: React.ReactNode | null
  setComponent: (component: React.ReactNode) => void
}

export const usePopupStore = create<PopupStore>((set) => ({
  component: null,
  setComponent: (component) => set({ component }),
}))