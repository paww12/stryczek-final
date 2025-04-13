'use client'

import Image from 'next/image'
import { usePopupStore } from '../../state/store'
import { motion } from 'framer-motion'

const ImageComponent = ({ image }: { image: any }) => {
  const { setComponent } = usePopupStore()

  const handleClick = (url: string) => {
    console.log(url)
    setComponent(
      <motion.div
        className="w-full h-full"
        layoutId={`photo-${url}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Image
          alt="Enlarged content preview"
          className="object-contain rounded-md aspect-auto w-full h-full
            pointer-events-none max-w-[90vw] max-h-[90vh]"
          src={url}
          width={1500}
          height={1500}
          priority
        />
      </motion.div>,
    )
  }

  return image?.url ? (
    <Image
      onClick={() => handleClick(image.url)}
      src={image.url}
      fill
      className="object-cover"
      alt={image.alt || 'Cake image'}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  ) : (
    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-1/3 h-1/3 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>
  )
}

export default ImageComponent
