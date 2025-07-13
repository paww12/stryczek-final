'use client'

import { useEffect } from 'react'
import { AnimatePresence, easeInOut, motion } from 'motion/react'
import Link from 'next/link'
import { useBurgerStore } from '../state/store'

const PAGES_LINKS = [
  { href: '/offer', label: 'Oferta' },
  { href: '/galery', label: 'Galeria' },
  { href: '/contact', label: 'Kontakt' },
  { href: '/news', label: 'Nowości' },
]

const Burger = () => {
  const { isMobile, isOpen, setIsOpen, setIsMobile, toggleIsOpen } = useBurgerStore()

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsOpen(false)
    }

    handleResize()
    window.addEventListener('resize', handleResize, { passive: true })
    return () => window.removeEventListener('resize', handleResize)
  }, [setIsMobile, setIsOpen])

  const menuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: easeInOut,
        delayChildren: 0,
        staggerChildren: 0.18,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.15,
        ease: easeInOut,
        staggerChildren: 0.03,
        staggerDirection: -1,
      },
    },
  }


  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.15,
        ease: easeInOut,
      },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.1,
        ease: easeInOut,
      },
    },
  }


  const lineVariants = {
    closed: {
      rotate: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.15,
        ease: easeInOut,
      },
    },
    open: (index: number) => ({
      rotate: index === 0 ? 45 : index === 2 ? -45 : 0,
      y: index === 0 ? 6 : index === 2 ? -6 : 0,
      opacity: index === 1 ? 0 : 1,
      transition: {
        duration: 0.15,
        ease: easeInOut,
      },
    }),
  }



  return (
    <>
      <motion.div
        className="cursor-pointer"
        onClick={toggleIsOpen}
        animate={isOpen ? 'open' : 'closed'}
        style={{ willChange: isOpen ? 'transform' : 'auto' }}
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
          {[0, 1, 2].map((i) => (
            <motion.line
              key={i}
              x1="3"
              y1={6 + i * 6}
              x2="21"
              y2={6 + i * 6}
              variants={lineVariants}
              custom={i}
              style={{ transformOrigin: 'center' }}
            />
          ))}
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
              WebkitFontSmoothing: 'antialiased',
              backfaceVisibility: 'hidden',
              perspective: '1000px',
              willChange: 'transform, opacity'
            }}
          >
            {PAGES_LINKS.map(({ href, label }) => (
              <motion.div
                key={href}
                variants={linkVariants}
                className="p-4"
                style={{ willChange: 'transform, opacity' }}
              >
                <Link href={href} onClick={() => setIsOpen(false)}>
                  {label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Burger