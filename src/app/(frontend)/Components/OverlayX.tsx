'use client'
import { motion } from 'motion/react'
import { ReactNode } from 'react'

const OverlayX = ({
  children,
  delay = 0.25,
  left,
}: {
  children: ReactNode
  delay?: number
  left?: boolean
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: left ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  )
}

export default OverlayX
