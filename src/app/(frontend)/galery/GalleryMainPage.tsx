'use client'
import { motion } from 'framer-motion'
import Photo from './Photo'
import { useEffect, useState, useRef } from 'react'
import { GalleryMain } from '@/payload-types'

const GalleryMainPage = () => {
  const [images, setImages] = useState<GalleryMain[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const animatedIds = useRef(new Set<string>())

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch(`/api/gallery-main?page=1&limit=5&depth=1`)
        const newData = await res.json()
        setImages(newData.docs)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchLatest()
  }, [])
  console.log(images)
  const handleLoadMore = async () => {
    setLoading(true)
    try {
      const nextPage = page + 1
      const res = await fetch(`/api/gallery-main?page=${nextPage}&limit=5&depth=1`)
      const newData = await res.json()

      setPage(nextPage)
      setImages((prev) => [...prev, ...newData.docs])
    } finally {
      setLoading(false)
    }
  }

  const getSizeClass = (i: number) => {
    const pattern = [
      'col-span-2 row-span-1',
      'col-span-1 row-span-2',
      'col-span-2 row-span-1',
      'col-span-1 row-span-1',
      'col-span-2 row-span-1',
    ]
    return pattern[i % pattern.length]
  }

  const handleAnimationComplete = (id: string) => {
    animatedIds.current.add(id)
  }

  if (loading && images.length === 0) return <div>Loading...</div>

  return (
    <div className="p-4">
      <motion.div className="grid grid-cols-3 gap-8 mb-4">
        {images.map((image, i) => (
          <motion.div
            className={`relative min-h-[26.5dvh] ${getSizeClass(i)}`}
            key={image.id}
            layout
          >
            <Photo
              image={image}
              index={i}
              shouldAnimate={!animatedIds.current.has(String(image.id))}
              onAnimationComplete={() => handleAnimationComplete(String(image.id))}
            />
          </motion.div>
        ))}
      </motion.div>

      <button
        onClick={handleLoadMore}
        className="rounded-md px-6 py-3 font-medium text-white bg-blue-400 mx-auto mb-4 block hover:bg-blue-500 transition-colors"
      >
        Load more
      </button>
    </div>
  )
}

export default GalleryMainPage
