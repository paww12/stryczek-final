'use client'
import { motion, easeInOut } from 'motion/react'

const loopVariants = {
  initial: {
    opacity: 1,
    scale: 0.8,
    rotate: 106,
  },
  animate: {
    opacity: [1, 0.95, 0.9, 0.95, 1],
    scale: [0.98, 1, 1.02, 0.98, 1],
    rotate: [106, 105, 106, 107, 106],
    transition: {
      duration: 6,
      ease: easeInOut,
      repeat: Infinity,
      repeatType: 'reverse' as const,
      times: [0, 0.2, 0.5, 0.8, 1],
    },
  },
}

const pathVariants = {
  initial: {
    pathLength: 0,
  },
  animate: {
    pathLength: [0.01, 1, 1, 0.95, 1],
    opacity: 1,
    transition: {
      duration: 12,
      ease: easeInOut,
      repeat: Infinity,
      repeatType: 'mirror' as const,
      times: [0, 0.25, 0.5, 0.75, 1],
    },
  },
}

const Loop = () => {
  return (
    <motion.div
      className='absolute -bottom-1/2 left-1/3 w-20 h-44 rotate-[106deg] z-30 sm:-bottom-[145%] sm:w-32 sm:h-72 md:-bottom-[100%] md:w-64 md:h-80 md:left-[40%] lg:-bottom-[135%] lg:left-[40%]'
      variants={loopVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{
          scale: {
            duration: 0.2,
            ease: easeInOut,
            type: 'tween',
          },
        }}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 31 63"
          fill="none"
          style={{ filter: 'drop-shadow(0 0 8px rgba(199, 3, 78, 0.3))' }}
        >
          <motion.path
            d="M29.5246 61.7624C22.3265 57.2427 15.34 48.6043 13.3277 40.2336C11.9871 34.6567 12.9295 18.9342 22.5719 21.0667C26.6874 21.9769 20.3888 31.6422 18.1887 32.5698C8.82654 36.5173 2.71308 6.47716 1.47545 1.23761"
            stroke="#C7034E"
            strokeWidth="2"
            strokeLinecap="round"
            variants={pathVariants}
            initial="initial"
            animate="animate"
          />
        </motion.svg>
      </motion.div>
    </motion.div>
  )
}

export default Loop
