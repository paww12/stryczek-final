'use client'
import { easeInOut, motion } from 'motion/react'
import useScrollVelocity from '../../lib/useScrollVelocity'
import Link from 'next/link'
import { useMarqueData } from '../../lib/ReactQuery/useMarqueData'
import { useState } from 'react'

export default function MarqueeComponent({ text }: { text: string }) {
  const rawVelocity = useScrollVelocity(0.1)

  const [shouldAnimate, setShouldAnimate] = useState(true)

  const { data, isLoading } = useMarqueData()

  const processedData = data && data?.length > 0
    ? data?.map(item => ({
      text: item.text,
      href: item.link && typeof item.link === 'object' && 'title' in item.link
        ? `/product/${encodeURIComponent(item.link.title)}`
        : null
    }))
    : [{ text, href: null }]

  if (isLoading) {
    return (
      <div className="relative py-3 my-8 overflow-hidden border-y border-gray-200/50 mx-8 md:mx-12 lg:mx-24">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
        <div className="flex gap-6 [mask:linear-gradient(90deg,transparent,white_5%,white_95%,transparent)]">
          <MarqueeTrack
            items={Array(12).fill({ text: 'Ładowanie...', href: null })}
            skew={rawVelocity}
            isLoading={true}
            shouldAnimate={shouldAnimate}
          />
          <MarqueeTrack
            items={Array(12).fill({ text: 'Ładowanie...', href: null })}
            skew={rawVelocity}
            isLoading={true}
            shouldAnimate={shouldAnimate}
          />
        </div>
      </div>
    )
  }

  return (
    <motion.div
      onHoverStart={() => setShouldAnimate(false)}
      onHoverEnd={() => setShouldAnimate(true)}
      className="relative py-3 my-8 overflow-hidden border-y border-gray-200/50 mx-8 md:mx-12 lg:mx-24 group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none group-hover:via-white/10 transition-all duration-300" />
      <div className="flex gap-6 [mask:linear-gradient(90deg,transparent,white_5%,white_95%,transparent)]">
        <MarqueeTrack
          items={processedData}
          skew={rawVelocity}
          shouldAnimate={shouldAnimate}
        />
        <MarqueeTrack
          items={processedData}
          skew={rawVelocity}
          shouldAnimate={shouldAnimate}
        />
      </div>
    </motion.div>
  )
}

interface MarqueeTrackProps {
  items: Array<{ text: string; href: string | null }>
  skew: number
  isLoading?: boolean
  shouldAnimate: boolean
}

function MarqueeTrack({
  items,
  skew,
  isLoading,
  shouldAnimate
}: MarqueeTrackProps) {
  const duplicatedItems = Array(Math.max(12, items.length * 4))
    .fill(null)
    .map((_, index) => ({
      ...items[index % items.length],
      id: `${index % items.length}-${Math.floor(index / items.length)}`
    }))

  return (
    <motion.div
      className="shrink-0 min-w-full flex items-center gap-6"
      animate={shouldAnimate ? {
        x: ['0%', 'calc(-100% - 24px)'],
      } : {}}
      style={{ skewX: skew / 20 }}
      transition={{
        duration: 25,
        ease: easeInOut,
        repeat: Infinity,
      }}
    >
      {duplicatedItems.map(({ text, href, id }) => {
        const itemContent = (
          <div className={`
            flex-shrink-0 
            rounded-xl 
            px-4 py-2.5 
            text-lg font-medium 
            whitespace-nowrap 
            transition-all duration-200 
            ${isLoading
              ? 'bg-gray-100 text-gray-400 animate-pulse'
              : href
                ? 'bg-gradient-to-r from-amber-50 to-orange-50 text-gray-800  cursor-pointer hover:from-amber-100 hover:to-orange-100'
                : 'bg-gradient-to-r from-slate-50 to-slate-100 text-gray-800 border hover:from-slate-100 hover:to-slate-200 border-amber-200/50 hover:bg-gradient-to-r '
            }
          `}>
            {text}
          </div>
        )

        return href ? (
          <Link
            key={id}
            href={href}
            tabIndex={-1}
            className="focus:outline-none my-2 focus:ring-1 focus:ring-orange-500 focus:ring-offset-2 rounded-xl"
          >
            {itemContent}
          </Link>
        ) : (
          <div key={id} className='my-2'>
            {itemContent}
          </div>
        )
      })}
    </motion.div>
  )
}