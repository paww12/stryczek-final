'use client'
import { FaArrowAltCircleUp } from 'react-icons/fa'
// import { motion, useScroll } from 'framer-motion'
import { useScroll, motion } from 'motion/react'
import { useEffect, useState } from 'react'

const ScrollToTop = () => {
  const { scrollY } = useScroll()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const threshold = 500
    const unsubscribe = scrollY.onChange(() => {
      const currentScroll = scrollY.get()
      const viewportHeight = window.innerHeight
      const totalHeight = document.documentElement.scrollHeight

      const shouldBeVisible = currentScroll + viewportHeight >= totalHeight - threshold
      setIsVisible(shouldBeVisible)
    })

    return () => unsubscribe()
  }, [scrollY])

  return (
    <motion.div
      className="fixed bottom-10 right-10 z-30"
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
      }}
      transition={{
        duration: 0.3,
        scale: {
          duration: 0.2,
          ease: 'easeInOut',
          type: 'tween',
        },
      }}
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }}
    >
      <FaArrowAltCircleUp className="w-10 h-10 md:h-20 md:w-20 text-slate-700 drop-shadow-2xl cursor-pointer" />
    </motion.div>
  )
}

export default ScrollToTop
