import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import {  GalleryMain, Media } from '@/payload-types'

const fetchGalleryMain = async (): Promise<Media[]> => {
  const res = await fetch('/api/gallery-main?limit=1000&depth=1')
  
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`)
  }
  
  const data = await res.json()
  
  return data.docs.map((doc: any) => 
    typeof doc.image !== 'number' ? doc.image : null
  ).filter(Boolean) as Media[]
}

export const useGalleryMain = () => {
  return useQuery({
    queryKey: ['gallery-main'],
    queryFn: fetchGalleryMain,
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000, 
    enabled: false, 
  })
}

export const useAllGalleryImages = () => {
  const { data: topImages, refetch: refetchTop } = useQuery({
    queryKey: ['gallery-top', 'all'],
    queryFn: async () => {
      const res = await fetch('/api/gallery-top?limit=1000')
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
      const data = await res.json()
      return data.docs.map((doc: any) => 
        typeof doc.image !== 'number' ? doc.image : null
      ).filter(Boolean) as Media[]
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: false,
  })

  const { data: mainImages, refetch: refetchMain } = useQuery({
    queryKey: ['gallery-main', 'all'],
    queryFn: fetchGalleryMain,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: false,
  })

  const fetchAllImages = async () => {
    const [topResult, mainResult] = await Promise.all([
      refetchTop(),
      refetchMain()
    ])
    
    const allImages = [
      ...(topResult.data || []),
      ...(mainResult.data || [])
    ]
    
    return allImages
  }

  return { fetchAllImages, topImages, mainImages }
}

const fetchGalleryMainPaginated = async ({ pageParam = 1 }): Promise<{
    docs: GalleryMain[]
    hasNextPage: boolean
    nextPage: number | null
  }> => {
    const res = await fetch(`/api/gallery-main?page=${pageParam}&limit=5&depth=1`)
    
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`)
    }
    
    const data = await res.json()
    
    return {
      docs: data.docs || [],
      hasNextPage: data.docs.length > 0,
      nextPage: data.docs.length > 0 ? pageParam + 1 : null
    }
  }

export const useGalleryMainInfinite = () => {
    return useInfiniteQuery({
      queryKey: ['gallery-main-infinite'],
      queryFn: fetchGalleryMainPaginated,
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      staleTime: 2 * 60 * 1000, // 2 minutes for paginated data
      gcTime: 5 * 60 * 1000, // 5 minutes
    })
  }