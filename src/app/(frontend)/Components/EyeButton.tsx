'use client'
import { motion } from 'framer-motion'

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
