import { useScroll } from "motion/react"
import { useEffect, useRef, useState } from 'react'

export default function useScrollVelocity(smoothing = 0.2) {
  const [velocity, setVelocity] = useState(0)
  const { scrollY } = useScroll()
  const last = useRef({ y: 0, time: Date.now() })
  const smoothedVelocity = useRef(0)
  const rafId = useRef<number | null>(null)
  
  useEffect(() => {
    let active = true
    
    const updateVelocity = () => {
      if (!active) return
      rafId.current = requestAnimationFrame(updateVelocity)
      
      const y = scrollY.get()
      const now = Date.now()
      const deltaTime = now - last.current.time
      
      if (deltaTime < 5) return
      
      const deltaY = y - last.current.y
      const newVelocity = (deltaY / deltaTime) * 1000
      last.current = { y, time: now }
      
      smoothedVelocity.current = 
        smoothing * newVelocity + 
        (1 - smoothing) * smoothedVelocity.current
        
      setVelocity(smoothedVelocity.current)
    }
    
    rafId.current = requestAnimationFrame(updateVelocity)
    
    return () => {
      active = false
      if (rafId.current) cancelAnimationFrame(rafId.current)
      last.current = { y: 0, time: Date.now() }
      smoothedVelocity.current = 0
      setVelocity(0)
    }
  }, [scrollY, smoothing])

  return velocity
}