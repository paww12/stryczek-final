'use client'
import { useBurgerStore } from '../state/store'
import Link from 'next/link'
import LogoSVG from './LogoSVG'


const Logo = () => {
  const { setIsOpen } = useBurgerStore()

  return (
    <>
      <Link href="/" className="flex gap-4 text-xl items-center" onClick={() => setIsOpen(false)}>
        <>
          <LogoSVG className='w-[90px] h-auto' />
        </>
      </Link>
    </>
  )
}

export default Logo
