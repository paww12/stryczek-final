import React from 'react'
// import Burger from "./Burger";
import Link from 'next/link'
import Logo from './Logo'

const Navbar = () => {
  return (
    <nav
      className="flex fixed top-0 left-0 w-screen z-20 px-6 flex-row justify-between 
    items-center h-28 bg-white text-black shadow-lg font-shantell-sans"
    >
      <div className="w-16 h-16 relative">
        <Logo />
      </div>
      <div className="block md:hidden">{/* <Burger /> */}</div>
      <div className="hidden md:flex gap-4 text-3xl md:gap-8 lg:gap-12">
        <Link href="/offer" className="p-4">
          Oferta
        </Link>
        <Link href="/galery" className="p-4">
          Galeria
        </Link>
        <Link href="/contact" className="p-4">
          Kontakt
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
