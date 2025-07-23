import Image from 'next/image'
import { motion } from 'motion/react'

import { GalleryTop, Media } from '@/payload-types'
import { getMobileSizeClass } from './getMobileSizeClass'

export const MobileGallery = ({ images, loading, handleImageClick }: {
    images: GalleryTop[] | null
    loading: boolean
    handleImageClick: (image: Media, index: number) => void
}) => {
    return (
        <div className="px-4 py-4 mt-32">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Galeria</h1>
                <h2 className="text-lg text-gray-600">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, nisi?
                </h2>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    <p className="text-base ml-3">Ładowanie zdjęć...</p>
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-8 auto-rows-max">
                    {images?.map((image, index) => {
                        if (typeof image.image === 'number' || !image.image.url) {
                            return null
                        }

                        return (
                            <motion.div
                                key={image.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative group w-full rounded-lg overflow-hidden ${getMobileSizeClass(index)}`}
                            >
                                <Image
                                    src={image.image.url}
                                    onClick={() => handleImageClick(image.image as Media, index)}
                                    alt={image.image.alt || `Gallery image ${index + 1}`}
                                    fill
                                    className="w-full group-hover:scale-105 cursor-pointer h-full object-cover transition-transform duration-300 active:scale-95"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority={index < 2}
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R7W2xQB8mQy0G0letGrQosHGyYdjsEjyzhxTrWvvl9LPdLpjIILwL5Jh9qK0jvCuJo5SkLrjYKXmHJmXBKpFpDWXOjSZpFJCAWvWy4QgLWEV6o9Q/wAcHdg+e9eWAAAAAElFTkSuQmCC"
                                />
                                <div className="pointer-events-none absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg" />
                            </motion.div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}