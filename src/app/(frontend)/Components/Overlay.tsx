'use client'
import { motion } from 'framer-motion'

import { ReactNode } from 'react'

const Overlay = ({ children, delay = 0.25 }: { children: ReactNode; delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}

export default Overlay
