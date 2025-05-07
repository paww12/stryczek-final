'use client'
// import { motion } from 'framer-motion'
import { motion } from "motion/react"

const EyeButton = () => {
  return (
    <>
      <motion.span
        animate={{ x: [-15, 5, -15] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
      >
        👁️
      </motion.span>
    </>
  )
}

export default EyeButton
