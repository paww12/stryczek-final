'use client'

import { useInView, motion } from 'motion/react'
import Photo from './Photo'
import { useEffect, useRef, useMemo } from 'react'
import { useGalleryMainInfinite } from '../lib/ReactQuery/useGallery'

const GalleryMainPage = () => {
  const sentinelRef = useRef(null)
  const animatedIds = useRef(new Set<string>())

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error
  } = useGalleryMainInfinite()

  const isInView = useInView(sentinelRef, {
    once: false,
  })

  const images = useMemo(() => {
    return data?.pages.flatMap(page => page.docs) || []
  }, [data])

  useEffect(() => {
    if (isInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [isInView, hasNextPage, isFetchingNextPage, fetchNextPage])

  const getSizeClass = (i: number) => {
    const pattern = [
      'col-span-2 row-span-1 h-64',
      'col-span-1 row-span-2 h-[34rem]',
      'col-span-2 row-span-1 h-64',
      'col-span-1 row-span-1 h-64',
      'col-span-2 row-span-1 h-64',
    ]
    return pattern[i % pattern.length]
  }

  const handleAnimationComplete = (id: string) => {
    animatedIds.current.add(id)
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        Wystąpił błąd podczas ładowania galerii
      </div>
    )
  }

  return (
    <>
      <motion.div className="grid grid-cols-3 gap-8 m-4 auto-rows-max">
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

      {isFetchingNextPage && (
        <div className="text-center p-4 text-gray-500">
          Ładowanie kolejnych zdjęć...
        </div>
      )}

      {!hasNextPage && !isLoading && images.length > 0 && (
        <div className="text-center p-4 text-gray-500">
          To już wszystkie zdjęcia
        </div>
      )}
    </>
  )
}

export default GalleryMainPage