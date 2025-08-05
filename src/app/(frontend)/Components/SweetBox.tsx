'use client'
import Link from 'next/link'
import { motion } from 'motion/react'
import CakeSVG from './CakeSVG'
import BunSVG from './BunSVG'
import BakingSVG from './BakingSVG'
import { ReactNode } from 'react'

interface CategoryTypes {
  title: string
  href: string
  icon: ReactNode
  desc: string
}

const categories: CategoryTypes[] = [
  {
    icon: <CakeSVG className='aspect-auto h-52' />,
    title: 'Torty',
    desc: 'Unikalne kompozycje na specjalne okazje',
    href: '/offer?category=torty',
  },
  {
    icon: <BunSVG className='aspect-auto h-52' />,
    title: 'Desery',
    desc: 'Małe dzieła sztuki cukierniczej na każdą okazję',
    href: '/offer?category=desery',
  },
  {
    icon: <BakingSVG className='aspect-auto h-52' />,
    title: 'Ciasta',
    desc: 'Elegancja i lekkość w każdym kęsie',
    href: '/offer?category=ciasta',
  },
]

const SweetBox = () => {
  return (
    <>
      {categories.map((category) => (
        <motion.div key={category.title} whileHover={{ scale: 1.05 }} className="group relative ">
          <Link
            href={category.href}
            className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full"
          >
            <div className="text-center">
              <span className="text-6xl p-2 flex items-center justify-center">{category.icon}</span>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.title}</h3>
              <p className="text-gray-600">{category.desc}</p>
            </div>
          </Link>
        </motion.div>
      ))}
    </>
  )
}

export default SweetBox
