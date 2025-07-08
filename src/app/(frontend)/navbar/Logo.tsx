'use client'
import { useBurgerStore } from '../state/store'
import Image from 'next/image'
import Link from 'next/link'


const Logo = () => {
  const { setIsOpen } = useBurgerStore()

  return (
    <>
      <Link href="/" className="flex gap-4 text-xl items-center" onClick={() => setIsOpen(false)}>
        <>
          <Image
            // src="/cinamonRoll.png"
            src='/logo.jpeg'
            height={100}
            width={100}
            priority
            alt="Słodka Pętelka logo"
          />
        </>
        {/* <span>Słodka Pętelka</span> */}
      </Link>
    </>
  )
}

export default Logo
