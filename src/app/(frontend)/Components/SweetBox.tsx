'use client'
import Link from 'next/link'
// import { motion } from 'framer-motion'
import { motion } from 'motion/react'

interface Category {
  title: string
  href: string
  icon: React.ReactNode
  desc: string
}

const SweetBox = ({ categories }: { categories: Category[] }) => {
  return (
    <>
      {categories.map((category) => (
        <motion.div key={category.title} whileHover={{ scale: 1.05 }} className="group relative">
          <Link
            href={category.href}
            className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full"
          >
            <div className="text-center">
              <span className="text-6xl mb-4 inline-block">{category.icon}</span>
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
