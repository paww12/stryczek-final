import { useScroll } from "motion/react"
import { useEffect, useRef, useState } from 'react'

export default function useScrollVelocity(smoothing = 0.2) {
  const [velocity, setVelocity] = useState(0)
  const { scrollY } = useScroll()
  const last = useRef({ y: 0, time: Date.now() })
  const smoothedVelocity = useRef(0)
  
  useEffect(() => {
    return scrollY.onChange((y) => {
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
    })
  }, [scrollY, smoothing])

  return velocity
}