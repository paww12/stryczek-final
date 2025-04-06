'use client'
import { motion } from 'framer-motion'
import Photo from './Photo'
import { useEffect, useState } from 'react'
import { GalleryTop } from '@/payload-types'

const GalleryMain = () => {
  const [images, setImages] = useState<GalleryTop[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch('/api/gallery-main')
        const newData = await res.json()
        console.log(newData)
        setImages(newData.docs as GalleryTop[])
      } catch (error) {
        console.error('Error refreshing data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchLatest()
  }, [])

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

  if (loading) return <div>Loading...</div>

  return (
    <motion.div className="p-4 gap-8 grid grid-cols-3 auto-rows-fr gap-y-8 mb-12 h-[calc(100dvh-7rem)]">
      {images?.map((image, i) => (
        <motion.div
          className={`relative w-full h-full overflow-hidden ${getSizeClass(i)}`}
          key={image.id}
        >
          <Photo image={image} i={i} />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default GalleryMain
