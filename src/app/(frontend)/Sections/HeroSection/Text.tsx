'use client'
import { useEffect, useState } from 'react'

const phrases = ['ciasteczka', 'torty', 'słodkości']
const SPEED = 250

const Text = () => {
  const [text, setText] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const animate = async () => {
      for (let i = 0; i <= phrases[index].length; i++) {
        setText(phrases[index].slice(0, i))
        await new Promise((r) => setTimeout(r, SPEED))
      }

      await new Promise((r) => setTimeout(r, 1000))

      for (let i = phrases[index].length; i >= 0; i--) {
        setText(phrases[index].slice(0, i))
        await new Promise((r) => setTimeout(r, SPEED / 2))
      }

      setIndex((prev) => (prev + 1) % phrases.length)
    }

    animate()
  }, [index])

  return (
    <h2 className="hidden sm:flex mt-12 p-6 sm:h-28 bg-white w-fit bg-opacity-75 mb-16 backdrop-blur-[1px] flex-col rounded-md opacity-0 text-2xl animate-fade-in-delay md:text-3xl lg:h-32 lg:text-4xl ">
      <span className="flex flex-col">
        Oferujemy pyszne
        <span>{text}</span>
      </span>
    </h2>
  )
}

export default Text
