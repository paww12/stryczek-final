'use client'
import { useEffect, useState } from 'react'

const SPEED = 250

interface NavbarTextDoc {
  id: number
  text: string
  createdAt: string
  updatedAt: string
}

interface ApiResponse {
  docs: NavbarTextDoc[]
  hasNextPage: boolean
  hasPrevPage: boolean
  limit: number
  nextPage: null | number
  page: number
  pagingCounter: number
  prevPage: null | number
  totalDocs: number
  totalPages: number
}

const Text = () => {
  const [text, setText] = useState('')
  const [phrases, setPhrases] = useState<string[] | null>(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/navbar-text')
        const data: ApiResponse = await res.json()
        const texts = data.docs.map((doc) => doc.text)
        setPhrases(texts)
      } catch (error) {
        console.error('Error fetching navbar texts:', error)
        setPhrases(['słodkości', 'torty', 'ciasteczka'])
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    let cancelled = false

    const animate = async () => {
      if (!phrases || phrases.length === 0) return

      const currentPhrase = phrases[index]

      for (let i = 0; i <= currentPhrase.length; i++) {
        if (cancelled) return
        setText(currentPhrase.slice(0, i))
        await new Promise((r) => setTimeout(r, SPEED))
      }

      await new Promise((r) => setTimeout(r, SPEED * 4))

      for (let i = currentPhrase.length; i >= 0; i--) {
        if (cancelled) return
        setText(currentPhrase.slice(0, i))
        await new Promise((r) => setTimeout(r, SPEED / 2))
      }

      if (!cancelled) {
        setIndex((prev) => (prev + 1) % phrases.length)
      }
    }

    animate()

    return () => {
      cancelled = true
    }
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
