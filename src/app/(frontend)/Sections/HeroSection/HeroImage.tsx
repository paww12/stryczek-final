'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
// import { motion, useMotionValue, useTransform, animate, useMotionTemplate } from 'framer-motion'
import { useMotionValue, motion, useTransform, animate, useMotionTemplate } from 'motion/react'

interface ImageData {
  alt: string
  createdAt: string
  filename: string
  filesize: number
  focalX: number
  focalY: number
  height: number
  id: number
  mimeType: string
  thumbnailURL: string | null
  updatedAt: string
  url: string
  width: number
}

interface NavbarImageData {
  id: number
  image: ImageData
  updatedAt: string
  createdAt: string
}

const HeroImage = () => {
  const progres1 = useMotionValue(0)
  const progres2 = useMotionValue(0)
  const [imageData, setImageData] = useState<NavbarImageData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/navbar-image')
      const data = await res.json()
      setImageData(data.docs[0])
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (!imageData) return
    const TimeoutNumber = setTimeout(() => {
      animate(progres1, 1, { duration: 1.3, ease: [0.76, 0, 0.24, 1] })
      animate(progres2, 1, { duration: 1.0, ease: [0.76, 0, 0.24, 1] })
    }, 250)

    return () => {
      clearTimeout(TimeoutNumber)
    }
  }, [progres1, progres2, imageData])

  const opacity = useTransform(progres1, [0, 1], [0, 1])
  const points = [
    {
      x: useTransform(progres1, [0, 1], ['50%', '0%']),
      y: useTransform(progres2, [0, 1], ['35%', '0%']),
    },
    {
      x: useTransform(progres1, [0, 1], ['50%', '100%']),
      y: useTransform(progres2, [0, 1], ['25%', '0%']),
    },
    {
      x: useTransform(progres1, [0, 1], ['50%', '100%']),
      y: useTransform(progres2, [0, 1], ['65%', '100%']),
    },
    {
      x: useTransform(progres1, [0, 1], ['50%', '0%']),
      y: useTransform(progres2, [0, 1], ['75%', '100%']),
    },
  ]

  const clipPath1 = useMotionTemplate`polygon(
      ${points[0].x} ${points[0].y},
      ${points[1].x} ${points[1].y},
      ${points[2].x} ${points[2].y},
      ${points[3].x} ${points[3].y}
          )`

  return (
    <div className="w-full h-full relative container mx-auto">
      {imageData?.image.url ? (
        <motion.div
          className="w-[80vw] max-h-[475px] h-full top-1/4 right-4 absolute 
          md:w-[calc(75vw)] md:max-h-[600px] md:right-8 max-w-[1300px]"
          style={{ clipPath: clipPath1, opacity }}
        >
          <Image
            alt={imageData.image.alt}
            src={imageData.image.url}
            priority
            fill
            sizes="100%"
            className="object-cover object-top h-screen w-full absolute rounded-xl opacity-70"
          />
        </motion.div>
      ) : null}
    </div>
  )
}

export default HeroImage
