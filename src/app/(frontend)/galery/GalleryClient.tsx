'use client'

import { Media } from '@/payload-types'
import { usePopupStoreGalery } from '../state/store'
import { useIsMobile } from '../lib/useIsMobile'
import { MobileGallery } from './MobileGallery'
import { DesktopGallery } from './DesktopGallery'
import { useGalleryTop } from '../lib/ReactQuery/useGalleryTop'
import { useGalleryMain } from '../lib/ReactQuery/useGallery'

const GalleryClient = () => {
  const isMobile = useIsMobile()
  const { setComponent, setImages: setStoreImages } = usePopupStoreGalery()

  const { data: images, isLoading: loading, error } = useGalleryTop()
  const { refetch: refetchMainGallery } = useGalleryMain()

  const handleImageClick = async (clickedImage: Media, clickedIndex: number) => {
    console.log(clickedImage, clickedIndex)

    const topImages = images?.map(img =>
      typeof img.image !== 'number' ? img.image : null
    ).filter(Boolean) as Media[] || []

    try {
      const { data: mainImages } = await refetchMainGallery()
      const allImages = [...topImages, ...(mainImages || [])]
      const globalIndex = allImages.findIndex(img => img.url === clickedImage.url)

      setStoreImages(allImages, globalIndex !== -1 ? globalIndex : clickedIndex)
      setComponent(<div />)
    } catch (error) {
      console.error('Error fetching main gallery:', error)

      // Fallback to just top images if main gallery fails
      setStoreImages(topImages, clickedIndex)
      setComponent(<div />)
    }
  }

  if (error) {
    console.error('Error loading gallery:', error)
  }

  return (
    <>
      {isMobile ? (
        <MobileGallery
          images={images || null}
          loading={loading}
          handleImageClick={handleImageClick}
        />
      ) : (
        <DesktopGallery
          images={images || null}
          loading={loading}
          handleImageClick={handleImageClick}
        />
      )}
    </>
  )
}

export default GalleryClient