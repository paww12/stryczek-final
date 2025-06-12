'use client'
import { motion, useSpring, useTransform } from 'motion/react'
import useScrollVelocity from '../../lib/useScrollVelocity'
import { useEffect, useState } from 'react'
import type { MotionValue } from 'motion/react'
import { MarqueItem } from '@/payload-types'

export default function App({ text }: { text: string }) {
  const rawVelocity = useScrollVelocity(0.1)
  const [data, setData] = useState<MarqueItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
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
    const fetchLatest = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch('/api/marque-item')
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        
        const newData = await res.json()
        const images = newData.docs || []
        setData(images)
      } catch (error) {
        console.error('Error refreshing data:', error)
        setError(error instanceof Error ? error.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    
    fetchLatest()
  }, [])

  useEffect(() => {
    springVelocity.set(rawVelocity)
  }, [rawVelocity, springVelocity])

  if (loading) {
    return (
      <div className="py-2 my-8 overflow-hidden flex gap-5 border-y-2 mx-8 md:mx-12 lg:mx-24 [mask:linear-gradient(90deg,transparent,white_10%,white_90%,transparent)]">
        <MarqueeSection texts={[text]} skew={skewX} isLoading={true} />
        <MarqueeSection texts={[text]} skew={skewX} isLoading={true} />
      </div>
    )
  }

  if (error) {
    console.warn('Marquee API error, using fallback text:', error)
  }

  const textsToShow = data.length > 0 ? data.map(item => item.text) : [text]

  return (
    <div className="py-2 my-8 overflow-hidden flex gap-5 border-y-2 mx-8 md:mx-12 lg:mx-24 [mask:linear-gradient(90deg,transparent,white_10%,white_90%,transparent)]">
      <MarqueeSection texts={textsToShow} skew={skewX} />
      <MarqueeSection texts={textsToShow} skew={skewX} />
    </div>
  )
}

function MarqueeSection({ 
  texts, 
  skew, 
  isLoading = false 
}: { 
  texts: string[]
  skew: MotionValue<number>
  isLoading?: boolean
}) {
  return (
    <motion.ul
      className="shrink-0 min-w-full flex justify-between gap-5 items-center"
      animate={{
        x: ['0%', 'calc(-100% - 20px)'],
      }}
      style={{ skewX: skew }}
      transition={{
        duration: 20,
        ease: 'linear',
        repeat: Infinity,
      }}
    >
      {isLoading ? (
        [...Array(10)].map((_, index) => (
          <li 
            key={`loading-${index}`}
            className="flex-shrink-0 rounded-lg bg-[#e6d5b8] py-2 text-xl px-2 animate-pulse"
          >
            Ładowanie...
          </li>
        ))
      ) : (
        [...Array(Math.max(10, texts.length * 3))].map((_, index) => {
          const textIndex = index % texts.length
          const text = texts[textIndex]
          
          return (
            <li 
              key={`${textIndex}-${Math.floor(index / texts.length)}`}
              className="flex-shrink-0 rounded-lg bg-[#e6d5b8] py-2 text-xl px-2 whitespace-nowrap"
            >
              {text}
            </li>
          )
        })
      )}
    </motion.ul>
  )
}