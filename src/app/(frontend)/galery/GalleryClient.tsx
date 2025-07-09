'use client'

import { useState, useEffect } from 'react'
import { GalleryTop, Media } from '@/payload-types'
import { usePopupStoreGalery } from '../state/store'
import { useIsMobile } from '../lib/useIsMobile'
import { MobileGallery } from './MobileGallery'
import { DesktopGallery } from './DesktopGallery'

const GalleryClient = () => {
  const [images, setImages] = useState<GalleryTop[] | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const isMobile = useIsMobile()

  const { setComponent, setImages: setStoreImages } = usePopupStoreGalery()

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch('/api/gallery-top?limit=5')
        const newData = await res.json()

        if (!newData.docs || !Array.isArray(newData.docs)) {
          throw new Error('Invalid API response structure')
        }

        setImages(newData.docs)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchLatest()
  }, [])

  const handleImageClick = async (clickedImage: Media, clickedIndex: number) => {
    console.log(clickedImage, clickedIndex)
    const topImages = images?.map(img => typeof img.image !== 'number' ? img.image : null).filter(Boolean) as Media[] || []

    let mainImages: Media[] = []
    try {
      const res = await fetch('/api/gallery-main?limit=1000&depth=1')

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`)
      }

      const mainData = await res.json()
      mainImages = mainData.docs.map((doc: any) => typeof doc.image !== 'number' ? doc.image : null).filter(Boolean) as Media[]
    } catch (error) {
      console.error('Error fetching main gallery:', error)
    }

    const allImages = [...topImages, ...mainImages]
    const globalIndex = allImages.findIndex(img => img.url === clickedImage.url)

    setStoreImages(allImages, globalIndex !== -1 ? globalIndex : clickedIndex)
    setComponent(<div />)
  }

  return (
    <>
      {isMobile ? (
        <MobileGallery
          images={images}
          loading={loading}
          handleImageClick={handleImageClick}
        />
      ) : (
        <DesktopGallery
          images={images}
          loading={loading}
          handleImageClick={handleImageClick}
        />
      )}
    </>
  )
}

export default GalleryClient