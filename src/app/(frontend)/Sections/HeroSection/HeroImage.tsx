'use client'

import { useNavbarImage } from '../../lib/ReactQuery/useNavbarImage'
import { AnimatedImage } from './AnimatedImage'


const HeroImage = () => {
  const { data: imageData, isLoading, error } = useNavbarImage()

  const containerClasses = "w-full h-full relative container mx-auto"
  const imageClasses = "w-[80vw] max-h-[475px] h-full top-1/4 right-4 absolute md:w-[calc(75vw)] md:max-h-[600px] md:right-8 max-w-[1300px]"

  if (error) {
    console.error('Error fetching navbar image:', error)
    return (
      <div className={containerClasses}>
        <div className={`${imageClasses} bg-gray-300 rounded-xl flex items-center justify-center`}>
          <p className="text-gray-600">Failed to load image</p>
        </div>
      </div>
    )
  }

  if (isLoading || !imageData) {
    return (
      <div className={containerClasses}>
        <div className={`${imageClasses} bg-gray-200 animate-pulse rounded-xl`} />
      </div>
    )
  }

  return (
    <div className={containerClasses}>
      <AnimatedImage
        imageData={imageData}
        className={imageClasses}
      />
    </div>
  )
}

export default HeroImage