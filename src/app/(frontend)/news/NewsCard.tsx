'use client'
import Image from 'next/image'
import { easeIn, motion } from 'motion/react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import CartTop from '../Sections/NewsSection/CartTop'
import { usePopupStore } from '../state/store'
import { Media, News } from '@/payload-types'

export default function NewsCard({ data }: { data: News }) {
  const { setComponent } = usePopupStore()

  const image = data.image as Media | null
  const image2 = data.image2 as Media | null

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
          className="object-contain rounded-md aspect-auto w-full h-full pointer-events-none max-w-[90vw] max-h-[90vh]"
          src={imageSrc}
          width={image?.width ?? 1200}
          height={image?.height ?? 800}
          priority
        />
      </motion.div>,
    )
  }

  return (
    <article className="mx-2 my-2 h-fit w-full p-4 bg-white rounded-lg shadow-lg">
      <CartTop data={data.createdAt} />
      <div className="w-full h-1 bg-slate-100 rounded-sm my-4 hidden md:block"></div>
      <div className="flex flex-col xl:flex-row md:gap-6">
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
          {image?.url && image.width && image.height && (
            <motion.div
              transition={{ duration: 0.25, ease: easeIn }}
              className="cursor-pointer flex-1"
              onClick={() => handleImageClick(image.url!)}
            >
              <Image
                alt={image.alt || 'News image'}
                className={`object-cover w-full ${image2 ? 'h-80' : 'h-[24rem]'} rounded-md shadow-lg hover:shadow-xl transition-shadow duration-200`}
                src={image.url}
                width={image.width}
                height={image.height}
                priority
              />
            </motion.div>
          )}

          {image2?.url && image2.width && image2.height && (
            <motion.div
              transition={{ duration: 0.25, ease: easeIn }}
              className="cursor-pointer flex-1"
              onClick={() => handleImageClick(image2.url!)}
            >
              <Image
                alt={image2.alt || 'Secondary news image'}
                className="object-cover w-full h-80 rounded-md shadow-lg hover:shadow-xl transition-shadow duration-200"
                src={image2.url}
                width={image2.width}
                height={image2.height}
              />
            </motion.div>
          )}
        </div>
      </div>
    </article>
  )
}
