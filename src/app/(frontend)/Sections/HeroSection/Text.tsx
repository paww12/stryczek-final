'use client'

import { useEffect, useState } from 'react'
import { useNavbarTexts } from '../../lib/ReactQuery/useNavbarText'

const SPEED = 250

const Text = () => {
  const { data: phrases = [] } = useNavbarTexts()
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    let cancelled = false
    const animate = async () => {
      if (!phrases.length) return

      const current = phrases[index].text
      for (let i = 0; i <= current.length; i++) {
        if (cancelled) return
        setText(current.slice(0, i))
        await new Promise(r => setTimeout(r, SPEED))
      }
      await new Promise(r => setTimeout(r, SPEED * 4))
      for (let i = current.length; i >= 0; i--) {
        if (cancelled) return
        setText(current.slice(0, i))
        await new Promise(r => setTimeout(r, SPEED / 2))
      }
      if (!cancelled) setIndex((idx) => (idx + 1) % phrases.length)
    }
    animate()
    return () => void (cancelled = true)
  }, [index, phrases])

  return (
    <h2 className="hidden sm:flex mt-8 p-6 sm:h-28 bg-white w-fit bg-opacity-75 mb-12 backdrop-blur-[1px] flex-col rounded-md opacity-0 text-2xl animate-fade-in-delay md:text-3xl lg:h-32 lg:text-4xl">
      <span className="flex flex-col">
        Oferujemy pyszne
        <span>{text}</span>
      </span>
    </h2>
  )
}

export default Text
