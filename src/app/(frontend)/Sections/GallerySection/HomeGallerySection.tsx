import Link from 'next/link'
import EyeButton from '../../Components/EyeButton'
import SweetBox from '../../Components/SweetBox'
import Overlay from '../../Components/Overlay'
import Title from '../../Components/Title'
// import { MotionValue, useTransform, motion } from 'framer-motion'
import { MotionValue, useTransform, motion } from 'motion/react'
import { useIsMobile } from '../../lib/useIsMobile'

interface CategoryTypes {
  title: string
  href: string
  icon: string
  desc: string
}
const categories: CategoryTypes[] = [
  {
    icon: '🎂',
    title: 'Torty Artystyczne',
    desc: 'Unikalne kompozycje na specjalne okazje',
    href: '/offer?category=Ciasta',
  },
  {
    icon: '🍰',
    title: 'Desery Sezonowe',
    desc: 'Słodkości inspirowane porami roku',
    href: '/offer?category=Desery',
  },
  {
    icon: '🥐',
    title: 'Wypieki Domowe',
    desc: 'Elegancja i lekkość w każdym kęsie',
    href: '/offer?category=Wypieki',
  },
]

const HomeGallerySection = ({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  const isMobile = useIsMobile()

  const desktopScale = useTransform(scrollYProgress, [0, 1], [1, 0.8])
  const desktopRotate = useTransform(scrollYProgress, [0, 1], [0, -5])
  const desktopBrightness = useTransform(scrollYProgress, [0, 1], [1, 0.75])

  const desktopFilter = useTransform(desktopBrightness, (v) => `brightness(${v})`)

  const motionStyles = isMobile
    ? {}
    : {
        scale: desktopScale,
        rotate: desktopRotate,
        filter: desktopFilter,
      }

  return (
    <motion.section
      style={motionStyles}
      className="md:sticky md:top-[20vh] md:h-[70vh] md:mb-[10vh]
     py-16 bg-gradient-to-b rounded-lg shadow-md from-slate-50 to-white"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            <Overlay delay={0.3}>
              <Title />
            </Overlay>
          </h2>
          <Overlay delay={0.5}>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Pozwól oczom wyobraźni rozsmakować się w naszych kreacjach
            </p>
          </Overlay>
        </div>
        <Overlay delay={0.75}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SweetBox categories={categories} />
          </div>
        </Overlay>

        <Overlay delay={1}>
          <div className="text-center mt-8 md:mt-12">
            <Link
              href="/offer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-slate-200 text-black rounded-full text-lg font-semibold hover:bg-slate-700 hover:text-white transition-colors"
            >
              <EyeButton />
              Odkryj magiczny świat słodkości
            </Link>
          </div>
        </Overlay>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-56 h-56  bg-slate-200 opacity-50 rounded-full blur-2xl" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-pink-300 opacity-50 rounded-full blur-3xl" />
        </div>
      </div>
    </motion.section>
  )
}

export default HomeGallerySection
