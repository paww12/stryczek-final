'use client'
import { motion, useSpring, useTransform } from 'motion/react'
import useScrollVelocity from '../../lib/useScrollVelocity'
import { useEffect } from 'react'

export default function App({ text }: { text: string }) {
  const rawVelocity = useScrollVelocity(0.1)
  const springVelocity = useSpring(0, {
    damping: 20,
    stiffness: 150,
    mass: 0.5
  })
  
  const skewX = useTransform(
    springVelocity, 
    [-1000, 1000], 
    [-25, 25],
    { clamp: true }
  )

  useEffect(() => {
    springVelocity.set(rawVelocity)
  }, [rawVelocity, springVelocity])

  return (
    <div className="py-2 my-8 overflow-hidden flex gap-5 border-y-2 mx-8 md:mx-12 lg:mx24 [mask:linear-gradient(90deg,transparent,white_10%,white_90%,transparent)]">
      <MarqueeSection text={text} skew={skewX} />
      <MarqueeSection text={text} skew={skewX} />
    </div>
  )
}

import type { MotionValue } from 'motion/react'

function MarqueeSection({ text, skew }: { text: string; skew: MotionValue<number> }) {
  return (
    <motion.ul
      className="shrink-0 min-w-full flex justify-between gap-5 items-center"
      animate={{
        x: ['0%', 'calc(-100% - 20px)'],
      }}
      style={{ skewX: skew }}
      transition={{
        duration: 10,
        ease: 'linear',
        repeat: Infinity,
      }}
    >
      {[...Array(10)].map((_, index) => (
        <li 
          key={index} 
          className="flex-shrink-0 rounded-lg bg-[#e6d5b8] py-2 text-xl px-2"
        >
          {text} {index}
        </li>
      ))}
    </motion.ul>
  )
}