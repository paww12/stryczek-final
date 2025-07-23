import { NavbarImage } from "@/payload-types"
import { animate, useMotionTemplate, useMotionValue, useReducedMotion, useTransform, motion } from "motion/react"
import Image from "next/image"
import { useEffect } from "react"

interface AnimatedImageProps {
    imageData: NavbarImage
    className?: string
}

export const AnimatedImage = ({ imageData, className = '' }: AnimatedImageProps) => {
    const progress1 = useMotionValue(0)
    const progress2 = useMotionValue(0)
    const shouldReduceMotion = useReducedMotion()

    useEffect(() => {
        if (shouldReduceMotion) {
            progress1.set(1)
            progress2.set(1)
            return
        }

        const timeoutId = setTimeout(() => {
            animate(progress1, 1, { duration: 1.4, ease: [0.76, 0, 0.24, 1] })
            animate(progress2, 1, { duration: 1.0, ease: [0.76, 0, 0.24, 1] })
        }, 250)

        return () => clearTimeout(timeoutId)
    }, [progress1, progress2, shouldReduceMotion])

    const opacity = useTransform(progress1, [0, 1], [0, 1])

    const points = [
        {
            x: useTransform(progress1, [0, 1], ['50%', '0%']),
            y: useTransform(progress2, [0, 1], ['35%', '0%']),
        },
        {
            x: useTransform(progress1, [0, 1], ['50%', '100%']),
            y: useTransform(progress2, [0, 1], ['25%', '0%']),
        },
        {
            x: useTransform(progress1, [0, 1], ['50%', '100%']),
            y: useTransform(progress2, [0, 1], ['65%', '100%']),
        },
        {
            x: useTransform(progress1, [0, 1], ['50%', '0%']),
            y: useTransform(progress2, [0, 1], ['75%', '100%']),
        },
    ]

    const clipPath = useMotionTemplate`polygon(
      ${points[0].x} ${points[0].y},
      ${points[1].x} ${points[1].y},
      ${points[2].x} ${points[2].y},
      ${points[3].x} ${points[3].y}
    )`

    if (!imageData?.image || typeof imageData.image === 'number' || !imageData.image.url) {
        return null
    }

    return (
        <motion.div
            className={className}
            style={{
                clipPath: shouldReduceMotion ? 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' : clipPath,
                opacity: shouldReduceMotion ? 1 : opacity,
                transform: 'translate3d(0, 0, 0)',
                willChange: shouldReduceMotion ? 'auto' : 'clip-path, opacity'
            }}
            animate={shouldReduceMotion ? false : undefined}
        >
            <Image
                alt={imageData.image.alt || 'Hero image'}
                src={imageData.image.url}
                priority
                fill
                sizes="(max-width: 768px) 80vw, 75vw"
                className="object-cover object-top rounded-xl opacity-70"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R7W2xQB8mQy0G0letGrQosHGyYdjsEjyzhxTrWvvl9LPdLpjIILwL5Jh9qK0jvCuJo5SkLrjYKXmHJmXBKpFpDWXOjSZpFJCAWvWy4QgLWEV6o9Q/wAcHdg+e9eWAAAAAElFTkSuQmCC"
            />
        </motion.div>
    )
}