'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useMotionValue } from 'motion/react'
import NewsCart from './NewsCart'
import SeeAllNews from './SeeAllNews'

const SLIDE_GAP = 48
const ARRAY = [1, 2, 3]
const AUTO_SLIDE_INTERVAL = 15000

const News = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [containerHeight, setContainerHeight] = useState<number | null>(null)
  const dragX = useMotionValue(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])

  const clearExistingInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const startAutoSlide = () => {
    clearExistingInterval()
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev < ARRAY.length - 1 ? prev + 1 : 0))
    }, AUTO_SLIDE_INTERVAL)
  }

  useEffect(() => {
    const updateHeight = () => {
      const currentSlide = slideRefs.current[currentIndex]
      if (currentSlide) {
        const height = currentSlide.offsetHeight + 48
        setContainerHeight(height)
      }
    }

    const timer = setTimeout(updateHeight, 100)

    return () => clearTimeout(timer)
  }, [currentIndex])

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      const currentSlide = slideRefs.current[currentIndex]
      if (currentSlide) {
        setContainerHeight(currentSlide.offsetHeight + 48)
      }
    })

    slideRefs.current.forEach(slide => {
      if (slide) resizeObserver.observe(slide)
    })

    return () => resizeObserver.disconnect()
  }, [currentIndex])

  useEffect(() => {
    startAutoSlide()
    return clearExistingInterval
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleManualChange = (newIndex: number) => {
    setCurrentIndex(newIndex)
    startAutoSlide()
  }

  const handleDragEnd = () => {
    const x = dragX.get()
    if ((x < .1 * window.innerWidth) && currentIndex < ARRAY.length - 1) {
      handleManualChange(currentIndex + 1)
    }
    if ((x > - .08 * window.innerWidth) && currentIndex > 0) {
      handleManualChange(currentIndex - 1)
    }
  }

  const springTransition = {
    type: 'spring',
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  }

  return (
    <section className="mb-6 md:mt-12 relative" aria-label="Aktualności">
      <h1 className="text-center text-4xl mb-12 mt-4">Aktualności</h1>

      <motion.div
        className="container mt-12 p-8 gap-12 flex overflow-hidden"
        style={{
          height: containerHeight ? `${containerHeight}px` : 'auto',
          minHeight: '400px'
        }}
        animate={{ height: containerHeight || 'auto' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        role="region"
        aria-live="polite"
      >
        {ARRAY.map((slide, index) => (
          <motion.div
            key={slide}
            ref={el => { slideRefs.current[index] = el }}
            onDragEnd={handleDragEnd}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            style={{ x: dragX }}
            animate={{
              translateX: `calc(-${currentIndex * 100}% - ${currentIndex * SLIDE_GAP}px)`,
            }}
            transition={springTransition}
            className="bg-white shadow-md w-full shrink-0 rounded-xl h-fit"
            role="group"
            aria-roledescription="slide"
          >
            <NewsCart slide={slide.toString()} />
          </motion.div>
        ))}
      </motion.div>

      <div
        className="flex absolute top-20 left-1/2 gap-6 h-fit -translate-x-1/2 w-fit"
        role="navigation"
        aria-label="Sterowanie karuzelą"
      >
        {ARRAY.map((slide, index) => (
          <button
            key={slide}
            onClick={() => handleManualChange(index)}
            className={`rounded-full transition-all duration-500 size-4 ${index === currentIndex ? 'bg-black' : 'bg-gray-500 hover:bg-gray-700'
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