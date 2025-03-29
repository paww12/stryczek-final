import { useScroll } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

export default function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0)
  const { scrollY } = useScroll()
  const last = useRef({ y: 0, time: Date.now() })
  const timeout = useRef<number | undefined>(undefined)

  useEffect(() => {
    return scrollY.onChange((y) => {
      const now = Date.now()
      const deltaTime = now - last.current.time

      if (deltaTime < 10) return
      const deltaY = y - last.current.y
      const newVelocity = (deltaY / deltaTime) * 1000

      setVelocity(Math.abs(newVelocity) > 10 ? newVelocity : 0)
      last.current = { y, time: now }

      clearTimeout(timeout.current)
      timeout.current = window.setTimeout(() => setVelocity(0), 50)
    })
  }, [scrollY])

  return Math.round(velocity)
}
