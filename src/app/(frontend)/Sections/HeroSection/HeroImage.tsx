'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useMotionValue, motion, useTransform, animate, useMotionTemplate } from 'motion/react'
import { NavbarImage } from '@/payload-types'

const HeroImage = () => {
  const progress1 = useMotionValue(0)
  const progress2 = useMotionValue(0)
  const [imageData, setImageData] = useState<NavbarImage | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/navbar-image')
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }
        
        const data = await res.json()
        
        if (data.docs?.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.docs.length)
          setImageData(data.docs[randomIndex])
        }
      } catch (error) {
        console.error('Error fetching navbar image:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (!imageData || isLoading) return

    const timeoutId = setTimeout(() => {
      animate(progress1, 1, { duration: 1.3, ease: [0.76, 0, 0.24, 1] })
      animate(progress2, 1, { duration: 1.0, ease: [0.76, 0, 0.24, 1] })
    }, 250)

    return () => clearTimeout(timeoutId)
  }, [progress1, progress2, imageData, isLoading])

  const opacity = useTransform(progress1, [0, 1], [0, 1])
  
  const points = [
    {
      x: useTransform(progress1, [0, 1], ['50%', '0%']),
      y: useTransform(progress2, [0, 1], ['35%', '0%']),
    },
    {
      x: useTransform(progress1, [0, 1], ['50%', '100%']),
      y: useTransform(progress2, [0, 1], ['25%', '0%']),
    },
    {
      x: useTransform(progress1, [0, 1], ['50%', '100%']),
      y: useTransform(progress2, [0, 1], ['65%', '100%']),
    },
    {
      x: useTransform(progress1, [0, 1], ['50%', '0%']),
      y: useTransform(progress2, [0, 1], ['75%', '100%']),
    },
  ]

  const clipPath = useMotionTemplate`polygon(
    ${points[0].x} ${points[0].y},
    ${points[1].x} ${points[1].y},
    ${points[2].x} ${points[2].y},
    ${points[3].x} ${points[3].y}
  )`

  if (isLoading) {
    return (
      <div className="w-full h-full relative container mx-auto">
        <div className="w-[80vw] max-h-[475px] h-full top-1/4 right-4 absolute 
          md:w-[calc(75vw)] md:max-h-[600px] md:right-8 max-w-[1300px] 
          bg-gray-200 animate-pulse rounded-xl" />
      </div>
    )
  }

  if (!imageData?.image || typeof imageData.image === 'number' || !imageData.image.url) {
    return null
  }

  return (
    <div className="w-full h-full relative container mx-auto">
      <motion.div
        className="w-[80vw] max-h-[475px] h-full top-1/4 right-4 absolute 
          md:w-[calc(75vw)] md:max-h-[600px] md:right-8 max-w-[1300px]"
        style={{ clipPath, opacity }}
      >
        <Image
          alt={imageData.image.alt}
          src={imageData.image.url}
          priority
          fill
          sizes="(max-width: 768px) 80vw, 75vw"
          className="object-cover object-top rounded-xl opacity-70"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R7W2xQB8mQy0G0letGrQosHGyYdjsEjyzhxTrWvvl9LPdLpjIILwL5Jh9qK0jvCuJo5SkLrjYKXmHJmXBKpFpDWXOjSZpFJCAWvWy4QgLWEV6o9Q/wAcHdg+e9eWAAAAAElFTkSuQmCC"
        />
      </motion.div>
    </div>
  )
}

export default HeroImage