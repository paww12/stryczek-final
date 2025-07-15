import { useQuery } from '@tanstack/react-query'
import { MarqueItem } from '@/payload-types'

export const useMarqueData = () => {
    return useQuery<MarqueItem[]>({
      queryKey: ['marque'],
      queryFn: async () => {
        const res = await fetch(`/api/marque-item`)
        if (!res.ok) throw new Error('Failed to fetch marques')
        const json = await res.json()
        return json.docs 
      },
      staleTime: 1000 * 60 * 600, 
    })
  }
