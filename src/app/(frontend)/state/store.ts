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

interface PopupStore {
  component: React.ReactNode | null
  setComponent: (component: React.ReactNode) => void
}

export const usePopupStore = create<PopupStore>((set) => ({
  component: null,
  setComponent: (component) => set({ component }),
}))
