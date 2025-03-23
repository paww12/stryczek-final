'use client'

import { useMotionValue } from 'framer-motion'
import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import NewsCart from './NewsCart'
import SeeAllNews from './SeeAllNews'

const SLIDE_GAP = 48
const DRAG_THRESHOLD = 75
const ARRAY = [1, 2, 3]

const News = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const dragX = useMotionValue(0)

  const handleDragEnd = useCallback(() => {
    const x = dragX.get()
    if (x < -DRAG_THRESHOLD && currentIndex < ARRAY.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else if (x > DRAG_THRESHOLD && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }, [currentIndex, dragX])

  const springTransition = {
    type: 'spring',
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  }

  return (
    <section className="mb-6 md:mt-12 relative" aria-label="Aktualności">
      <h1 className="text-center text-4xl mb-12 mt-4">Aktualności</h1>

      <div
        className="container mt-12 p-8 gap-12 max-h-[1200px] flex overflow-hidden"
        role="region"
        aria-live="polite"
      >
        {ARRAY.map((slide) => (
          <motion.div
            key={slide}
            onDragEnd={handleDragEnd}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            style={{ x: dragX }}
            animate={{
              translateX: `calc(-${currentIndex * 100}% - ${currentIndex * SLIDE_GAP}px)`,
            }}
            transition={springTransition}
            className="bg-white shadow-xl w-full shrink-0 rounded-xl h-fit"
            role="group"
            aria-roledescription="slide"
          >
            <NewsCart slide={slide.toString()} />
          </motion.div>
        ))}
      </div>

      <div
        className="flex absolute top-20 left-1/2 gap-6 h-fit -translate-x-1/2 w-fit"
        role="navigation"
        aria-label="Sterowanie karuzelą"
      >
        {ARRAY.map((slide, index) => (
          <button
            key={slide}
            onClick={() => setCurrentIndex(slide - 1)}
            className={`rounded-full transition-all duration-500 size-4 ${
              index === currentIndex ? 'bg-black' : 'bg-gray-500 hover:bg-gray-700'
            }`}
            aria-label={`Przejdź do slajdu ${index + 1}`}
            aria-current={index === currentIndex}
          />
        ))}
      </div>
      <SeeAllNews />
    </section>
  )
}

export default News
