'use client'

import Image from 'next/image'
import { easeIn, motion } from 'motion/react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { usePopupStore } from '../../state/store'
import CartTop from './CartTop'
import { useNewsData } from '../../lib/ReactQuery/useNewsData'
import { Media } from '@/payload-types'

interface NewsCartProps {
  slide: string
}


const NewsCart: React.FC<NewsCartProps> = ({ slide }) => {
  const { setComponent } = usePopupStore()

  const { data, isLoading, error } = useNewsData(slide)

  const image = data?.image as Media | null
  const image2 = data?.image2 as Media | null

  const handleImageClick = (imageSrc: string) => {
    setComponent(
      <motion.div
        className="w-full h-full"
        layoutId={`photo-${imageSrc}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Image
          alt="Enlarged content preview"
          className={`object-contain rounded-md aspect-auto w-full h-full
          pointer-events-none max-w-[90vw] max-h-[90vh] `}
          src={imageSrc}
          width={image?.width ?? 1200}
          height={image?.height ?? 800}
          priority
        />
      </motion.div>,
    )
  }

  if (isLoading) {
    return (
      <div className="mx-2 my-2 h-fit animate-pulse">
        <div className="flex flex-col lg:flex-row md:gap-6">
          <div className="flex-1 space-y-4">
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="flex flex-col gap-4 mt-4 md:flex-row md:items-start md:gap-6 md:flex-none">
            <div className="w-full h-64 bg-gray-200 rounded-md sm:h-72 md:h-80"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="mx-2 my-2 p-4 bg-red-100 text-red-700 rounded-lg">wystąpił błąd</div>
  }

  if (!data) return null

  return (
    <article className="mx-2 my-2 h-fit">
      <CartTop data={data.createdAt} />
      <div className="w-full h-1 bg-slate-100 rounded-sm my-4 hidden md:block"></div>
      <div className="flex flex-col xl:flex-row md:gap-6 mb-8">
        <div className="flex-1">
          <h2 className="text-2xl font-bold lg:text-4xl">{data.title}</h2>
          {data.content && <RichText data={data.content} />}
          {data.subcontent && (
            <div className="my-4 p-6 text-center bg-gray-50 rounded-lg border border-gray-200">
              <RichText data={data.subcontent} className="mt-4 text-gray-600 italic" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6 md:flex-none">
          {image?.url && (
            <motion.div
              transition={{ duration: 0.25, ease: easeIn }}
              className="cursor-pointer flex-1"
              onClick={() => image?.url && handleImageClick(image.url)}
            >
              <Image
                alt={image.alt || 'News image'}
                className={`object-cover w-full md:h-64
                  ${data.image2 && data.image ? 'h-40' : 'h-80'}
                  rounded-md shadow-lg hover:shadow-xl transition-shadow duration-200`}
                src={image.url}
                width={image.width ?? 1200}
                height={image.height ?? 800}
                priority
              />
            </motion.div>
          )}

          {image2?.url && (
            <motion.div
              transition={{ duration: 0.25, ease: easeIn }}
              className="cursor-pointer flex-1"
              onClick={() => image2?.url && handleImageClick(image2.url)}
            >
              <Image
                alt={image2.alt || 'Secondary news image'}
                className={`object-cover w-full ${data.image2 && data.image ? 'h-40' : 'h-80'} 
                rounded-md shadow-lg hover:shadow-xl transition-shadow duration-200 md:h-64`}
                src={image2.url}
                width={image2.width ?? 1200}
                height={image2.height ?? 800}
              />
            </motion.div>
          )}
        </div>
      </div>
    </article>
  )
}

export default NewsCart
