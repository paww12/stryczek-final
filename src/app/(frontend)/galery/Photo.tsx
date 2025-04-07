'use client'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { GalleryMain } from '@/payload-types'
import { useRef } from 'react'
import Link from 'next/link'

const Photo = ({
  image,
  index,
  shouldAnimate,
  onAnimationComplete,
}: {
  image: GalleryMain
  index: number
  shouldAnimate: boolean
  onAnimationComplete: () => void
}) => {
  const box = useRef(null)
  const isInView = useInView(box, {
    once: true,
    margin: '20%',
    amount: 0.1,
  })

  const getAnimationDirection = () => {
    const patternPosition = index % 5
    return patternPosition === 1 || patternPosition === 4 ? '100%' : '-100%'
  }

  if (typeof image.image === 'number' || !image.image.url) return null

  return (
    <motion.div
      ref={box}
      className="group relative w-full h-full overflow-hidden rounded-lg"
      initial={
        shouldAnimate
          ? {
              opacity: 0,
              x: getAnimationDirection(),
            }
          : false
      }
      animate={
        isInView && shouldAnimate
          ? {
              opacity: 1,
              x: 0,
              transition: {
                type: 'spring',
                stiffness: 100,
                damping: 20,
                delay: (index % 5) * 0.1,
              },
            }
          : {}
      }
      onAnimationComplete={onAnimationComplete}
    >
      <Image
        src={image.image.url}
        fill
        alt={image.image.alt || `Gallery image ${index + 1}`}
        className="object-cover hover:scale-105 transition-transform"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={index < 3}
      />

      {image.link && typeof image.link === 'object' && (
        <Link href={`/product/${image.link.slug}`} className="absolute inset-0">
          <div className="bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center h-full">
            <p className="text-white text-lg font-medium">Sprawdź!</p>
          </div>
        </Link>
      )}
    </motion.div>
  )
}

export default Photo
