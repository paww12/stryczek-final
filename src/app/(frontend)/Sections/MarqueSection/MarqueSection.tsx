'use client'
// import { motion } from 'framer-motion'
import { motion } from 'motion/react'
import useScrollVelocity from '../../lib/useScrollVelocity'

export default function App({ text }: { text: string }) {
  const velocity = useScrollVelocity()

  return (
    <>
      <div
        className="py-2 my-8 overflow-hidden flex gap-5 border-y-2 mx-8 md:mx-12 lg:mx24
      [mask:linear-gradient(90deg,transparent,white_10%,white_90%,transparent)]"
      >
        <motion.ul
          className="shrink-0 min-w-full flex justify-between gap-5 items-center"
          animate={{
            x: ['0%', 'calc(-100% - 20px)'],
          }}
          style={{ skewX: -velocity / 40 }}
          transition={{
            duration: 10,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {[...Array(10)].map((_, index) => (
            <li key={index} className="flex-shrink-0 rounded-lg bg-[#e6d5b8] py-2 text-xl px-2">
              {text} {index}
            </li>
          ))}
        </motion.ul>

        <motion.ul
          className="shrink-0 min-w-full flex justify-between gap-5 items-center"
          animate={{
            x: ['0%', 'calc(-100% - 20px)'],
          }}
          style={{ skewX: -velocity / 40 }}
          transition={{
            duration: 10,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          {[...Array(10)].map((_, index) => (
            <li key={index} className="flex-shrink-0 rounded-lg bg-[#e6d5b8] py-2 text-xl px-2">
              {text} {index}
            </li>
          ))}
        </motion.ul>
      </div>
    </>
  )
}
