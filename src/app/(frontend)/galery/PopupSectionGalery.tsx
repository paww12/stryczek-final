'use client'
import { useRef, useEffect, useState } from 'react'
import { usePopupStoreGalery } from '../state/store'
import useOutsideClick from '../lib/useOutsideClick'
import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'

const PopupSectionGalery = () => {
  const modalRef = useRef(null)
  const { component, images, currentIndex, setComponent, nextImage, prevImage } = usePopupStoreGalery()
  const [imageLoaded, setImageLoaded] = useState(false)

  useOutsideClick(modalRef, () => {
    setComponent(null)
  })

  useEffect(() => {
    setImageLoaded(false)
  }, [currentIndex])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!component || !imageLoaded) return

      const key = e.key.toLowerCase()
      if (key === 'arrowright' || key === 'd') nextImage()
      if (key === 'arrowleft' || key === 'a') prevImage()
      if (key === 'escape') setComponent(null)
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [component, imageLoaded, nextImage, prevImage, setComponent])

  const currentImage = images[currentIndex]

  return (
    <>
      <AnimatePresence>
        {component && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div ref={modalRef} className="relative max-w-[90vw] max-h-[90vh]">
              <motion.button
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute top-2 right-2 text-4xl z-30 text-white hover:text-gray-300 transition-colors"
                onClick={() => setComponent(null)}
                aria-label="Zamknij"
              >
                ✕
              </motion.button>

              {imageLoaded && images.length > 1 && (
                <>
                  <motion.button
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-4xl z-30 text-white hover:text-gray-300 transition-colors bg-black/30 rounded-full w-12 h-12 flex items-center justify-center"
                    onClick={nextImage}
                    aria-label="Poprzednie zdjęcie"
                  >
                    ←
                  </motion.button>

                  <motion.button
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 20, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-4xl z-30 text-white hover:text-gray-300 transition-colors bg-black/30 rounded-full w-12 h-12 flex items-center justify-center"
                    onClick={nextImage}
                    aria-label="Następne zdjęcie"
                  >
                    →
                  </motion.button>
                </>
              )}

              {currentImage && (
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full"
                >
                  <Image
                    alt={currentImage.alt || "Zdjęcie z galerii"}
                    className="object-contain rounded-md w-full h-full pointer-events-none max-w-[90vw] max-h-[90vh]"
                    src={currentImage.url ?? 'image'}
                    width={typeof currentImage.width === 'number' ? currentImage.width : undefined}
                    height={typeof currentImage.height === 'number' ? currentImage.height : undefined}
                    priority
                    onLoad={() => setImageLoaded(true)}
                  />
                </motion.div>
              )}

              {imageLoaded && images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/30 px-3 py-1 rounded-full">
                  {currentIndex + 1} / {images.length}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default PopupSectionGalery