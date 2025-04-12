'use client'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { GalleryMain } from '@/payload-types'
import { useRef } from 'react'
import Link from 'next/link'
import { usePopupStore } from '../state/store'

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
  const { setComponent } = usePopupStore()

  const getAnimationDirection = () => {
    const patternPosition = index % 5
    return patternPosition === 1 || patternPosition === 4 ? '100%' : '-100%'
  }

  if (typeof image.image === 'number' || !image.image.url) return null

  const handleImageClick = (url: string) => {
    setComponent(
      <motion.div
        className="w-full h-full"
        layoutId={`photo-${url}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Image
          alt="Enlarged content preview"
          className="object-contain rounded-md aspect-auto w-full h-full
          pointer-events-none max-w-[90vw] max-h-[90vh]"
          src={url}
          width={1500}
          height={1500}
          priority
        />
      </motion.div>,
    )
  }

  return (
    <motion.div
      ref={box}
      className="group w-full min-h-[26.5dvh] h-full overflow-hidden relative rounded-lg"
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
        onClick={() => {
          if (typeof image.image !== 'number' && image.image.url) {
            handleImageClick(image.image.url)
          }
        }}
        fill
        alt={image.image.alt || `Gallery image ${index + 1}`}
        className="object-cover cursor-pointer hover:scale-105 transition-transform rounded-lg overflow-hidden"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority={index < 3}
      />

      {image.link && typeof image.link === 'object' && (
        <Link
          href={`/product/${encodeURIComponent(image.link.title)}`}
          className="absolute bottom-0 left-0 w-full"
        >
          <div className="bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center h-full">
            <p className="text-white text-lg font-medium py-2">Sprawdź!</p>
          </div>
        </Link>
      )}
    </motion.div>
  )
}

export default Photo
