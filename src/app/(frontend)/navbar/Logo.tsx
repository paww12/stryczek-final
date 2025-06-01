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
            src="/cinamonRoll.png"
            height={64}
            width={64}
            priority
            alt="Słodka Pętelka logo"
          />
        </>
        <span>Słodka Pętelka</span>
      </Link>
    </>
  )
}

export default Logo
