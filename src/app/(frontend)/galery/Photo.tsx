'use client'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { GalleryTop } from '@/payload-types'
import { useRef } from 'react'

const Photo = ({ image, i }: { image: GalleryTop; i: number }) => {
  const box = useRef(null)
  const isInView = useInView(box, { once: true })

  if (typeof image.image === 'number' || !image.image.url) {
    return null
  }
  return (
    <motion.div
      className={`absolute top-0 left-0
        w-full h-full overflow-hidden`}
      initial={{ opacity: 0, x: '-100%' }}
      animate={isInView ? { opacity: 1, x: '0%' } : {}}
      transition={{ ease: 'easeIn', duration: 0.7 }}
      ref={box}
    >
      <Image
        src={image.image.url}
        fill
        alt={image.image.alt || `Gallery image ${i + 1}`}
        className="w-full object-cover rounded-lg h-full"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={i < 3}
      />
    </motion.div>
  )
}

export default Photo
