import React from 'react'
import Burger from './Burger'
import Link from 'next/link'
import Logo from './Logo'

const Navbar = () => {
  return (
    <nav
      className="flex fixed top-0 left-0 w-screen z-50 px-6 flex-row justify-between 
    items-center h-28 bg-white text-black shadow-lg font-shantell-sans"
    >
      <div className="w-24 h-[4.5rem] relative">
        <Logo />
      </div>
      <div className="block md:hidden">
        <Burger />
      </div>
      <div className="hidden md:flex  text-2xl lg:text-3xl lg:gap-12">
        <Link href="/news" className="p-4 hover:scale-105 transition-all hover:text-gray-800">
          Nowości
        </Link>
        <Link href="/offer" className="p-4 hover:scale-105 transition-all hover:text-gray-800">
          Oferta
        </Link>
        <Link href="/galery" className="p-4 hover:scale-105 transition-all hover:text-gray-800">
          Galeria
        </Link>
        <Link href="/contact" className="p-4 hover:scale-105 transition-all hover:text-gray-800">
          Kontakt
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
