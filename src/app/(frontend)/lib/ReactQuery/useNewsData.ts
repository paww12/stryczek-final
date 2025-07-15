import { useQuery } from '@tanstack/react-query'
import { News } from '@/payload-types'

export const useNewsData = (slide: string) => {
  return useQuery<News>({
    queryKey: ['news', slide],
    queryFn: async () => {
      const res = await fetch(`/api/news?limit=1&sort=-createdAt&page=${slide}`)
      if (!res.ok) throw new Error('Failed to fetch news')
      const json = await res.json()
      return json.docs[0]
    },
    staleTime: 1000 * 60 * 60, 
  })
}
