import { MotionValue, useTransform, motion, useIsomorphicLayoutEffect } from 'motion/react'
import { useState } from 'react'
import ContactForm from '../../contact/components/ContactForm'

type StyleProps = {
  x?: string
  rotate?: string
} & React.CSSProperties

const ImageSection = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const _rotate = useTransform(scrollYProgress, (value) => `${value * -5}deg`)
  const roteteSection = useTransform(scrollYProgress, [0, 1], [5, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1])
  const scaleCircles = useTransform(scrollYProgress, [0, 1], [0.8, 1.2])
  const yPos = useTransform(scrollYProgress, [0, 1], [-150, 25])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1])

  const [dots, setDots] = useState<Array<{ id: number; style: StyleProps }>>([])

  useIsomorphicLayoutEffect(() => {
    const generateDots = () => {
      const baseHue = 210
      const hueVariation = 50

      return Array.from({ length: 25 }).map((_, i) => {
        const hue = baseHue + Math.random() * hueVariation * (Math.random() > 0.5 ? 1 : -1)
        const saturation = 60 + Math.random() * 20
        const lightness = 40 + Math.random() * 10

        return {
          id: i,
          style: {
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            scale: Math.random() * 0.75 + 0.5,
            backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
          },
          animation: {
            backgroundColor: [
              `hsl(${hue}, ${saturation}%, ${lightness}%)`,
              `hsl(${hue + 30}, ${saturation}%, ${lightness}%)`,
              `hsl(${hue}, ${saturation}%, ${lightness}%)`,
            ],
            transition: {
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          },
        }
      })
    }

    setDots(generateDots())
  }, [])

  const FloatingShape = ({ style, className }: { style?: StyleProps; className: string }) => (
    <motion.div
      className={`absolute shadow-2xl  ${className}`}
      style={{
        ...style,
        y: yPos,
        opacity,
        scale: scaleCircles,
        rotate: style?.rotate || '0deg',
        x: style?.x || '0px',
      }}
    />
  )

  return (
    <motion.section
      style={{ rotate: roteteSection, scale }}
      className="relative h-[80vh] pb-20 bg-gradient-to-b rounded-lg shadow-md  from-slate-100 to-slate-50 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <FloatingShape
        className="w-32 h-32 bg-blue-50 blur-xl rounded-full left-8 top-3/4"
        style={{ x: '-50px', rotate: '0deg' }}
      />
      <FloatingShape
        className="w-48 h-48 bg-indigo-50 blur-lg rounded-3xl -right-20 top-1/3"
        style={{ x: '50px', rotate: '45deg' }}
      />

      <div className="mx-auto px-4 h-full flex items-start justify-center relative">
        <motion.div className="text-center space-y-2" style={{ y: yPos, opacity }}>
          <h2 className="text-4xl font-bold text-slate-800 tooHeightMin">Lorem ipsum dolor sit amet.</h2>
          <p className="text-slate-600 max-w-md mx-auto tooHeight">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem quisquam commodi
            amet incidunt officiis enim accusamus consequatur, sint natus qui.
          </p>
          <ContactForm />
        </motion.div>
        {dots.length > 0 && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ scale: scaleCircles }}
          >
            {dots.map((dot) => (
              <motion.div
                key={dot.id}
                className={`absolute w-4 h-4 opacity-65 blur-sm rounded-full`}
                style={dot.style}
                animate={{
                  y: [0, -20, 0],
                  transition: {
                    duration: Math.random() * 2 + 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
              />
            ))}
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}

export default ImageSection
