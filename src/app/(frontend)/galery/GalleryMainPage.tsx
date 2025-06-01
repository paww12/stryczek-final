'use client'
import { useInView, motion } from 'motion/react'
import Photo from './Photo'
import { useEffect, useState, useRef, useCallback } from 'react'
import { GalleryMain } from '@/payload-types'

const GalleryMainPage = () => {
  const [images, setImages] = useState<GalleryMain[]>([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const animatedIds = useRef(new Set<string>())
  const sentinelRef = useRef(null)

  const isInView = useInView(sentinelRef, {
    once: false,
  })

  const loadImages = useCallback(async (pageNumber: number) => {
    if (loading) return
    try {
      setLoading(true)
      const res = await fetch(`/api/gallery-main?page=${pageNumber}&limit=5&depth=1`)
      const newData = await res.json()

      if (newData.docs.length === 0) {
        setHasMore(false)
        return
      }

      setImages((prev) => {
        const existingIds = new Set(prev.map((img) => img.id))
        const filtered = newData.docs.filter((doc: GalleryMain) => !existingIds.has(doc.id))
        return [...prev, ...filtered]
      })
    } finally {
      setLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isInView && hasMore && !loading) {
      const nextPage = page + 1
      setPage(nextPage)
      loadImages(nextPage)
    }
  }, [isInView, hasMore, loading, page, loadImages])

  useEffect(() => {
    setImages([])
    setPage(1)
    setHasMore(true)
    animatedIds.current.clear()
    loadImages(1)
  }, [loadImages])

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

  return (
    <>
      <motion.div className="grid grid-cols-3 gap-8 m-4">
        {images.map((image, i) => (
          <motion.div className={`${getSizeClass(i)}`} key={image.id} layout>
            <Photo
              image={image}
              index={i}
              shouldAnimate={!animatedIds.current.has(String(image.id))}
              onAnimationComplete={() => handleAnimationComplete(String(image.id))}
            />
          </motion.div>
        ))}
      </motion.div>

      <div ref={sentinelRef} className="h-[1px] w-full bg-transparent" />

      {loading && <div className="text-center p-4 text-gray-500">Ładowanie...</div>}
      {!hasMore && <div className="text-center p-4 text-gray-500">To już wszystkie zdjęcia</div>}
    </>
  )
}

export default GalleryMainPage
