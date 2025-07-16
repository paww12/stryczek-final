import { NavbarImage } from '@/payload-types'
import { useQuery } from '@tanstack/react-query'

const fetchNavbarImages = async (): Promise<{ docs: NavbarImage[] }> => {
  const res = await fetch('/api/navbar-image')
  if (!res.ok) {
    throw new Error('Failed to fetch navbar images')
  }
  return res.json()
}

export const useNavbarImage = () => {
    return useQuery({
      queryKey: ['navbar-images'],
      queryFn: fetchNavbarImages,
      staleTime: 0, 
      gcTime: 0,
      select: (data) => {
        if (data?.docs?.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.docs.length)
          return data.docs[randomIndex]
        }
        return null
      }
    })
  }