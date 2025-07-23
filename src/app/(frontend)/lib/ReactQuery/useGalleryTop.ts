import { useQuery } from '@tanstack/react-query'
import { GalleryTop } from '@/payload-types'

const fetchGalleryTop = async (): Promise<GalleryTop[]> => {
  const res = await fetch('/api/gallery-top?limit=5')
  
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`)
  }
  
  const data = await res.json()
  
  if (!data.docs || !Array.isArray(data.docs)) {
    throw new Error('Invalid API response structure')
  }
  
  return data.docs
}

export const useGalleryTop = () => {
  return useQuery({
    queryKey: ['gallery-top'],
    queryFn: fetchGalleryTop,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000, 
  })
}