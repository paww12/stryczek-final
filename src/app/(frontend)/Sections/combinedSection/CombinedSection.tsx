'use client'
import { useRef } from 'react'
import HomeGallerySection from '../GallerySection/HomeGallerySection'
import ImageSection from '../ImageSection/ImageSection'
import { useScroll } from 'motion/react'
import { useIsMobile } from '../../lib/useIsMobile'

const CombinedSection = () => {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })
  const isMobile = useIsMobile()
  return (
    <div ref={container} className={`relative ${isMobile ? '' : 'h-[160vh]'} mb-24 `}>
      <HomeGallerySection scrollYProgress={scrollYProgress} />
      <div className="hidden md:block">
        <ImageSection scrollYProgress={scrollYProgress} />
      </div>
    </div>
  )
}

export default CombinedSection
