'use client'

import { useEffect } from 'react'
// import { AnimatePresence, motion } from 'framer-motion'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { useBurgerStore } from '../state/store'

const Burger = () => {
  const { isMobile, isOpen, setIsOpen, setIsMobile, toggleIsOpen } = useBurgerStore()

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsOpen(false)
      }
    }
    checkViewport()
    window.addEventListener('resize', checkViewport)
    return () => window.removeEventListener('resize', checkViewport)
  }, [setIsMobile, setIsOpen])

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.15,
        when: 'beforeChildren',
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.25,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const linkVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  }

  const topLine = {
    open: { rotate: 45, y: 6, transformOrigin: 'left' },
    closed: { rotate: 0, y: 0, transformOrigin: 'left' },
  }

  const middleLine = {
    open: { opacity: 0 },
    closed: { opacity: 1 },
  }

  const bottomLine = {
    open: { rotate: -45, y: -6, transformOrigin: 'left' },
    closed: { rotate: 0, y: 0, transformOrigin: 'left' },
  }

  return (
    <>
      <motion.div
        key={`burger-${isMobile}`}
        className="cursor-pointer"
        onClick={toggleIsOpen}
        animate={isOpen ? 'open' : 'closed'}
      >
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          height="3em"
          width="3em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.line x1="3" y1="6" x2="21" y2="6" variants={topLine} />
          <motion.line x1="3" y1="12" x2="21" y2="12" variants={middleLine} />
          <motion.line x1="3" y1="18" x2="21" y2="18" variants={bottomLine} />
        </svg>
      </motion.div>

      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            key="menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            style={{ opacity: 0 }}
            className="flex flex-col absolute top-28 left-0 w-screen h-[calc(100vh-7rem)] items-center justify-evenly bg-white text-4xl text-black shadow-sm font-shantell-sans"
          >
            <motion.div variants={linkVariants} className="p-4">
              <Link href="/offer" onClick={() => setIsOpen(false)}>
                Oferta
              </Link>
            </motion.div>
            <motion.div variants={linkVariants} className="p-4">
              <Link href="/galery" onClick={() => setIsOpen(false)}>
                Galeria
              </Link>
            </motion.div>
            <motion.div variants={linkVariants} className="p-4">
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                Kontakt
              </Link>
            </motion.div>
            <motion.div variants={linkVariants} className="p-4">
              <Link href="/news" onClick={() => setIsOpen(false)}>
                Nowości
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Burger
