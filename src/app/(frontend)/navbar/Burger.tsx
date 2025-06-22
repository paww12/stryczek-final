'use client'

import { useEffect, useCallback } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Link from 'next/link'
import { useBurgerStore } from '../state/store'

const Burger = () => {
  const { isMobile, isOpen, setIsOpen, setIsMobile, toggleIsOpen } = useBurgerStore()
  const shouldReduceMotion = useReducedMotion()

  const handleResize = useCallback(() => {
    const width = window.innerWidth
    setIsMobile(width < 768)
    if (width >= 768) {
      setIsOpen(false)
    }
  }, [setIsMobile, setIsOpen])

  const handleLinkClick = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  useEffect(() => {
    handleResize()
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  const menuVariants = shouldReduceMotion
    ? {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.15 } },
      exit: { opacity: 0, transition: { duration: 0.1 } },
    }
    : {
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

  const linkVariants = shouldReduceMotion
    ? {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
      exit: { opacity: 0 },
    }
    : {
      hidden: { opacity: 0, x: -50 },
      visible: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -50 },
    }

  const lineVariants = shouldReduceMotion
    ? {
      closed: { rotate: 0, y: 0 },
      open: (index: number) => ({
        rotate: index === 0 ? 45 : index === 2 ? -45 : 0,
        y: index === 0 ? 6 : index === 2 ? -6 : 0,
      })
    }
    : {
      closed: {
        rotate: 0,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 20
        }
      },
      open: (index: number) => ({
        rotate: index === 0 ? 45 : index === 2 ? -45 : 0,
        y: index === 0 ? 6 : index === 2 ? -6 : 0,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 20
        }
      })
    }

  const opacityVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0 }
  }

  return (
    <>
      <motion.div
        className="cursor-pointer"
        onClick={toggleIsOpen}
        animate={isOpen ? 'open' : 'closed'}
        style={{
          willChange: isOpen ? 'transform' : 'auto',
          backfaceVisibility: 'hidden',
          perspective: 1000
        }}
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
          <motion.line
            x1="3" y1="6" x2="21" y2="6"
            variants={lineVariants}
            custom={0}
            style={{
              transformOrigin: 'center',
              backfaceVisibility: 'hidden'
            }}
          />

          <motion.line
            x1="3" y1="12" x2="21" y2="12"
            variants={opacityVariants}
            style={{ backfaceVisibility: 'hidden' }}
          />

          <motion.line
            x1="3" y1="18" x2="21" y2="18"
            variants={lineVariants}
            custom={2}
            style={{
              transformOrigin: 'center',
              backfaceVisibility: 'hidden'
            }}
          />
        </svg>
      </motion.div>

      <AnimatePresence mode="wait">
        {isOpen && isMobile && (
          <motion.div
            key="menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="flex flex-col absolute top-28 left-0 w-screen h-[calc(100vh-7rem)] items-center 
            justify-evenly bg-white text-4xl text-black shadow-sm font-shantell-sans pb-12"
            style={{
              backfaceVisibility: 'hidden',
              perspective: 1000,
              WebkitFontSmoothing: 'antialiased',
              transform: 'translate3d(0, 0, 0)',
            }}
          >
            <motion.div variants={linkVariants} className="p-4">
              <Link href="/offer" onClick={handleLinkClick}>
                Oferta
              </Link>
            </motion.div>
            <motion.div variants={linkVariants} className="p-4">
              <Link href="/galery" onClick={handleLinkClick}>
                Galeria
              </Link>
            </motion.div>
            <motion.div variants={linkVariants} className="p-4">
              <Link href="/contact" onClick={handleLinkClick}>
                Kontakt
              </Link>
            </motion.div>
            <motion.div variants={linkVariants} className="p-4">
              <Link href="/news" onClick={handleLinkClick}>
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