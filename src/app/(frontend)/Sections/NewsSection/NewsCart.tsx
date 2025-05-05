'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
// import { motion } from 'framer-motion'
import { motion } from 'motion/react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { usePopupStore } from '../../state/store'
import CartTop from './CartTop'

interface NewsCartProps {
  slide: string
}
interface NewsData {
  title: string
  createdAt: string
  id: number
  updatedAt: string
  content: SerializedEditorState
  subcontent?: SerializedEditorState
  image?: {
    url: string
    alt?: string
    width: number
    height: number
  }
  image2?: {
    url: string
    alt?: string
    width: number
    height: number
  }
}

const NewsCart: React.FC<NewsCartProps> = ({ slide }) => {
  const [data, setData] = useState<NewsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { setComponent } = usePopupStore()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(`/api/news?limit=1&sort=-createdAt&page=${slide}`)
        if (!res.ok) throw new Error('Failed to fetch data')
        const responseData = await res.json()
        setData(responseData.docs[0])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [slide])

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
          width={data?.image?.width}
          height={data?.image?.height}
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
    return <div className="mx-2 my-2 p-4 bg-red-100 text-red-700 rounded-lg">Error: {error}</div>
  }

  if (!data) return null

  return (
    <article className="mx-2 my-2 h-fit">
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
          {data.image?.url && (
            <motion.div
              //   layoutId={`image-${data.image.url}`}
              transition={{ duration: 0.25, ease: 'easeIn' }}
              className="cursor-pointer flex-1"
              onClick={() => data.image?.url && handleImageClick(data.image.url)}
            >
              <Image
                alt={data.image.alt || 'News image'}
                className={`object-cover w-full md:h-64
                  ${data.image2 && data.image ? 'h-40' : 'h-80'}
                  rounded-md shadow-lg hover:shadow-xl transition-shadow duration-200`}
                src={data.image.url}
                width={data.image.width}
                height={data.image.height}
                priority
              />
            </motion.div>
          )}

          {data.image2?.url && (
            <motion.div
              //   layoutId={`image-${data.image2.url}`}
              transition={{ duration: 0.25, ease: 'easeIn' }}
              className="cursor-pointer flex-1"
              onClick={() => data.image2?.url && handleImageClick(data.image2.url)}
            >
              <Image
                alt={data.image2.alt || 'Secondary news image'}
                className={`object-cover w-full ${data.image2 && data.image ? 'h-40' : 'h-80'} 
                rounded-md shadow-lg hover:shadow-xl transition-shadow duration-200 md:h-64`}
                src={data.image2.url}
                width={data.image2.width}
                height={data.image2.height}
              />
            </motion.div>
          )}
        </div>
      </div>
    </article>
  )
}

export default NewsCart
