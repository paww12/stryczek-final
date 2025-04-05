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
        const res = await fetch('/api/gallery-top')
        const newData = await res.json()
        setImages(newData.docs as GalleryTop[])
      } catch (error) {
        console.error('Error refreshing data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchLatest()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <motion.div className="p-4 gap-4 grid grid-cols-3 w-full h-full">
      {images?.map((image, i) => (
        <motion.div className="relative w-full h-full min-h-40 overflow-hidden" key={image.id}>
          <Photo image={image} i={i} />
        </motion.div>
      ))}
    </motion.div>
  )
}

export default GalleryMain
