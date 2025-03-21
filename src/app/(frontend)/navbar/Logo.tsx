'use client'
import { useBurgerStore } from '../state/store'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface MediaImage {
  url: string
  alt: string
  filename: string
  filesize: number
  width: number
  height: number
  mimeType: string
  focalX?: number
  focalY?: number
  thumbnailURL?: string | null
  createdAt: string
  updatedAt: string
}

interface LogoData {
  id: number
  alt: string
  image: MediaImage
  createdAt: string
  updatedAt: string
}

const Logo = () => {
  const [image, setImage] = useState<LogoData | null>(null)
  const { setIsOpen } = useBurgerStore()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/logo')
      const data = await res.json()
      setImage(data.docs[0])
    }
    fetchData()
  }, [])

  return (
    <>
      <Link href="/" className="flex gap-4 text-xl items-center" onClick={() => setIsOpen(false)}>
        {image ? (
          <>
            <Image
              src={image.image.url}
              height={64}
              width={64}
              priority
              alt="Słodka Pętelka logo"
            />
          </>
        ) : (
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-slate-400 rounded-full animate-pulse" />
          </div>
        )}
        <span>Słodka Pętelka</span>
      </Link>
    </>
  )
}

export default Logo
