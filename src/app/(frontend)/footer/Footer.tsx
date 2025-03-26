import React from 'react'
import Link from 'next/link'
import SocialIcons from '../contact/components/SocialIcons'

const Footer = () => {
  return (
    <div
      className="w-full h-[120px] relative bg-slate-300 
      sm:h-[150px] md:h-[200px] lg:h-[250px] xl:h-[300px]"
      style={{ clipPath: 'polygon(0% 0, 100% 0%, 100% 100%, 0 100%)' }}
    >
      <div
        className="fixed bottom-0 h-[120px] w-full left-0
      sm:h-[150px] md:h-[200px] lg:h-[250px] xl:h-[300px]"
      >
        <div className="flex flex-col-reverse justify-between items-center h-full py-8 px-2 container mx-auto">
          <div className="flex space-x-4 mt-4">
            <Link href="/" className="text-gray-600 hover:text-gray-800">
              Home
            </Link>
            <Link href="/offer" className="text-gray-600 hover:text-gray-800">
              Oferta
            </Link>
            <Link href="/galery" className="text-gray-600 hover:text-gray-800">
              Galeria
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-gray-800">
              Contact
            </Link>
          </div>
          <div className="hidden md:block ">
            <SocialIcons />
          </div>

          <p className="text-sm text-gray-500 mt-4">© {new Date().getFullYear()} Słodka Pętelka</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
