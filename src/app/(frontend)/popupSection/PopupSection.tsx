'use client'
import { useRef } from 'react'
import { usePopupStore } from '../state/store'
import useOutsideClick from '../lib/useOutsideClick'
import { AnimatePresence, motion } from 'framer-motion'

const PopupSection = () => {
  const modalRef = useRef(null)
  const { component, setComponent } = usePopupStore()
  useOutsideClick(modalRef, () => {
    setComponent(null)
  })

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
            <div ref={modalRef} className="relative">
              <motion.button
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute top-2 right-2 text-4xl text-white"
                onClick={() => setComponent(null)}
                aria-label="Zamknij"
              >
                ✕
              </motion.button>
              {component}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default PopupSection
